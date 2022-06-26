import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaService } from '../database/PrismaService';
import { UploadimageController } from 'src/uploadimage/uploadimage.controller';
import { UploadimageService } from 'src/uploadimage/uploadimage.service';

@Module({
  controllers: [PostController, UploadimageController],
  providers: [PostService, PrismaService, UploadimageService],
})
export class PostModule {}
