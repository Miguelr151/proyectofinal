import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class StudentService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  create(createStudentDto: CreateStudentDto) {
    return this.student.create({
      data: createStudentDto
    });
  }


  findAll() {
    return this.student.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  // 🔧 Corrección importante:
  // Antes se retornaba un tutor, no un estudiante. Esto estaba mal.
  findOne(id: string) {
    return this.student.findUnique({
      where: { id }
    });
  }

  update(id: string, updateStudentDto: UpdateStudentDto) {
    return this.student.update({
      where: { id },
      data: updateStudentDto
    });
  }

  remove(id: string) {
    return this.student.delete({
      where: { id }
    });
  }
}
