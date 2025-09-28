"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.snap = void 0;
const midtrans_client_1 = require("midtrans-client");
let snap = new midtrans_client_1.Snap({
    isProduction: false,
    serverKey: process.env.MD_SERVER_KEY,
    clientKey: process.env.MD_CLIENT_KEY,
});
exports.snap = snap;
//# sourceMappingURL=midtrans.js.map