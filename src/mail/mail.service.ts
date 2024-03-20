import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config'; 

@Injectable()
export class MailService {
    constructor(
        private readonly mailerService: MailerService,
        private readonly configService: ConfigService, 
    ) {}

    async welcomeMail(email: string, name: string ){
        
        const config = new ConfigService();
    
        const mailOptions={
          from: config.get<string>('ZOHO_EMAIL_USER'),
          to: email, 
          subject: 'Welcome',
          context: { 
                name: name
            },
        }
    
        try {
            await this.mailerService.sendMail(mailOptions);
            return 'Email sent successfully';
        } catch (error) {
            console.error('Error sending email:', error);
        }
    
      }

    async verifyEmail(email: string, name: string, verifyLink: string, token: number) {
        const mailOptions = {
            from: this.configService.get<string>('ZOHO_EMAIL_USER'),
            to: email,
            subject: 'Verify your account',
            template: 'verify', 
            context: { 
                name: name,
                verifyLink: verifyLink,
                token: token,
            },
        };
        try {
            await this.mailerService.sendMail(mailOptions);
            return 'Email sent successfully';
        } catch (error) {
            console.error('Error sending email:', error);
        }
    }
}
