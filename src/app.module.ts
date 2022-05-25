import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { LoginModule } from './login/login.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [UserModule, LoginModule, PostModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
