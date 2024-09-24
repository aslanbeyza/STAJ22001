import User from "../models/userModel";
import nodemailer from 'nodemailer';
import bcryptjs from "bcryptjs";
/*bcryptjs: Bir parolanın hash'lenmesi, yani şifrelenmesi, bcryptjs kullanılarak oldukça basittir */

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        console.log("Maillerts");
        // Doğrulanmış token oluşturma
        const hasedToken = await bcryptjs.hash(userId.toString(), 10); /* saltRounds karmasıklıgı belirleyen sayı bu  */

        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hasedToken,
                verifyTokenExpiry: Date.now() + 3600000
            });
        } else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hasedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000
            });
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "f2fa78858095f9",
              pass: "bfe9993402df59"
            }
          });

        const DOMAIN = process.env.DOMAIN || "http://localhost:3000";
        const mailOptions = {
            from: 'aslanbeyza3413@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Email adresini doğrula" : "Şifreyi sıfırla",
            html: `<p>Buraya <a href="${DOMAIN}/verifymail?token=${hasedToken}">Tıkla</a> bilgilerin bana geçsin ha ha ha ${emailType === 'VERIFY' ? "Emaili doğrula" : "Şifreni sıfırla"}
                     ya da bu linki kopyala tarayıcına yapıştır
                     <br> ${DOMAIN}/verifymail?token=${hasedToken}
                   </p>`
        };
        const mailresponse = await transport.sendMail(mailOptions);
        return mailresponse;
    } catch (error: any) {
        throw new Error(error.message);
    }

}
