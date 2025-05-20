import { Injectable, OnModuleInit, NotFoundException, UnauthorizedException } from '@nestjs/common';
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

  async login(email: string, password: string) {
    const student = await this.student.findFirst({ where: { email } });
    if (!student) {
      throw new NotFoundException('Estudiante no encontrado');
    }
    if (student.password !== password) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }
    return student;
  }

  findAll() {
    return this.student.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

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
