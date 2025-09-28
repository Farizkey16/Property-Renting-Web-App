"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../../config/prisma");
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const tenant_tx_repository_1 = require("../../../repositories/transaction/tenant-tx.repository");
const date_fns_1 = require("date-fns");
const transactions_types_1 = require("../../../types/transaction/transactions.types");
const transaction_repository_1 = require("../../../repositories/transaction/transaction.repository");
const transaction_service_1 = require("../../../services/transaction/transaction.service");
const user_tx_repository_1 = require("../../../repositories/transaction/user-tx.repository");
class UserTransactions {
    createBooking = async (req, res, next) => {
        try {
            const role = res.locals.decrypt;
            const userId = role.userId;
            const { propertyId, checkInDate, checkOutDate, roomId, guests, nights, totalPrice, subtotal, quantity, fullName, email, } = req.body;
            if (!propertyId || !checkInDate || !checkOutDate || !guests) {
                throw new AppError_1.default("Please enter the required fields", 400);
            }
            const newBooking = await prisma_1.prisma.$transaction(async (tx) => {
                const availableRooms = await (0, transaction_repository_1.checkRoomInventory)(tx, roomId, checkInDate, checkOutDate, quantity);
                // Create Booking Property
                const createBooking = await tx.bookings.create({
                    data: {
                        status: "waiting_confirmation",
                        check_in_date: new Date(checkInDate),
                        check_out_date: new Date(checkOutDate),
                        total_price: totalPrice,
                        amount: totalPrice,
                        user: {
                            connect: { id: userId },
                        },
                        property: {
                            connect: { id: propertyId },
                        },
                        booking_rooms: {
                            create: {
                                room_id: roomId,
                                guests_count: guests,
                                price_per_night: subtotal,
                                check_in_date: new Date(checkInDate),
                                check_out_date: new Date(checkOutDate),
                                quantity: Number(quantity),
                                nights: nights,
                                subtotal: subtotal,
                            },
                        },
                    },
                });
                const datesToUpdate = (0, date_fns_1.eachDayOfInterval)({
                    start: new Date(checkInDate),
                    end: new Date(checkOutDate),
                });
                datesToUpdate.pop();
                await Promise.all(datesToUpdate.map((date) => tx.room_availability.upsert({
                    where: {
                        room_id_date: {
                            room_id: roomId,
                            date: date,
                        },
                    },
                    update: {
                        is_available: true,
                    },
                    create: {
                        room_id: roomId,
                        date: date,
                        is_available: false,
                    },
                })));
                return createBooking;
            });
            // Send Response
            res.status(201).json({
                success: true,
                message: "Booking successfully created.",
                identity: {
                    fullName: fullName,
                    email: email,
                },
                data: newBooking,
            });
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    };
    getReservations = async (req, res, next) => {
        try {
            const { status, check_in_date: startDate, check_out_date: endDate, sort, bookingId, } = req.query;
            const userId = res.locals.decrypt.userId;
            console.log("userId from token:", userId);
            let page = 1;
            let limit = 5;
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
            // Default Filter
            const whereClause = {
                user_id: userId,
            };
            // Booking ID Filter
            if (bookingId && typeof bookingId === "string") {
                whereClause.id = {
                    startsWith: bookingId,
                    mode: "insensitive",
                };
            }
            // Status Filter
            if (status) {
                const statusList = [].concat(status);
                const validStatus = statusList.filter((s) => (0, transactions_types_1.isValidBookingStatus)(s));
                if (validStatus.length > 0) {
                    whereClause.status = { in: validStatus };
                }
            }
            // Date Filter
            if (startDate &&
                typeof startDate === "string" &&
                endDate &&
                typeof endDate === "string") {
                const start = new Date(startDate);
                const end = new Date(endDate);
                // Check Date Validity
                if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
                    whereClause.check_in_date = { gte: start };
                    whereClause.check_out_date = { lt: end };
                }
            }
            const bookings = await (0, user_tx_repository_1.getFilteredBookings)(whereClause, sort, page, limit);
            res.status(200).json({
                success: true,
                message: "Reservations successfully fetched.",
                data: bookings,
            });
        }
        catch (err) {
            next(err);
        }
    };
    getReservationsHistory = async (req, res, next) => {
        try {
            // Validate Role
            const decrypt = res.locals.decrypt;
            if (!decrypt || !decrypt.userId) {
                throw new AppError_1.default("Unauthorized access", 401);
            }
            const userId = decrypt.userId;
            console.log("userId from token:", userId);
            const bookings = await prisma_1.prisma.bookings.findMany({
                where: {
                    user_id: userId,
                    check_out_date: {
                        lt: new Date(),
                    },
                },
                select: {
                    id: true,
                    check_in_date: true,
                    check_out_date: true,
                    booking_rooms: {
                        select: {
                            id: true,
                            room_id: true,
                            guests_count: true,
                            nights: true,
                            price_per_night: true,
                            subtotal: true,
                        },
                    },
                },
                orderBy: {
                    check_out_date: "desc",
                },
            });
            if (!bookings || bookings.length === 0) {
                throw new AppError_1.default("No reservations found", 404);
            }
            res.status(200).json({
                success: true,
                message: "Reservations successfully fetched.",
                data: bookings,
            });
        }
        catch (err) {
            next(err);
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
                throw new AppError_1.default("Booking not found or you are not authorized to view it.", 404);
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
    paymentProofUpload = async (req, res, next) => {
        try {
            // Validate Role
            const decrypt = res.locals.decrypt;
            if (!decrypt || !decrypt.userId) {
                throw new AppError_1.default("Unauthorized access", 401);
            }
            const userId = decrypt.userId;
            console.log("userId from token:", userId);
            // Upload
            if (!req.file) {
                throw new AppError_1.default("No file uploaded.", 400);
            }
            const { bookingId } = req.params;
            if (!bookingId) {
                throw new AppError_1.default("[paymentProofUpload]: Id is required.", 400);
            }
            const response = await (0, transaction_service_1.proofUploadService)(userId, bookingId, req.file);
            res.status(200).json({
                success: true,
                message: "Upload payment proof successful.",
                data: response,
            });
        }
        catch (err) {
            next(err);
        }
    };
    cancelPayment = async (req, res, next) => {
        try {
            const { id: bookingId } = req.params;
            if (!bookingId) {
                throw new AppError_1.default("Invalid transaction ID", 400);
            }
            const proof = await (0, transaction_repository_1.FindProofImage)(bookingId);
            if (proof.proof_image) {
                console.log("Proof image exists, cannot cancel booking:", proof.proof_image);
                return;
            }
            else {
                console.log("Booking exists, but a proof image has not been uploaded yet.");
                console.log("proof image is:", proof);
                // Update Status to Canceled
                const cancelledBooking = await (0, transaction_repository_1.UpdateBookings)(bookingId, "canceled");
                res.json({
                    message: "Payment canceled by Tenant, booking updated",
                    data: cancelledBooking,
                });
            }
        }
        catch (error) {
            next(error);
        }
    };
}
exports.default = UserTransactions;
//# sourceMappingURL=user-tx.controller.js.map