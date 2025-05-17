import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaClient } from '@prisma/client';




@Injectable()
export class CommentService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
  create(createCommentDto: CreateCommentDto) {
    return this.comment.create({
      data: createCommentDto
    });
  }

  findAll() {
    return this.comment.findMany;
  }

  findOne() {
    return this.comment.findFirst();
  }

  update(id: string, updateCommentDto: UpdateCommentDto) {
    return this.comment.update({
      where : {id},
      data : updateCommentDto
    });
  }

  remove(id: string) {
    return this.comment.delete({where: {id}});
  }
}
