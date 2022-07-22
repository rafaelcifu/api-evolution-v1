import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { LoginModule } from './login/login.module';
import { PostModule } from './post/post.module';
import { UploadimageModule } from './uploadimage/uploadimage.module';
import { LikeModule } from './like/like.module';

@Module({
  imports: [UserModule, LoginModule, PostModule, UploadimageModule, LikeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
