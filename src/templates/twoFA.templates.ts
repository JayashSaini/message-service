const getTwoFATemplate = (data: any) => {
	return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Two-Factor Authentication (2FA) - XYZ Company</title>
        <style>
            /* Reset */
            body, table, td, a {
                font-family: 'Arial', sans-serif;
            }
            body {
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
            }
            table {
                width: 100%;
                border-collapse: collapse;
            }
  
            /* Email Container */
            .email-container {
                max-width: 800px;
                margin: 30px auto;
                background-color: #ffffff;
                border-radius: 10px;
                box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }
  
            /* Header */
            .header {
                background-color: #004085;
                color: #ffffff;
                text-align: center;
                padding: 25px;
                font-size: 26px;
                font-weight: bold;
            }
  
            /* Content */
            .content {
                padding: 25px;
                text-align: center;
                font-size: 16px;
                color: #333;
            }
            .content p {
                margin: 10px 0;
                line-height: 1.6;
            }
  
            /* Button */
            .btn {
                display: inline-block;
                margin: 20px auto;
                padding: 14px 28px;
                background-color: #004085;
                color: #ffffff;
                text-decoration: none;
                font-size: 16px;
                font-weight: bold;
                border-radius: 6px;
                transition: background-color 0.3s ease;
            }
            .btn:hover {
                background-color: #002752;
            }
  
            /* Footer */
            .footer {
                text-align: center;
                padding: 20px;
                font-size: 14px;
                color: #777;
                background-color: #f4f4f4;
            }
  
            /* Dark Mode */
            @media (prefers-color-scheme: dark) {
                body {
                    background-color: #121212;
                }
                .email-container {
                    background-color: #1e1e1e;
                    color: #ffffff;
                }
                .content p {
                    color: #ddd;
                }
                .btn {
                    background-color: #004085;
                }
                .btn:hover {
                    background-color: #002752;
                }
                .footer {
                    background-color: #1a1a1a;
                    color: #bbb;
                }
            }
        </style>
    </head>
    <body>
    <!-- Email Container -->
    <table align="center" class="email-container">
        <tr>
            <td class="header">
                Two-Factor Authentication (2FA)
            </td>
        </tr>
        <tr>
            <td class="content">
                <p>Dear <strong>${data.username}</strong>,</p>
                <p>To complete your login, please verify your identity by clicking the button below:</p>
                <a href="http://localhost:3000/verify/2fa/${
									data.emailVerificationToken
								}" class="btn">Verify 2FA</a>
                <p>This verification link will expire in 10 minutes. If you did not request this, please ignore this email.</p>
            </td>
        </tr>
        <tr>
            <td class="footer">
                &copy; ${new Date().getFullYear()} XYZ Company. All rights reserved.
            </td>
        </tr>
    </table>
    </body>
    </html>
    `;
};

// Export the function
export default getTwoFATemplate;
