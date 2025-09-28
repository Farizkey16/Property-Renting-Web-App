"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDatesBetween = void 0;
const getDatesBetween = (startDate, endDate) => {
    const dates = [];
    const currentDate = new Date(startDate.getTime());
    while (currentDate <= endDate) {
        dates.push(new Date(currentDate).toISOString());
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
};
exports.getDatesBetween = getDatesBetween;
//# sourceMappingURL=getDatesBetween.js.map