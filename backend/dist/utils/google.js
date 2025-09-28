"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUrl = exports.scope = exports.oauth2Client = void 0;
const googleapis_1 = require("googleapis");
exports.oauth2Client = new googleapis_1.google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, "http://localhost:4000/auth/google/callback");
exports.scope = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
];
exports.authUrl = exports.oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: exports.scope,
    include_granted_scopes: true,
});
//# sourceMappingURL=google.js.map