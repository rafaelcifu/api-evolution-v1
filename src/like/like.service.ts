import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { LikeDTO } from './like.dto';

@Injectable()
export class LikeService {
  constructor(private prisma: PrismaService) {}
  async createLike(data: LikeDTO) {
    const postExists = await this.prisma.post.findUnique({
      where: {
        id: data.postId,
      },
    });
    if (!postExists) {
      throw new HttpException('Post doesnt exists', 400);
    }
    const userExists = await this.prisma.user.findUnique({
      where: {
        id: data.userId,
      },
    });
    if (!userExists) {
      throw new HttpException('User doesnt exists', 400);
    }
    const newLike = await this.prisma.likes.create({
      data: {
        userId: data.userId,
        postId: data.postId,
        liked: data.liked,
      },
    });
    const countPostLikes = await this.prisma.likes.count({
      where: {
        postId: data.postId,
        liked: true,
      },
    });
    const updatePostLikesCounter = await this.prisma.post.update({
      data: {
        likes_counter: countPostLikes,
      },
      where: {
        id: data.postId,
      },
    });
    return newLike;
  }
  async updateLike(id: string, data: LikeDTO) {
    const postExists = await this.prisma.likes.findUnique({
      where: {
        id,
      },
    });
    if (!postExists) {
      throw new HttpException('Like register doesnt exists', 400);
    }
    const updateLike = await this.prisma.likes.update({
      where: {
        id,
      },
      data: {
        liked: data.liked,
        postId: data.postId,
      },
    });
    const countPostLikes = await this.prisma.likes.count({
      where: {
        postId: data.postId,
        liked: true,
      },
    });
    const updatePostLikesCounter = await this.prisma.post.update({
      data: {
        likes_counter: countPostLikes,
      },
      where: {
        id: data.postId,
      },
    });
    return updateLike;
  }
}
