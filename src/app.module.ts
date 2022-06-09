import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { LoginModule } from './login/login.module';
import { PostModule } from './post/post.module';
import { UploadimageModule } from './uploadimage/uploadimage.module';

@Module({
  imports: [UserModule, LoginModule, PostModule, UploadimageModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
