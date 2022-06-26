import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadimageService } from './uploadimage.service';
require('dotenv').config();

@Controller('upload')
export class UploadimageController {
  constructor(private readonly uploadimageService: UploadimageService) {}

  @Post('image')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 4 * 1024 * 1024,
      },
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.uploadimageService.upload(file);
  }
}
