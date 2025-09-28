"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VALID_SORT = exports.VALID_BOOKING_HISTORY_STATUS = exports.VALID_BOOKING_STATUS = void 0;
exports.isValidBookingStatus = isValidBookingStatus;
exports.isValidBookingHistoryStatus = isValidBookingHistoryStatus;
exports.isValidSort = isValidSort;
// Type Guard Booking Status
exports.VALID_BOOKING_STATUS = [
    "waiting_payment",
    "waiting_confirmation",
    "confirmed",
    "canceled",
    "canceled_by_tenant",
    "expired",
];
exports.VALID_BOOKING_HISTORY_STATUS = [
    "confirmed",
    "canceled",
    "canceled_by_tenant",
    "expired",
];
function isValidBookingStatus(status) {
    return exports.VALID_BOOKING_STATUS.includes(status);
}
function isValidBookingHistoryStatus(status) {
    return (status !== "waiting_payment" &&
        exports.VALID_BOOKING_HISTORY_STATUS.includes(status));
}
exports.VALID_SORT = ["asc", "desc"];
function isValidSort(sort) {
    return exports.VALID_SORT.includes(sort);
}
//# sourceMappingURL=transactions.types.js.map