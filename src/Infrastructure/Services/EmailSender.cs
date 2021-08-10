using MailKit.Net.Smtp;
using MimeKit;
using Project.Application.Common.Interfaces;
using Project.Application.Common.Models;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructure.Service
{
    public class EmailSender : IEmailSender
    {
        private readonly EmailConfiguration _emailConfig;

        public EmailSender(EmailConfiguration emailConfig)
        {
            _emailConfig = emailConfig;
        }

        public void SendEmail(Message message)
        {
            var emailMessage = CreateEmailMessage(message);

            Send(emailMessage);
        }

        public async Task SendEmailAsync(Message message)
        {
            var mailMessage = CreateEmailMessage(message);

            await SendAsync(mailMessage);
        }

        private MimeMessage CreateEmailMessage(Message message)
        {
            var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress(_emailConfig.From));
            emailMessage.To.AddRange(message.To);
            emailMessage.Subject = message.Subject;

            var bodyBuilder = new BodyBuilder { HtmlBody = message.Content };

            if (message.Attachments != null && message.Attachments.Any())
            {
                byte[] fileBytes;
                foreach (var attachment in message.Attachments)
                {
                    using (var ms = new MemoryStream())
                    {
                        attachment.CopyTo(ms);
                        fileBytes = ms.ToArray();
                    }

                    bodyBuilder.Attachments.Add(attachment.FileName, fileBytes, ContentType.Parse(attachment.ContentType));
                }
            }

            emailMessage.Body = bodyBuilder.ToMessageBody();
            return emailMessage;
        }

        private void Send(MimeMessage mailMessage)
        {
            using (var client = new SmtpClient())
            {
                try
                {
                    client.Connect(_emailConfig.SmtpServer, _emailConfig.Port, true);
                    client.AuthenticationMechanisms.Remove("XOAUTH2");
                    client.Authenticate(_emailConfig.UserName, _emailConfig.Password);

                    client.Send(mailMessage);
                }
                catch
                {
                    //log an error message or throw an exception, or both.
                    throw;
                }
                finally
                {
                    client.Disconnect(true);
                    client.Dispose();
                }
            }
        }

        private async Task SendAsync(MimeMessage mailMessage)
        {
            using (var client = new SmtpClient())
            {
                try
                {
                    await client.ConnectAsync(_emailConfig.SmtpServer, _emailConfig.Port, true);
                    client.AuthenticationMechanisms.Remove("XOAUTH2");
                    await client.AuthenticateAsync(_emailConfig.UserName, _emailConfig.Password);

                    await client.SendAsync(mailMessage);
                }
                catch
                {
                    //log an error message or throw an exception, or both.
                    throw;
                }
                finally
                {
                    await client.DisconnectAsync(true);
                    client.Dispose();
                }
            }
        }

        public string GetConfirmationEmailContent(string callbackUrl)
        {
            // email template: https://bbbootstrap.com/snippets/confirm-account-email-template-17848137
            var template = @"
                <!DOCTYPE html> <html> <head> <title></title> <meta http-equiv=""Content-Type"" content=""text/html; charset=utf-8"" /> <meta name=""viewport"" content=""width=device-width, initial-scale=1""> <meta http-equiv=""X-UA-Compatible"" content=""IE=edge"" /> <style type=""text/css""> @media screen { @font-face { font-family: 'Lato'; font-style: normal; font-weight: 400; src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff'); } @font-face { font-family: 'Lato'; font-style: normal; font-weight: 700; src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff'); } @font-face { font-family: 'Lato'; font-style: italic; font-weight: 400; src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff'); } @font-face { font-family: 'Lato'; font-style: italic; font-weight: 700; src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff'); } } /* CLIENT-SPECIFIC STYLES */ body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; } table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; } img { -ms-interpolation-mode: bicubic; } /* RESET STYLES */ img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; } table { border-collapse: collapse !important; } body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; } /* iOS BLUE LINKS */ a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; } /* MOBILE STYLES */ @media screen and (max-width:600px) { h1 { font-size: 32px !important; line-height: 32px !important; } } /* ANDROID CENTER FIX */ div[style*=""margin: 16px 0;""] { margin: 0 !important; } </style> </head> <body style=""background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;""> <!-- HIDDEN PREHEADER TEXT --> <div style=""display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;""> We're thrilled to have you here! Get ready to dive into your new account. </div> <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%""> <!-- LOGO --> <tr> <td bgcolor=""#6264A7"" align=""center""> <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%"" style=""max-width: 600px;""> <tr> <td align=""center"" valign=""top"" style=""padding: 40px 10px 40px 10px;""> </td> </tr> </table> </td> </tr> <tr> <td bgcolor=""#6264A7"" align=""center"" style=""padding: 0px 10px 0px 10px;""> <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%"" style=""max-width: 600px;""> <tr> <td bgcolor=""#ffffff"" align=""center"" valign=""top"" style=""padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;""> <h1 style=""font-size: 48px; font-weight: 400; margin: 2;"">Welcome!</h1> <img src=""https://user-images.githubusercontent.com/52860350/128319372-d962d316-f15c-46f3-9d1b-aed083d236dd.png"" alt=""logo"" width=""125"" height=""120"" style=""display: block; border: 0px;"" /> </td> </tr> </table> </td> </tr> <tr> <td bgcolor=""#f4f4f4"" align=""center"" style=""padding: 0px 10px 0px 10px;""> <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%"" style=""max-width: 600px;""> <tr> <td bgcolor=""#ffffff"" align=""left"" style=""padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;""> <p style=""margin: 0;"">I'm excited to have you get started. If you want to confirm your account. Just press the button below.</p> </td> </tr> <tr> <td bgcolor=""#ffffff"" align=""left""> <table width=""100%"" border=""0"" cellspacing=""0"" cellpadding=""0""> <tr> <td bgcolor=""#ffffff"" align=""center"" style=""padding: 20px 30px 60px 30px;""> <table border=""0"" cellspacing=""0"" cellpadding=""0""> <tr> <td align=""center"" style=""border-radius: 3px;"" bgcolor=""#6264A7""><a href=""[confirmLink]"" target=""_blank"" style=""font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #6264A7; display: inline-block;"">Confirm Account</a></td> </tr> </table> </td> </tr> </table> </td> </tr> <!-- COPY --> <tr> <td bgcolor=""#ffffff"" align=""left"" style=""padding: 0px 30px 0px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;""> <p style=""margin: 0;"">If that doesn't work, copy and paste the following link in your browser:</p> </td> </tr> <!-- COPY --> <tr> <td bgcolor=""#ffffff"" align=""left"" style=""padding: 20px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;""> <p style=""margin: 0; word-break: break-all;""><a href=""[confirmLink]"" target=""_blank"" style=""color: #6264A7;"">[confirmLink]</a></p> </td> </tr> <tr> <td bgcolor=""#ffffff"" align=""left"" style=""padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;""> <p style=""margin: 0;"">If you have any questions, just reply to this email.</p> </td> </tr> <tr> <td bgcolor=""#ffffff"" align=""left"" style=""padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;""> <a href=""https://github.com/KrystianSkwierawski/MultiStopwatch"" style=""margin: 0;"">MultiStopwatch</a><br /> <a href=""https://www.linkedin.com/in/krystian-skwierawski/"" style=""margin: 0;"">Krystian Skwierawski</a><br /> <a href=""mailto:krystian.ernest.skwierawski@gmail.com"" style=""margin: 0;"">krystian.ernest.skwierawski@gmail.com</a><br /> </td> </tr> </table> </td> </tr> </table> </body> </html>
            ";

            return template.Replace("[confirmLink]", callbackUrl);
        }

        public string GetResetPasswordEmailContent(string callbackUrl)
        {
            // email template: https://bbbootstrap.com/snippets/confirm-account-email-template-17848137
            var template = @"
                <!DOCTYPE html> <html> <head> <title></title> <meta http-equiv=""Content-Type"" content=""text/html; charset=utf-8"" /> <meta name=""viewport"" content=""width=device-width, initial-scale=1""> <meta http-equiv=""X-UA-Compatible"" content=""IE=edge"" /> <style type=""text/css""> @media screen { @font-face { font-family: 'Lato'; font-style: normal; font-weight: 400; src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff'); } @font-face { font-family: 'Lato'; font-style: normal; font-weight: 700; src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff'); } @font-face { font-family: 'Lato'; font-style: italic; font-weight: 400; src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff'); } @font-face { font-family: 'Lato'; font-style: italic; font-weight: 700; src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff'); } } /* CLIENT-SPECIFIC STYLES */ body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; } table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; } img { -ms-interpolation-mode: bicubic; } /* RESET STYLES */ img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; } table { border-collapse: collapse !important; } body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; } /* iOS BLUE LINKS */ a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; } /* MOBILE STYLES */ @media screen and (max-width:600px) { h1 { font-size: 32px !important; line-height: 32px !important; } } /* ANDROID CENTER FIX */ div[style*=""margin: 16px 0;""] { margin: 0 !important; } </style> </head> <body style=""background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;""> <!-- HIDDEN PREHEADER TEXT --> <div style=""display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;""> We're thrilled to have you here! Get ready to dive into your new account. </div> <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%""> <!-- LOGO --> <tr> <td bgcolor=""#6264A7"" align=""center""> <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%"" style=""max-width: 600px;""> <tr> <td align=""center"" valign=""top"" style=""padding: 40px 10px 40px 10px;""> </td> </tr> </table> </td> </tr> <tr> <td bgcolor=""#6264A7"" align=""center"" style=""padding: 0px 10px 0px 10px;""> <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%"" style=""max-width: 600px;""> <tr> <td bgcolor=""#ffffff"" align=""center"" valign=""top"" style=""padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;""> <h1 style=""font-size: 48px; font-weight: 400; margin: 2;"">Welcome!</h1> <img src=""https://user-images.githubusercontent.com/52860350/128319372-d962d316-f15c-46f3-9d1b-aed083d236dd.png"" alt=""logo"" width=""125"" height=""120"" style=""display: block; border: 0px;"" /> </td> </tr> </table> </td> </tr> <tr> <td bgcolor=""#f4f4f4"" align=""center"" style=""padding: 0px 10px 0px 10px;""> <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%"" style=""max-width: 600px;""> <tr> <td bgcolor=""#ffffff"" align=""left"" style=""padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;""> <p style=""margin: 0;"">If you want to reset your password. Press the button below.</p> </td> </tr> <tr> <td bgcolor=""#ffffff"" align=""left""> <table width=""100%"" border=""0"" cellspacing=""0"" cellpadding=""0""> <tr> <td bgcolor=""#ffffff"" align=""center"" style=""padding: 20px 30px 60px 30px;""> <table border=""0"" cellspacing=""0"" cellpadding=""0""> <tr> <td align=""center"" style=""border-radius: 3px;"" bgcolor=""#6264A7""><a href=""[confirmLink]"" target=""_blank"" style=""font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #6264A7; display: inline-block;"">Reset Password</a></td> </tr> </table> </td> </tr> </table> </td> </tr> <!-- COPY --> <tr> <td bgcolor=""#ffffff"" align=""left"" style=""padding: 0px 30px 0px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;""> <p style=""margin: 0;"">If that doesn't work, copy and paste the following link in your browser:</p> </td> </tr> <!-- COPY --> <tr> <td bgcolor=""#ffffff"" align=""left"" style=""padding: 20px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;""> <p style=""margin: 0; word-break: break-all;""><a href=""[confirmLink]"" target=""_blank"" style=""color: #6264A7;"">[confirmLink]</a></p> </td> </tr> <tr> <td bgcolor=""#ffffff"" align=""left"" style=""padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;""> <p style=""margin: 0;"">If you have any questions, just reply to this email.</p> </td> </tr> <tr> <td bgcolor=""#ffffff"" align=""left"" style=""padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;""> <a href=""https://github.com/KrystianSkwierawski/MultiStopwatch"" style=""margin: 0;"">MultiStopwatch</a><br /> <a href=""https://www.linkedin.com/in/krystian-skwierawski/"" style=""margin: 0;"">Krystian Skwierawski</a><br /> <a href=""mailto:krystian.ernest.skwierawski@gmail.com"" style=""margin: 0;"">krystian.ernest.skwierawski@gmail.com</a><br /> </td> </tr> </table> </td> </tr> </table> </body> </html>
            ";

            return template.Replace("[confirmLink]", callbackUrl);
        }
    }
}
