import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { CustomLogger } from 'src/customLogger';

@Module({
 imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get<string>('ZOHO_HOST'),
          port: config.get<string>('ZOHO_PORT'),
          secure: true, // true for 465, false for other ports
          auth: {
            user: config.get<string>('ZOHO_EMAIL_USER'),
            pass: config.get<string>('ZOHO_EMAIL_PASS'),
          },
        },
        defaults: {
          from: config.get<string>('ZOHO_EMAIL_USER'),
        },
        template: {
          dir: join(process.cwd(), 'src/mail/templates'), // Adjust this path based on your project structure
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
 ],
 providers: [MailService, CustomLogger],
 exports: [MailService],
})
export class MailModule {}
