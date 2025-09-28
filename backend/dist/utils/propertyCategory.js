"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePropertyCategory = parsePropertyCategory;
const client_1 = require("../../prisma/generated/client");
function parsePropertyCategory(value) {
    if (!value)
        return undefined;
    if (Object.values(client_1.PropertyCategory).includes(value)) {
        return value;
    }
    return undefined;
}
//# sourceMappingURL=propertyCategory.js.map