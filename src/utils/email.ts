import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { Inject } from '@nestjs/common';



export default class Email{
  @Inject(ConfigService)

  private static transporter: nodemailer.Transporter;

  static initialize(){
    const config = new ConfigService();

      this.transporter = nodemailer.createTransport({
        host: 'smtp.zoho.com',
        port: 465,
        secure: true, // true for 465, false for other ports,
        pool: true,
        rateLimit: 20,
        auth: {
            user: config.get<string>('ZOHO_EMAIL_USER'),
            pass: config.get<string>('ZOHO_EMAIL_PASS')
        }
    })
  }

  static async welcomeMail(email: string, name: string ){
    if (!this.transporter) {
      this.initialize();
    }
    const config = new ConfigService();
    await this.transporter.sendMail({
      from: config.get<string>('ZOHO_EMAIL_USER'),
      to: email, 
      subject: 'Welcome',
      text: 'Welcome' + ' ' + `${name}`,
      
    });

  }


  static async verifyEmail(email: string, name: string, verifyLink: string, token){
    if (!this.transporter) {
      this.initialize();
    }
    const config = new ConfigService();
    await this.transporter.sendMail({
      from: config.get<string>('ZOHO_EMAIL_USER'),
      to: email, 
      subject: 'Verify your account',
      text: ` Dear ${name}, find below ${verifyLink}, ${token}`,
    });

  }
 
}