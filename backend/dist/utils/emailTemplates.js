"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BOOKING_REJECTION_TEMPLATE_SINGLE = exports.BOOKING_REMINDER_TEMPLATE_MULTIPLE = exports.BOOKING_REMINDER_TEMPLATE = exports.BOOKING_CONFIRMATION_TEMPLATE_MULTIPLE = exports.BOOKING_CONFIRMATION_TEMPLATE_SINGLE = exports.PASSWORD_RESET_REQUEST_TEMPLATE = exports.PASSWORD_RESET_SUCCESS_TEMPLATE = exports.VERIFICATION_EMAIL_TEMPLATE = void 0;
const AppError_1 = __importDefault(require("../errors/AppError"));
const formatCurrency_1 = require("./formatCurrency");
exports.VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Verify Your Email</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>Thank you for signing up! Your verification code is:</p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #4CAF50;">{verificationCode}</span>
    </div>
    <p>Enter this code on the verification page to complete your registration.</p>
    <p>This code will expire in 1 hour for security reasons.</p>
    <p>If you didn't create an account with us, please ignore this email.</p>
    <p>Best regards,<br>Homz Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;
exports.PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset Successful</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We're writing to confirm that your password has been successfully reset.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #4CAF50; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        ✓
      </div>
    </div>
    <p>If you did not initiate this password reset, please contact our support team immediately.</p>
    <p>For security reasons, we recommend that you:</p>
    <ul>
      <li>Use a strong, unique password</li>
      <li>Enable two-factor authentication if available</li>
      <li>Avoid using the same password across multiple sites</li>
    </ul>
    <p>Thank you for helping us keep your account secure.</p>
    <p>Best regards,<br>Homz Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;
exports.PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
    <p>To reset your password, please use the following verification code</p>
    <p> Your verification code is:</p>
   <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #4CAF50;">{verificationCode}</span>
    </div>
    <p>This link will expire in 24 hour for security reasons.</p>
    <p>Best regards,<br>Homz Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;
