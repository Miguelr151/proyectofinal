import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateForumMessageDto } from './dto/create-forum-message.dto';
import { UpdateForumMessageDto } from './dto/update-forum-message.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ForumMessageService extends PrismaClient implements OnModuleInit{
  async onModuleInit() {
    await this.$connect();
  }
  create(createForumMessageDto: CreateForumMessageDto) {
    return this.forumMessage.create({
      data: createForumMessageDto
    });
  }

  findAll() {
    return this.forumMessage.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  findOne() {
    return this.forumMessage.findFirst();
  }

  update(id: string, updateForumMessageDto: UpdateForumMessageDto) {
    return this.forumMessage.update({
      where: {id},
      data: updateForumMessageDto
    });
  }

  remove(id: string) {
    return this.forumMessage.delete({where : {id}});
  }
}
