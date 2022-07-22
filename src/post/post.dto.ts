export class PostDTO {
  id?: string;
  title?: string;
  description: string;
  image_url: string;
  author_name?: string;
  authorId: string;
  published: boolean;
  likes_counter?: number;
}
