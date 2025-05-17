import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateTutorDto } from './dto/create-tutor.dto';
import { UpdateTutorDto } from './dto/update-tutor.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class TutorService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  create(createTutorDto: CreateTutorDto) {
    return this.tutor.create({
      data: createTutorDto,
    });
  }

  findAll() {
    return this.tutor.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // 🔧 CORREGIDO: usar findUnique con ID
  findOne(id: string) {
    return this.tutor.findUnique({
      where: { id },
    });
  }

  update(id: string, updateTutorDto: UpdateTutorDto) {
    return this.tutor.update({
      where: { id },
      data: updateTutorDto,
    });
  }

  remove(id: string) {
    return this.tutor.delete({
      where: { id },
    });
  }
}
