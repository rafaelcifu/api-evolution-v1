import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { LoginModule } from './login/login.module';

@Module({
  imports: [UserModule, LoginModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
