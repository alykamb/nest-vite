import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { configModuleOptions } from './config'
import { AuthModule } from './modules/auth/auth.module'
// import { queueModule } from './modules/queue/queue.module'
import { RabbitMq } from './modules/rabbitmq/rabbitmq'

@Module({
    imports: [AuthModule, ConfigModule.forRoot(configModuleOptions)],
    controllers: [AppController],
    providers: [AppService, RabbitMq],
})
export class AppModule {}
