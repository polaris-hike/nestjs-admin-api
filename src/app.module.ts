import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { database } from './config';
import { CoffeesModule } from './modules/coffees/coffees.module';
import { DatabaseModule } from './modules/database/database.module';
import { OrgModule } from './modules/org/org.module';
import { UsersModule } from './modules/user/user.module';

@Module({
    imports: [CoffeesModule, DatabaseModule.forRoot(database), UsersModule, OrgModule],
    controllers: [AppController],
    providers: [
        AppService,
        // {
        //     provide: APP_GUARD,
        //     useClass: JwtGuard,
        // },
    ],
})
export class AppModule {}
