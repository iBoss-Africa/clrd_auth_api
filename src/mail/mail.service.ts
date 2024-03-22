import {Injectable, InternalServerErrorException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config'; 
import { CustomLogger } from 'src/customLogger';

@Injectable()
export class MailService {

    constructor(
        private readonly customLogger: CustomLogger,
        private readonly mailerService: MailerService,
        private readonly configService: ConfigService, 
    ) {}

    async welcomeMail(email: string, name: string ){
        const mailOptions={
          from: this.configService.get<string>('ZOHO_EMAIL_USER'),
          to: email, 
          subject: 'Welcome',
          template:'welcome',
          context: { 
                name: name
            },
        }
    
        try {
            this.customLogger.debug(`Welcome mail to be sent to ${email}`);
            await this.mailerService.sendMail(mailOptions);
        } catch (error) {
            this.customLogger.debug(`Failed while trying to send a mail to ${email}`, error.stack);
            return  new InternalServerErrorException();
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
            this.customLogger.debug(`Verification mail to be sent to ${email}`);
            await this.mailerService.sendMail(mailOptions);
        } catch (error) {
            this.customLogger.error(`Failed while trying to send a mail to ${email}`, error.stack);
            throw new InternalServerErrorException('Failed to send verification email', error);
        }
    }
}
