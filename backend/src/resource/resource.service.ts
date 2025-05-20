import { Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { CreateResourceDto } from './dto/create-resource.dto'
import { UpdateResourceDto } from './dto/update-resource.dto'

@Injectable()
export class ResourceService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect()
  }

  create(dto: CreateResourceDto) {
    return this.resource.create({ data: dto })
  }

  findAll() {
    return this.resource.findMany({ orderBy: { createdAt: 'desc' } })
  }

  findOne(id: string) {
    return this.resource.findUnique({ where: { id } })
  }

  update(id: string, dto: UpdateResourceDto) {
    return this.resource.update({ where: { id }, data: dto })
  }

  remove(id: string) {
    return this.resource.delete({ where: { id } })
  }
}
