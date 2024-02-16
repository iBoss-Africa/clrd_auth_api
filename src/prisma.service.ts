import { INestApplication, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";



export class PrismaService extends PrismaClient implements OnModuleInit{

    async  onModuleInit() {
        await this.$connect()
    }

    async enableShutdownHooks(app: INestApplication){
        
        process.on('SIGINT', async () => {
            console.log('Received SIGINT. Shutting down gracefully...');
            await app.close();
        });
    }
}