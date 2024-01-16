import { Module } from '@nestjs/common';

import { APP_GUARD } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { database } from './config';
import { CoffeesModule } from './modules/coffees/coffees.module';
import { DatabaseModule } from './modules/database/database.module';
import { AuthGuard } from './modules/user/guards/auth.guard';
import { UsersModule } from './modules/user/user.module';

@Module({
    imports: [CoffeesModule, DatabaseModule.forRoot(database), UsersModule],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
    ],
})
export class AppModule {}
