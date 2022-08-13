import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaService } from '../database/PrismaService';
import { UploadimageController } from 'src/uploadimage/uploadimage.controller';
import { UploadimageService } from 'src/uploadimage/uploadimage.service';
import { JwtStrategy } from 'src/guards/jwt.strategy';

@Module({
  controllers: [PostController, UploadimageController],
  providers: [PostService, PrismaService, UploadimageService, JwtStrategy],
})
export class PostModule {}
