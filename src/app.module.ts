import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { LoginModule } from './login/login.module';
import { PostModule } from './post/post.module';
import { UploadimageModule } from './uploadimage/uploadimage.module';
import { LikeModule } from './like/like.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtStrategy } from './guards/jwt.strategy';

@Module({
  imports: [UserModule, LoginModule, PostModule, UploadimageModule, LikeModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    JwtStrategy,
  ],
})
export class AppModule {}