const BOOKING_CONFIRMATION_TEMPLATE_SINGLE = (data) => `<html>
  <head>
    <meta charset="UTF-8" />
    <title>Booking Confirmation</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f8fafc; padding: 20px; margin: 0;">
    <table align="center" width="600" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
      
      <!-- Header -->
      <tr>
        <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px 20px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">Booking Confirmed!</h1>
          <p style="color: #e2e8f0; margin: 8px 0 0 0; font-size: 16px;">Your reservation is all set</p>
        </td>
      </tr>

      <!-- User Details Section -->
      <tr>
        <td style="padding: 30px 20px 20px 20px;">
          <h2 style="color: #1a202c; margin: 0 0 15px 0; font-size: 20px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">Guest Information</h2>
          <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-size: 14px; color: #4a5568;">
            <tr>
              <td style="border-bottom: 1px solid #e2e8f0; width: 30%;"><strong>Guest Name:</strong></td>
              <td style="border-bottom: 1px solid #e2e8f0;">${data.guestName || 'John Doe'}</td>
            </tr>
            <tr>
              <td style="border-bottom: 1px solid #e2e8f0;"><strong>Email:</strong></td>
              <td style="border-bottom: 1px solid #e2e8f0;">${data.email || 'john.doe@email.com'}</td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Booking Details Section -->
      <tr>
        <td style="padding: 20px;">
          <h2 style="color: #1a202c; margin: 0 0 15px 0; font-size: 20px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">Booking Details</h2>
          <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-size: 14px; color: #4a5568;">
            <tr>
              <td style="border-bottom: 1px solid #e2e8f0; width: 30%;"><strong>Booking ID:</strong></td>
              <td style="border-bottom: 1px solid #e2e8f0;">${data.booking_id.toString().slice(0, 6).toUpperCase()}</td>
            </tr>
            <tr>
              <td style="border-bottom: 1px solid #e2e8f0;"><strong>Property:</strong></td>
              <td style="border-bottom: 1px solid #e2e8f0;">${data.propertyName || 'Luxury Downtown Apartment'}</td>
            </tr>
            <tr>
              <td style="border-bottom: 1px solid #e2e8f0;"><strong>Guests:</strong></td>
              <td style="border-bottom: 1px solid #e2e8f0;">${data.rooms.map((gc) => gc.guests_count)}</td>
            </tr>
            <tr>
              <td style="border-bottom: 1px solid #e2e8f0;"><strong>Check-in:</strong></td>
              <td style="border-bottom: 1px solid #e2e8f0;">${data.rooms.map((ci) => ci.check_in_date[0])}</td>
            </tr>
            <tr>
              <td style="border-bottom: 1px solid #e2e8f0;"><strong>Check-out:</strong></td>
              <td style="border-bottom: 1px solid #e2e8f0;">${data.rooms.map((ci) => ci.check_out_date[0])}</td>
            </tr>
            <tr>
              <td style="border-bottom: 1px solid #e2e8f0;"><strong>Rooms:</strong></td>
              <td style="border-bottom: 1px solid #e2e8f0;">${data.rooms.reduce((acc, num) => acc + num.quantity, 0)}</td>
            </tr>
            <tr>
              <td><strong>Total Amount:</strong></td>
              <td style="color: #38a169; font-weight: bold; font-size: 16px;">${(0, formatCurrency_1.formatCurrency)(data.rooms.reduce((acc, num) => acc + num.subtotal, 0))}</td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Check-in Instructions -->
      <tr>
        <td style="padding: 20px; background-color: #f7fafc;">
          <h2 style="color: #1a202c; margin: 0 0 15px 0; font-size: 20px; border-bottom: 2px solid #4299e1; padding-bottom: 8px;">🔑 Check-in Instructions</h2>
          <div style="background: #ffffff; padding: 15px; border-radius: 8px; border-left: 4px solid #4299e1;">
            <p style="margin: 0 0 10px 0; color: #2d3748; font-size: 14px;"><strong>Check-in Time:</strong> 3:00 PM - 10:00 PM</p>
            <p style="margin: 0 0 10px 0; color: #2d3748; font-size: 14px;"><strong>Late Check-in:</strong> Contact us 24 hours in advance for arrivals after 10:00 PM</p>
            <p style="margin: 0 0 10px 0; color: #2d3748; font-size: 14px;"><strong>Key Collection:</strong></p>
            <ul style="margin: 5px 0 10px 20px; color: #4a5568; font-size: 14px;">
              <li>Smart lock code will be sent 24 hours before arrival</li>
              <li>Backup keys available at the front desk (Building hours: 8 AM - 8 PM)</li>
              <li>Emergency contact: +1 (555) 999-0000</li>
            </ul>
            <p style="margin: 0 0 10px 0; color: #2d3748; font-size: 14px;"><strong>What to Bring:</strong></p>
            <ul style="margin: 5px 0 0 20px; color: #4a5568; font-size: 14px;">
              <li>Government-issued photo ID</li>
              <li>Credit card used for booking</li>
              <li>Booking confirmation (this email)</li>
            </ul>
          </div>
        </td>
      </tr>

      <!-- Property Guidelines (Dos and Don'ts) -->
      <tr>
        <td style="padding: 20px;">
          <h2 style="color: #1a202c; margin: 0 0 15px 0; font-size: 20px; border-bottom: 2px solid #48bb78; padding-bottom: 8px;">📋 Property Guidelines</h2>
          
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="50%" style="vertical-align: top; padding-right: 10px;">
                <div style="background: #f0fff4; padding: 15px; border-radius: 8px; border-left: 4px solid #48bb78;">
                  <h3 style="color: #22543d; margin: 0 0 10px 0; font-size: 16px;">✅ Please DO</h3>
                  <ul style="margin: 0; padding-left: 20px; color: #2f855a; font-size: 13px;">
                    <li>Keep the property clean and tidy</li>
                    <li>Report any damages immediately</li>
                    <li>Use provided amenities respectfully</li>
                    <li>Lock doors when leaving</li>
                    <li>Follow building quiet hours (10 PM - 8 AM)</li>
                    <li>Dispose of trash properly</li>
                    <li>Turn off lights and AC when leaving</li>
                  </ul>
                </div>
              </td>
              <td width="50%" style="vertical-align: top; padding-left: 10px;">
                <div style="background: #fff5f5; padding: 15px; border-radius: 8px; border-left: 4px solid #f56565;">
                  <h3 style="color: #742a2a; margin: 0 0 10px 0; font-size: 16px;">❌ Please DON'T</h3>
                  <ul style="margin: 0; padding-left: 20px; color: #c53030; font-size: 13px;">
                    <li>Smoke inside the property</li>
                    <li>Bring pets (unless pre-approved)</li>
                    <li>Host parties or large gatherings</li>
                    <li>Move or remove furniture</li>
                    <li>Use candles or open flames</li>
                    <li>Exceed maximum occupancy</li>
                    <li>Leave windows open when AC is on</li>
                  </ul>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Property Rules -->
      <tr>
        <td style="padding: 20px; background-color: #f7fafc;">
          <h2 style="color: #1a202c; margin: 0 0 15px 0; font-size: 20px; border-bottom: 2px solid #ed8936; padding-bottom: 8px;">⚠️ Important Property Rules</h2>
          <div style="background: #ffffff; padding: 15px; border-radius: 8px; border-left: 4px solid #ed8936;">
            <div style="margin-bottom: 15px;">
              <h3 style="color: #c05621; margin: 0 0 8px 0; font-size: 15px;">Noise Policy</h3>
              <p style="margin: 0; color: #4a5568; font-size: 13px;">Quiet hours are from 10:00 PM to 8:00 AM. Please be considerate of neighbors and keep noise levels down during these hours.</p>
            </div>
            
            <div style="margin-bottom: 15px;">
              <h3 style="color: #c05621; margin: 0 0 8px 0; font-size: 15px;">Occupancy Limits</h3>
              <p style="margin: 0; color: #4a5568; font-size: 13px;">Maximum occupancy is strictly enforced. Additional guests require prior approval and may incur extra charges.</p>
            </div>
            
            <div style="margin-bottom: 15px;">
              <h3 style="color: #c05621; margin: 0 0 8px 0; font-size: 15px;">Damage Policy</h3>
              <p style="margin: 0; color: #4a5568; font-size: 13px;">Guests are responsible for any damages beyond normal wear and tear. Please report any pre-existing damage within 24 hours of arrival.</p>
            </div>
            
            <div style="margin-bottom: 15px;">
              <h3 style="color: #c05621; margin: 0 0 8px 0; font-size: 15px;">Security Deposit</h3>
              <p style="margin: 0; color: #4a5568; font-size: 13px;">A security hold of Rp200.000 may be placed on your card and released within 7 days after checkout, pending property inspection.</p>
            </div>
            
            <div>
              <h3 style="color: #c05621; margin: 0 0 8px 0; font-size: 15px;">Cancellation Policy</h3>
              <p style="margin: 0; color: #4a5568; font-size: 13px;">Free cancellation up to 48 hours before check-in. Late cancellations may incur charges as per our terms and conditions.</p>
            </div>
          </div>
        </td>
      </tr>

      <!-- Contact Information -->
      <tr>
        <td style="padding: 20px; text-align: center; background-color: #2d3748;">
          <h3 style="color: #ffffff; margin: 0 0 15px 0; font-size: 18px;">Need Help?</h3>
          <p style="color: #a0aec0; margin: 0 0 10px 0; font-size: 14px;">We're here to make your stay perfect!</p>
          <table align="center" cellpadding="5" cellspacing="0">
            <tr>
              <td style="color: #e2e8f0; font-size: 13px; padding: 0 15px;">📞 +1 (555) 123-4567</td>
              <td style="color: #e2e8f0; font-size: 13px; padding: 0 15px;">✉️ support@homz.co.id</td>
              <td style="color: #e2e8f0; font-size: 13px; padding: 0 15px;">🌐 www.homzproperty.com</td>
            </tr>
          </table>
          <p style="color: #718096; margin: 15px 0 0 0; font-size: 12px;">Available 24/7 for emergencies | Business hours: 8 AM - 8 PM</p>
        </td>
      </tr>

    </table>
  </body>
</html>`;
exports.BOOKING_CONFIRMATION_TEMPLATE_SINGLE = BOOKING_CONFIRMATION_TEMPLATE_SINGLE;
const BOOKING_CONFIRMATION_TEMPLATE_MULTIPLE = (data) => {
    const bookingRows = data.rooms
        .map((room) => {
        return `
        <tr>
            <td style="padding: 12px; border-top: 1px solid #dddddd;">${room.room_id}</td>
            <td style="padding: 12px; border-top: 1px solid #dddddd;">${room.check_in_date[0]}</td>
            <td style="padding: 12px; border-top: 1px solid #dddddd;">${room.check_out_date[0]}</td>
            <td style="padding: 12px; border-top: 1px solid #dddddd;">${room.guests_count}</td>
            <td style="padding: 12px; border-top: 1px solid #dddddd;">${room.subtotal}</td>
        </tr>
        `;
    })
        .join(", ");
    const bookingHtml = `<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Booking is Confirmed</title>
    <style>
        /* Basic styles for clients that support them */
        body {
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        table {
            border-collapse: collapse;
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">

    <table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#f4f4f4">
        <tr>
            <td align="center">
                <table width="600" border="0" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                    
                    <tr>
                        <td align="center" style="padding: 20px 0; border-bottom: 1px solid #dddddd;">
                            <h1 style="margin: 0; color: #333333;">Booking Confirmed!</h1>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 30px 20px; color: #555555; font-size: 16px; line-height: 1.6;">
                            <p style="margin: 0 0 20px;">Hi ${data.guestName},</p>
                            <p style="margin: 0 0 20px;">
                                Thank you for booking with us! Your reservation at <strong>${data.propertyName}</strong> is confirmed. Please review the specific details for each of your rooms below.
                            </p>

                            <table width="100%" border="0" cellpadding="5" cellspacing="0" style="margin-bottom: 20px;">
                                <tr>
                                    <td style="padding: 10px; background-color: #f9f9f9; border-radius: 5px;">
                                        <strong>Booking Reference:</strong> ${data.booking_id}<br>
                                        <strong>Overall Stay Duration:</strong> ${data.rooms.map((ci) => ci.check_in_date[0])} to ${data.rooms.map((co) => co.check_out_date[0])}
                                    </td>
                                </tr>
                            </table>

                            <hr style="border: 0; border-top: 1px solid #dddddd; margin: 20px 0;">

                            <h2 style="color: #333333; font-size: 20px; margin-top: 0; margin-bottom: 15px;">Your Detailed Room Itinerary</h2>
                            
                            <table width="100%" border="0" cellpadding="10" cellspacing="0" style="border: 1px solid #dddddd;">
                                <thead style="background-color: #f1f1f1;">
                                    <tr>
                                        <th scope="col" style="text-align: left; padding: 12px; color: #333333;">Room Type</th>
                                        <th scope="col" style="text-align: left; padding: 12px; color: #333333;">Check-in</th>
                                        <th scope="col" style="text-align: left; padding: 12px; color: #333333;">Check-out</th>
                                        <th scope="col" style="text-align: right; padding: 12px; color: #333333;">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${bookingRows}
                                    </tbody>
                            </table>

                            <hr style="border: 0; border-top: 1px solid #dddddd; margin: 30px 0;">
                            
                            <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="font-size: 18px; color: #333333;"><strong>Total Price:</strong></td>
                                    <td style="font-size: 18px; color: #333333; text-align: right;"><strong>${data.rooms.reduce((acc, num) => acc + num.subtotal, 0)}</strong></td>
                                </tr>
                            </table>

                        </td>
                    </tr>

                    <tr>
                        <td align="center" style="padding: 20px; font-size: 12px; color: #999999; border-top: 1px solid #dddddd;">
                            <p style="margin: 10px 0 0;">If you have any questions, please contact us.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
    return bookingHtml;
};
exports.BOOKING_CONFIRMATION_TEMPLATE_MULTIPLE = BOOKING_CONFIRMATION_TEMPLATE_MULTIPLE;
const BOOKING_REMINDER_TEMPLATE = (data) => {
    const reminderHtml = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Your Stay is Almost Here!</title>
  </head>
  <body style="margin:0; padding:0; background:#f8f6f4; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;">
    <table align="center" cellpadding="0" cellspacing="0" width="600" style="background:#ffffff; margin:20px auto; border-radius:12px; overflow:hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
      

      <tr>
        <td style="background: linear-gradient(135deg, #e85a74 0%, #d4405a 100%); padding:40px 30px; text-align:center; color:#fff;">
          <h1 style="margin:0; font-size:28px; font-weight:600; letter-spacing:-0.5px;">Your Stay is Almost Here!</h1>
          <p style="margin:12px 0 0; font-size:16px; opacity:0.9; font-weight:300;">We can't wait to welcome you</p>
        </td>
      </tr>

    
      <tr>
        <td style="padding:40px 30px; color:#2d3748; font-size:16px; line-height:1.6;">
          <p style="font-size:18px; margin:0 0 24px; color:#1a202c;">Dear <strong>${data.guestName}</strong>,</p>
          
          <p style="margin:0 0 32px; color:#4a5568;">
            Your upcoming stay at <strong style="color:#e85a74;">${data.propertyName}</strong> is just around the corner! 
            We're excited to host you and want to ensure everything is ready for your arrival.
          </p>

           Booking details card 
          <div style="background:#f7fafc; border-radius:12px; padding:24px; margin:32px 0; border-left:4px solid #e85a74;">
            <h3 style="margin:0 0 20px; color:#2d3748; font-size:18px; font-weight:600;">Booking Details</h3>
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
              <tr>
                <td style="padding:8px 0; border-bottom:1px solid #e2e8f0; width:35%; color:#4a5568; font-weight:500;">Booking ID:</td>
                <td style="padding:8px 0; border-bottom:1px solid #e2e8f0; color:#1a202c; font-weight:600;">${data.booking_id.slice(0, 6).toUpperCase()}</td>
              </tr>
              <tr>
                <td style="padding:8px 0; border-bottom:1px solid #e2e8f0; color:#4a5568; font-weight:500;">Check-in:</td>
                <td style="padding:8px 0; border-bottom:1px solid #e2e8f0; color:#1a202c; font-weight:600;">${data.rooms[0]?.check_in_date ?? ''}</td>
              </tr>
              <tr>
                <td style="padding:8px 0; border-bottom:1px solid #e2e8f0; color:#4a5568; font-weight:500;">Check-out:</td>
                <td style="padding:8px 0; border-bottom:1px solid #e2e8f0; color:#1a202c; font-weight:600;">${data.rooms[0]?.check_out_date ?? ''}</td>
              </tr>
              <tr>
                <td style="padding:8px 0; color:#4a5568; font-weight:500;">Duration:</td>
                <td style="padding:8px 0; color:#1a202c; font-weight:600;">${data.rooms[0]?.nights ?? 0} nights</td>
              </tr>
            </table>
          </div>

           Pre-arrival checklist 
          <div style="margin:32px 0;">
            <h3 style="margin:0 0 20px; color:#2d3748; font-size:18px; font-weight:600;">Pre-Arrival Checklist</h3>
            <div style="background:#fff5f5; border-radius:8px; padding:20px; border:1px solid #fed7d7;">
              <ul style="margin:0; padding:0 0 0 20px; color:#4a5568;">
                <li style="margin:0 0 12px;">📱 Save our contact number: <strong style="color:#e85a74;">+62 8782 144123 (WhatsApp)</strong></li>
                <li style="margin:0 0 12px;">🆔 Bring valid photo ID for check-in verification</li>
                <li style="margin:0 0 12px;">🎫 Keep your booking confirmation handy</li>
                <li style="margin:0 0 12px;">⏰ Standard check-in time: 3:00 PM - 9:00 PM</li>
                <li style="margin:0;">🚗 Parking instructions will be sent 24 hours before arrival</li>
              </ul>
            </div>
          </div>

           What to expect 
          <div style="margin:32px 0;">
            <h3 style="margin:0 0 20px; color:#2d3748; font-size:18px; font-weight:600;">What to Expect</h3>
            <div style="display:flex; flex-wrap:wrap; gap:16px;">
              <div style="background:#f0fff4; border-radius:8px; padding:16px; flex:1; min-width:200px; border:1px solid #c6f6d5;">
                <div style="color:#38a169; font-size:20px; margin-bottom:8px;">🏠</div>
                <div style="color:#2d3748; font-weight:600; margin-bottom:4px;">Clean & Ready</div>
                <div style="color:#4a5568; font-size:14px;">Property professionally cleaned and sanitized</div>
              </div>
              <div style="background:#f7fafc; border-radius:8px; padding:16px; flex:1; min-width:200px; border:1px solid #e2e8f0;">
                <div style="color:#4299e1; font-size:20px; margin-bottom:8px;">📋</div>
                <div style="color:#2d3748; font-weight:600; margin-bottom:4px;">House Guide</div>
                <div style="color:#4a5568; font-size:14px;">Digital welcome guide with all property info</div>
              </div>
            </div>
          </div>

           Contact section 
          <div style="margin:32px 0;">
            <h3 style="margin:0 0 16px; color:#2d3748; font-size:18px; font-weight:600;">Need Assistance?</h3>
            <p style="margin:0 0 16px; color:#4a5568;">
              Our support team is available 24/7 to help with any questions or special requests.
            </p>
            <div style="text-align:center; margin:24px 0;">
              <a href="tel:+62 8782 144123 (WhatsApp)" style="display:inline-block; background:#e85a74; color:#ffffff; padding:14px 28px; text-decoration:none; border-radius:8px; font-weight:600; font-size:16px; margin:0 8px 8px 0;">Call Support</a>
              <a href="mailto:support@homz.co.id" style="display:inline-block; background:#f7fafc; color:#4a5568; padding:14px 28px; text-decoration:none; border-radius:8px; font-weight:600; font-size:16px; border:2px solid #e2e8f0;">Email Us</a>
            </div>
          </div>

          <div style="background:#fff8f0; border-radius:8px; padding:20px; margin:32px 0; border-left:4px solid #ed8936;">
            <p style="margin:0; color:#9c4221; font-weight:500;">
              <strong>Important:</strong> If your plans change, please contact us as soon as possible. 
              Late cancellations may be subject to our cancellation policy.
            </p>
          </div>

          <p style="margin:32px 0 0; color:#4a5568; font-size:16px;">
            We're looking forward to providing you with an exceptional stay experience!
          </p>
          
          <p style="margin:16px 0 0; color:#2d3748; font-weight:600;">
            Warm regards,<br>
            The ${data.propertyName} Team
          </p>
        </td>
      </tr>

    
      <tr>
        <td style="padding:30px; text-align:center; background:#f8f9fa; border-top:1px solid #e9ecef;">
          <div style="margin-bottom:16px;">
            <a href="" style="color:#e85a74; text-decoration:none; font-weight:600; margin:0 16px;">Visit Website</a>
            <a href="" style="color:#e85a74; text-decoration:none; font-weight:600; margin:0 16px;">Follow Us</a>
            <a href="" style="color:#e85a74; text-decoration:none; font-weight:600; margin:0 16px;">Contact</a>
          </div>
          <p style="margin:16px 0 0; color:#adb5bd; font-size:12px;">
            © ${new Date().getFullYear()} ${data.propertyName}. All rights reserved.<br>
            This email was sent regarding booking ${data.booking_id}
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>
;`;
    return reminderHtml;
};
exports.BOOKING_REMINDER_TEMPLATE = BOOKING_REMINDER_TEMPLATE;
const BOOKING_REMINDER_TEMPLATE_MULTIPLE = (data) => {
    const earliestCheckInDate = data.rooms.reduce((earliest, room) => {
        if (!earliest)
            throw new AppError_1.default("No check-in dates available", 404);
        return room.check_in_date < earliest ? room.check_in_date : earliest;
    }, data.rooms[0]?.check_in_date);
    const latestCheckOutDate = data.rooms.reduce((latest, room) => {
        if (!latest)
            throw new AppError_1.default("No check-out dates available", 404);
        return room.check_out_date < latest ? room.check_out_date : latest;
    }, data.rooms[0]?.check_out_date);
    const roomRowsHtml = data.rooms
        .map((room) => `
    <tr style="border-bottom: 1px solid #eeeeee;">
      <td style="padding: 12px 15px;">${room.name}</td>
      <td style="padding: 12px 15px;">${earliestCheckInDate}</td>
      <td style="padding: 12px 15px;">${latestCheckOutDate}</td>
      <td style="padding: 12px 15px; text-align: center;">${room.guests_count}</td>
    </tr>
  `)
        .join(", ");
    const fullEmailHtml = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Booking Reminder</title>
      <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f7f6; }
          .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
          .header { background-color: #007bff; color: #ffffff; padding: 20px; text-align: center; border-top-left-radius: 8px; border-top-right-radius: 8px;}
          .content { padding: 30px; color: #555555; line-height: 1.6; }
          .footer { padding: 20px; text-align: center; font-size: 12px; color: #999999; border-top: 1px solid #dddddd;}
          .booking-details { border: 1px solid #dddddd; border-radius: 5px; margin-top: 20px; }
          .booking-details th, .booking-details td { text-align: left; }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <h1 style="margin: 0; font-size: 24px;">Your Stay is Almost Here!</h1>
          </div>
          <div class="content">
              <p>Hi ${data.guestName},</p>
              <p>This is a friendly reminder about your upcoming stay at <strong>${data.propertyName}</strong>. We are looking forward to welcoming you on <strong>${earliestCheckInDate}</strong>.</p>
              <p>Your booking ID is <strong>${data.booking_id}</strong>. Here is a summary of the rooms you have reserved:</p>

              <table width="100%" class="booking-details" style="border-collapse: collapse; margin-top: 20px;">
                  <thead style="background-color: #f9f9f9;">
                      <tr>
                          <th style="padding: 12px 15px;">Room</th>
                          <th style="padding: 12px 15px;">Check-in</th>
                          <th style="padding: 12px 15px;">Check-out</th>
                          <th style="padding: 12px 15px; text-align: center;">Guests</th>
                      </tr>
                  </thead>
                  <tbody>
                      ${roomRowsHtml}
                  </tbody>
              </table>

              <h3 style="margin-top: 30px; color: #333333;">Important Information</h3>
              <ul>
                  <li><strong>Check-in time:</strong> After 3:00 PM</li>
                  <li><strong>Check-out time:</strong> Before 11:00 AM</li>
                  <li><strong>Address:</strong> [Your Property Address Here]</li>
              </ul>
              <p>If you have any questions or need to make changes to your booking, please don't hesitate to contact us.</p>
          </div>
          <div class="footer">
              <p>${data.propertyName} | [Your Phone Number] | [Your Website]</p>
          </div>
      </div>
  </body>
  </html>
  `;
    return fullEmailHtml;
};
exports.BOOKING_REMINDER_TEMPLATE_MULTIPLE = BOOKING_REMINDER_TEMPLATE_MULTIPLE;
const BOOKING_REJECTION_TEMPLATE_SINGLE = (data) => {
    const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Declined</title>
    <style>
        /* This is a fallback for clients that support it, but most styles are inline */
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f7f6;
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f7f6; font-family: Arial, sans-serif;">
    <table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#f4f7f6">
        <tr>
            <td align="center">
                <table width="600" border="0" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                    
                    <!-- Header -->
                    <tr>
                        <td align="center" style="background-color: #dc3545; color: #ffffff; padding: 20px; border-top-left-radius: 8px; border-top-right-radius: 8px;">
                            <h1 style="margin: 0; font-size: 24px;">Action Required: Payment Declined</h1>
                        </td>
                    </tr>

                    <!-- Main Content -->
                    <tr>
                        <td style="padding: 30px 25px; color: #555555; font-size: 16px; line-height: 1.6;">
                            <p style="margin: 0 0 20px;">Hi ${data.guestName},</p>
                            <p style="margin: 0 0 20px;">
                                We're writing to let you know that we were unable to process the recent payment for your booking.
                            </p>

                            <!-- Payment Details Box -->
                            <table width="100%" border="0" cellpadding="15" cellspacing="0" style="background-color: #fef4f4; border: 1px solid #f8d7da; border-radius: 5px; margin-bottom: 25px;">
                                <tr>
                                    <td>
                                        <strong style="color: #333333;">Booking Reference:</strong> ${data.booking_id.slice(0, 6).toUpperCase()}<br>
                                        <strong style="color: #333333;">Property:</strong> ${data.propertyName}<br>
                                        <strong style="color: #333333;">Amount:</strong> ${(0, formatCurrency_1.formatCurrency)(data.rooms.reduce((acc, num) => acc + num.subtotal, 0))}<br>
                                        <strong style="color: #333333;">Decline Reason:</strong> Expired Payment Link
                                    </td>
                                </tr>
                            </table>

                            <h3 style="color: #333333; margin-top: 0; margin-bottom: 15px;">What to do next?</h3>
                            <p style="margin: 0 0 20px;">
                                This can happen if the payment link has expired, if proof of payment was not uploaded in time, or if the transaction was declined by your bank. To keep your booking active, please update your payment details as soon as possible.
                            </p>

                            <!-- Call to Action Button -->
                            <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td align="center">
                                        <a href="[Update Payment Link]" target="_blank" style="display: inline-block; background-color: #007bff; color: #ffffff; padding: 14px 28px; font-size: 16px; font-weight: bold; text-decoration: none; border-radius: 5px;">
                                            Update Payment Method
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <p style="margin: 25px 0 0; font-size: 14px; color: #777777;">
                                If you believe this is an error or have any questions, please don't hesitate to contact our support team.
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td align="center" style="padding: 20px; font-size: 12px; color: #999999; border-top: 1px solid #dddddd;">
                            <p style="margin: 0;"> ${data.propertyName}</p>
                            <p style="margin: 10px 0 0;">Need help? Contact us at support@homz.com</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;
    return fullHtml;
};
exports.BOOKING_REJECTION_TEMPLATE_SINGLE = BOOKING_REJECTION_TEMPLATE_SINGLE;
//# sourceMappingURL=emailTemplates.js.map