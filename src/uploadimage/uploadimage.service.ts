import { Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
require('dotenv').config();

@Injectable()
export class UploadimageService {
  async upload(file: Express.Multer.File) {
    const s3Client = new S3Client({
      region: process.env.AWS_BUCKET_REGION,
      credentials: {
        accessKeyId: process.env.AWS_BUCKET_ACCESS_KEY,
        secretAccessKey: process.env.AWS_BUCKET_SECRET_KEY,
      },
    });

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
      ContentDisposition: 'inline',
    };
    const result = await s3Client.send(new PutObjectCommand(params));
    console.log(result);

    // tratar retorno da url com replace de espaços vazios
    function handleStringSpaces(namefile: string) {
      return file.originalname.replace(/ /g, '+');
    }

    // construir URL de retorno da IMG
    return {
      filename: file.originalname,
      resourceUrl:
        process.env.AWS_RESOURCE_BASE_URL +
        handleStringSpaces(file.originalname),
    };
  }
}
