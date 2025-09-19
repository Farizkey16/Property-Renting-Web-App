import { Snap } from "midtrans-client";

let snap = new Snap({
  isProduction: false,
  serverKey: process.env.MD_SERVER_KEY as string,
  clientKey: process.env.MD_CLIENT_KEY as string,
});




export { snap };
