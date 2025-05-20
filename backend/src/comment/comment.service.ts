import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  create(dto: CreateCommentDto) {
    return this.comment.create({
      data: {
        author: dto.author,
        text: dto.text,
        messageId: dto.messageId,
      },
    });
  }

  findAll() {
    return this.comment.findMany();
  }

  findOne(id: string) {
    return this.comment.findUnique({ where: { id } });
  }

  findByMessageId(messageId: string) {
    return this.comment.findMany({
      where: { messageId },
      orderBy: { createdAt: 'asc' },
    });
  }

  update(id: string, dto: UpdateCommentDto) {
    return this.comment.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: string) {
    return this.comment.delete({ where: { id } });
  }
}
