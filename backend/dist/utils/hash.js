"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = void 0;
const bcrypt_1 = require("bcrypt");
const hashPassword = async (password, salRounds = 10) => {
    const salt = await (0, bcrypt_1.genSalt)(salRounds);
    return await (0, bcrypt_1.hash)(password, salt);
};
exports.hashPassword = hashPassword;
//# sourceMappingURL=hash.js.map