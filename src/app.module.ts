import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { database } from './config';
import { CoffeesModule } from './modules/coffees/coffees.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
    imports: [CoffeesModule, DatabaseModule.forRoot(database)],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
