import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateTutorDto } from './dto/create-tutor.dto';
import { UpdateTutorDto } from './dto/update-tutor.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class TutorService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async create(createTutorDto: CreateTutorDto) {
    const existing = await this.tutor.findUnique({
      where: { email: createTutorDto.email },
    });

    if (existing) {
      throw new Error('Este correo ya está registrado como tutor.');
    }

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
