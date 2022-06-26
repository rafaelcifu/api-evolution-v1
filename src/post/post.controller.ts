import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostDTO } from './post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  createPost(@UploadedFile() file: Express.Multer.File, @Body() data: PostDTO) {
    console.log(file);
    return this.postService.createPost(data, file);
  }
  @Get()
  async findAllPosts() {
    return this.postService.findAllPosts();
  }
  @Get('/search=:description')
  async searchPostByDescription(
    @Param('description') description: string,
    @Body() data: PostDTO,
  ) {
    return this.postService.searchPostByDescription(description, data);
  }
  @Get(':AuthorId')
  async GetPostByAuthorId(
    @Param('AuthorId') AuthorId: string,
    @Body() data: PostDTO,
  ) {
    return this.postService.GetPostByAuthorId(AuthorId, data);
  }
}

// @Post()
// @UseInterceptors(FileInterceptor('file'))
// createPost(@UploadedFile() file: Express.Multer.File, @Body() data: PostDTO) {
//   console.log(file);
//   return this.postService.createPost(data);
// }
// }
