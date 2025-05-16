import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ResourceService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
  create(createResourceDto: CreateResourceDto) {
    return this.resource.create({
      data: createResourceDto
    });
  }

  findAll() {
    return this.resource.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  findOne() {
    return this.resource.findFirst();
  }

  update(id: string, updateResourceDto: UpdateResourceDto) {
    return this.resource.update({
      where: {id},
      data: updateResourceDto
    });
  }

  remove(id: string) {
    return this.resource.delete({where : {id}});
  }
}
