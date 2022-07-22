import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { UploadimageService } from 'src/uploadimage/uploadimage.service';
import { PostDTO } from './post.dto';

@Injectable()
export class PostService {
  constructor(
    private prisma: PrismaService,
    private uploadimageService: UploadimageService,
  ) {}
  async createPost(data: PostDTO, file: Express.Multer.File) {
    const authorIdExists = await this.prisma.user.findUnique({
      where: {
        id: data.authorId,
      },
    });
    if (!authorIdExists) {
      throw new HttpException('Author doesnt exists', 400);
    }
    // instancia o service que faz upload na AWS
    const postImgUrl = await this.uploadimageService.upload(file);

    const newPost = await this.prisma.post.create({
      data: {
        authorId: data.authorId,
        author_name: authorIdExists.username,
        description: data.description,
        image_url: postImgUrl.resourceUrl,
        title: data.title,
        published: data.published,
      },
    });
    return newPost;
  }
  async findAllPosts() {
    return await this.prisma.post.findMany();
  }
  async searchPostByDescription(description: string, data: PostDTO) {
    return await this.prisma.post.findMany({
      where: {
        description: {
          contains: description,
        },
        published: true,
      },
    });
  }
  async getPostByAuthorId(AuthorId: string, data: PostDTO) {
    return await this.prisma.post.findMany({
      where: {
        authorId: AuthorId,
        published: true,
      },
    });
  }
  async updatePost(id: string, data: PostDTO) {
    const postExists = await this.prisma.post.findUnique({
      where: {
        id,
      },
    });
    if (!postExists) {
      throw new HttpException('Post doesnt exists', 400);
    }
    return await this.prisma.post.update({
      data: {
        title: data.title,
        description: data.description,
        published: data.published,
      },
      where: {
        id,
      },
      select: {
        title: true,
        published: true,
        description: true,
      },
    });
  }
  async getPostsWithLikes() {
    return await this.prisma.post.findMany({
      include: {
        likes: true,
      },
    });
  }
}
