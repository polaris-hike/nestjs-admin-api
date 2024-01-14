import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { database } from './config';
import { AuthModule } from './modules/auth/auth.module';
import { CoffeesModule } from './modules/coffees/coffees.module';
import { DatabaseModule } from './modules/database/database.module';
import { UsersModule } from './modules/users/users.module';

@Module({
    imports: [CoffeesModule, DatabaseModule.forRoot(database), AuthModule, UsersModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
