import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class SessionService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
  create(createSessionDto: CreateSessionDto) {
    return this.session.create({
      data: createSessionDto
    });
  }

  findAll() {
    return this.session.findMany({
      orderBy:{
        createdAt : 'desc'
      }
    });
  }

  findOne() {
    return this.session.findFirst();
  }

  update(id: string, updateSessionDto: UpdateSessionDto) {
    return this.session.update({
      where : {id},
      data : updateSessionDto
    });
  }

  remove(id: string) {
    return this.session.delete({where: {id}});
  }
}
