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
    const data = {
      ...createSessionDto,
      scheduledAt: new Date(createSessionDto.scheduledAt),
    };

    return this.session.create({
      data,
    });
  }

  // 🔁 Para el TUTOR: traer nombre del estudiante
  async getByTutor(tutorId: string) {
    const sessions = await this.session.findMany({
      where: { tutorId },
      orderBy: { scheduledAt: 'asc' }
    });

    const withStudentNames = await Promise.all(
      sessions.map(async (s) => {
        const student = await this.student.findUnique({
          where: { id: s.studentId },
          select: { name: true },
        });
        return {
          ...s,
          studentName: student?.name ?? 'Desconocido',
        };
      })
    );

    return withStudentNames;
  }

  // 🔁 Para el ESTUDIANTE: traer nombre del tutor
  async getByStudent(studentId: string) {
    const sessions = await this.session.findMany({
      where: { studentId },
      orderBy: { createdAt: 'asc' },
    });

    const withTutorNames = await Promise.all(
      sessions.map(async (s) => {
        const tutor = await this.tutor.findUnique({
          where: { id: s.tutorId },
          select: { name: true },
        });
        return {
          ...s,
          tutorName: tutor?.name ?? 'Desconocido',
        };
      })
    );

    return withTutorNames;
  }

  findAll() {
    return this.session.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  findOne() {
    return this.session.findFirst();
  }

  update(id: string, updateSessionDto: UpdateSessionDto) {
    return this.session.update({
      where: { id },
      data: updateSessionDto,
    });
  }

  remove(id: string) {
    return this.session.delete({
      where: { id },
    });
  }
}
