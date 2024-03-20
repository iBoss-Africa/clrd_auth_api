import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CompanyController } from './company/company.controller';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { CaslModule } from './casl/casl.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { MailModule } from './mail/mail.module';


@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        PrismaService,
        AuthModule,
        CaslModule,
        UsersModule,
        RolesModule,
        PermissionsModule,
        MailModule,
    ],
    controllers: [CompanyController],
    providers: [{
        provide: 'CLRD_SERVICE',
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
            return ClientProxyFactory.create({
                transport: Transport.TCP,
                options: {
                    host: configService.get('CLRD_API_HOST'),
                    port: configService.get('CLRD_API_PORT')
                }
            })
        }
    }],
})
export class AppModule { }
