"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../../config/prisma");
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const tenant_tx_repository_1 = require("../../../repositories/transaction/tenant-tx.repository");
const transaction_service_1 = require("../../../services/transaction/transaction.service");
const transactions_types_1 = require("../../../types/transaction/transactions.types");
const user_tx_repository_1 = require("../../../repositories/transaction/user-tx.repository");
const getDatesBetween_1 = require("../../../utils/getDatesBetween");
const graphile_worker_1 = require("graphile-worker");
class TenantTransactions {
    acceptPayment = async (req, res, next) => {
        try {
            const role = res.locals.decrypt.role;
            const bookingId = req.params.id;
            if (!bookingId) {
                throw new AppError_1.default("[acceptPayment]: Id is required.", 400);
            }
            const updatedBooking = await (0, tenant_tx_repository_1.acceptBookingPayment)(bookingId, role.tenant_id);
            (0, graphile_worker_1.quickAddJob)({ connectionString: process.env.DIRECT_URL }, "send-confirmation-job", updatedBooking);
            const reminderRunAt = new Date(Date.now() + 10 * 1000);
            await (0, graphile_worker_1.quickAddJob)({ connectionString: process.env.DIRECT_URL }, "send-booking-reminder", { bookingId: updatedBooking.id }, { runAt: reminderRunAt });
            res.json({
                message: "Payment successful, booking created",
                data: updatedBooking,
            });
        }
        catch (error) {
            next(error);
        }
    };
    rejectPayment = async (req, res, next) => {
        try {
            const role = res.locals.decrypt.role;
            const bookingId = req.params.id;
            console.log("Fetching from bookingId:", bookingId);
            if (!bookingId) {
                throw new AppError_1.default("Invalid transaction ID", 400);
            }
            const rejectProcess = await prisma_1.prisma.$transaction(async (tx) => {
                // Update booking and Return UserID
                const updatedBooking = await (0, tenant_tx_repository_1.UpdateBookings)(bookingId, "waiting_payment", tx);
                const datesToUpdate = (0, getDatesBetween_1.getDatesBetween)(updatedBooking.check_in_date, updatedBooking.check_out_date);
                const roomId = updatedBooking.booking_rooms.room_id;
                // Update Availability
                await (0, tenant_tx_repository_1.UpdateRoomAvailability)(roomId, datesToUpdate, true, tx);
                return updatedBooking;
            });
            // Send Rejection Notification
            await (0, transaction_service_1.sendRejectionNotification)(bookingId, rejectProcess.userId);
            res.json({
                message: "Payment rejected, booking updated",
                userID: rejectProcess.userId,
            });
        }
        catch (error) {
            next(error);
        }
    };
    cancelPayment = async (req, res, next) => {
        try {
            const bookingId = req.params.id;
            if (!bookingId) {
                throw new AppError_1.default("Invalid booking ID", 400);
            }
            // Update Status to Canceled
            const cancelledBooking = await (0, tenant_tx_repository_1.UpdateBookings)(bookingId, "canceled_by_tenant");
            if (!cancelledBooking) {
                throw new AppError_1.default("Booking cannot be updated", 400);
            }
            // Send Response
            res.json({
                message: "Payment canceled by Tenant, booking updated",
                data: cancelledBooking,
            });
        }
        catch (error) {
            next(error);
        }
    };
    getReservationByFilter = async (req, res, next) => {
        try {
            // Fetch Orders Based on Booking Status
            const { status, sort, end, start, bookingId } = req.query;
            if (!status || typeof status !== "string") {
                throw new AppError_1.default("Booking status query parameter is required.", 400);
            }
            const tenant = res.locals.decrypt;
            const whereClause = {};
            if (tenant.role === "tenant") {
                whereClause.property = {
                    tenant_id: tenant.id,
                };
            }
            else {
                whereClause.user_id = tenant.user_id;
            }
            if (status && typeof status === "string") {
                const validStatuses = status
                    .split(",")
                    .filter((s) => (0, transactions_types_1.isValidBookingStatus)(s));
                if (validStatuses.length > 0) {
                    whereClause.status = { in: validStatuses };
                }
            }
            if (end && typeof end === "string") {
                whereClause.check_out_date = { lte: new Date(end) };
            }
            const orderFetch = await (0, tenant_tx_repository_1.getOrderRepository)(whereClause, sort);
            if (!orderFetch || orderFetch.length === 0) {
                res.json({
                    message: "No orders found.",
                    data: [],
                });
                return;
            }
            res.json({
                message: "Order(s) successfully retrieved.",
                data: orderFetch,
            });
        }
        catch (error) {
            next(error);
        }
    };
    getReservationById = async (req, res, next) => {
        try {
            const { bookingId } = req.params;
            if (!bookingId) {
                throw new AppError_1.default("[getReservationById]: Id is required.", 400);
            }
            const user = res.locals.decrypt;
            const booking = await (0, tenant_tx_repository_1.findBookingByIdRepository)(bookingId, user);
            if (!booking) {
                throw new AppError_1.default("Booking not found.", 404);
            }
            res.status(200).json({
                message: "Booking retrieved successfully",
                data: booking,
            });
        }
        catch (error) {
            next(error);
        }
    };
    getReservations = async (req, res, next) => {
        try {
            const { status, check_in_date: startDate, check_out_date: endDate, sort, bookingId, } = req.query;
            const userId = res.locals.decrypt.userId;
            let page = 1;
            let limit = 5;
            const tenantRecord = await prisma_1.prisma.tenants.findUnique({
                where: { user_id: userId },
            });
            if (!tenantRecord) {
                throw new AppError_1.default("Tenant profile not found for this user.", 404);
            }
            const tenantId = tenantRecord.id;
            if (req.query.page && typeof req.query.page === "string") {
                const parsedPage = parseInt(req.query.page, 10);
                if (!isNaN(parsedPage) && parsedPage > 0) {
                    page = parsedPage;
                }
            }
            if (req.query.limit && typeof req.query.limit === "string") {
                const parsedLimit = parseInt(req.query.limit, 10);
                if (!isNaN(parsedLimit) && parsedLimit > 0) {
                    limit = parsedLimit;
                }
            }
            const whereClause = {
                property: {
                    tenant_id: tenantId,
                },
            };
            if (status && typeof status === "string") {
                const validStatuses = status
                    .split(",")
                    .filter((s) => (0, transactions_types_1.isValidBookingStatus)(s));
                if (validStatuses.length > 0) {
                    whereClause.status = { in: validStatuses };
                }
            }
            if (endDate && typeof endDate === "string") {
                whereClause.check_out_date = { lte: new Date(endDate) };
            }
            const bookings = await (0, user_tx_repository_1.getFilteredBookings)(whereClause, sort, page, limit);
            if (bookings.data.length === 0) {
                return res.status(200).json({
                    message: "No orders found for this tenant matching the criteria.",
                    data: [],
                });
            }
            res.status(200).json({
                success: true,
                message: "Reservations successfully fetched.",
                data: bookings,
            });
        }
        catch (error) {
            next(error);
        }
    };
    getAvailability = async (req, res, next) => {
        try {
            const user = res.locals.decrypt;
            if (user.role !== "tenant") {
                throw new AppError_1.default("Forbidden: You do not have permission to access this resource.", 403);
            }
            const tenantRecord = await prisma_1.prisma.tenants.findUnique({
                where: {
                    user_id: user.userId,
                },
            });
            const tenantId = tenantRecord?.id;
            const { startDate, endDate } = req.query;
            if (!startDate ||
                !endDate ||
                typeof startDate !== "string" ||
                typeof endDate !== "string") {
                throw new AppError_1.default("Start and end date query parameters are required.", 400);
            }
            const bookings = await prisma_1.prisma.bookings.findMany({
                where: {
                    property: {
                        tenant_id: tenantId,
                    },
                    status: {
                        in: ["confirmed", "waiting_confirmation"],
                    },
                    check_in_date: {
                        lte: new Date(endDate),
                    },
                    check_out_date: {
                        gte: new Date(startDate),
                    },
                },
                include: {
                    booking_rooms: {
                        select: {
                            room: {
                                select: {
                                    name: true,
                                },
                            },
                        },
                    },
                    user: {
                        select: {
                            full_name: true,
                            email: true,
                        },
                    },
                },
            });
            const events = bookings.flatMap((booking) => {
                return booking.booking_rooms.map((br) => {
                    return {
                        title: `${br.room.name} - Booked`,
                        start: booking.check_in_date,
                        end: booking.check_out_date,
                        backgroundColor: booking.status === "confirmed" ? "#CA3433" : "#16A34A",
                        borderColor: booking.status === "confirmed" ? "#CA3433" : "#16A34A",
                        extendedProps: {
                            name: booking.user.full_name,
                            email: booking.user.email,
                            id: booking.id,
                        },
                    };
                });
            });
            res.status(200).json({
                success: true,
                message: "Availability successfully fetched.",
                data: events,
            });
        }
        catch (error) {
            next(error);
        }
    };
    getRoomAmountAvailable = async (req, res, next) => {
        try {
            const { roomId, checkIn, checkOut } = req.query;
            console.log("checking query:", roomId, checkIn, checkOut);
            if (!roomId || !checkIn || !checkOut) {
                throw new AppError_1.default("roomId, checkIn, and checkOut are required query parameters.", 400);
            }
            const availableRooms = await (0, transaction_service_1.getRoomAmount)(String(roomId), new Date(String(checkIn)), new Date(String(checkOut)));
            res.status(200).json({
                success: true,
                data: {
                    roomId: roomId,
                    availableCount: availableRooms,
                },
            });
        }
        catch (error) {
            next(error);
        }
    };
}
exports.default = TenantTransactions;
//# sourceMappingURL=tenant-tx.controller.js.map