import { MailAdapter, SendMailData } from "../mail_adapter";
import nodemailer from 'nodemailer';

//Mail service configuration
const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "0c8a78d6be43ef",
    pass: "cace9a5f4cdb02"
  }
});

export class NodemailerMailAdapter implements MailAdapter{
    async sendMail({subject,body}: SendMailData){
         //Sending email
    await transport.sendMail({
      from: "Fidget Team <hi@fidget.com>",
      to: "Eugénio <nitonhamposse@gamil.com>",
      subject: subject,
      html: body,
    });
    }
}