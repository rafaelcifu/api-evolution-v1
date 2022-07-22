import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { LikeDTO } from './like.dto';
import { LikeService } from './like.service';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  @ApiBody({
    description:
      'Obrigatorio passar o PostID e UserID do like. Boolean está default como true',
  })
  async createLike(@Body() data: LikeDTO) {
    return this.likeService.createLike(data);
  }
}
