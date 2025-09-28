"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendConfirmationEmail = exports.bookingWithDetailsArgs = void 0;
const transaction_service_1 = require("../transaction/transaction.service");
exports.bookingWithDetailsArgs = {
    include: {
        user: { select: { full_name: true, email: true } },
        property: { select: { name: true, city: true } },
        booking_rooms: { include: { room: { select: { name: true } } } },
    },
};
const sendConfirmationEmail = async (payload, helpers) => {
    try {
        // Use the imported type to safely cast the payload.
        const bookingData = payload;
        if (!bookingData || !bookingData.id) {
            throw new Error("Invalid bookingData in payload");
        }
        helpers.logger.info(`Sending confirmation email for booking ${bookingData.id}...`);
        await (0, transaction_service_1.sendUserBookingConfirmation)(bookingData);
        helpers.logger.info(`Successfully sent confirmation for booking ${bookingData.id}.`);
    }
    catch (error) {
        helpers.logger.error("Failed at processing 'send-confirmation-email' job.", { error });
        throw error;
    }
};
exports.sendConfirmationEmail = sendConfirmationEmail;
exports.default = exports.sendConfirmationEmail;
//# sourceMappingURL=send-confirmation.js.map