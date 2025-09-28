"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatCurrency = void 0;
const formatCurrency = (amount) => {
    const formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 3,
    });
    return formatter.format(amount);
};
exports.formatCurrency = formatCurrency;
//# sourceMappingURL=formatCurrency.js.map