import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SessionService } from './session.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  create(@Body() createSessionDto: CreateSessionDto) {
    return this.sessionService.create(createSessionDto);
  }

  @Get()
  findAll() {
    return this.sessionService.findAll();
  }
  
  @Get('tutor/:tutorId')
getByTutor(@Param('tutorId') tutorId: string) {
  return this.sessionService.getByTutor(tutorId);
}


  @Get('')
  findOne() {
    return this.sessionService.findOne();
  }

  @Get('/student/:id')
getByStudent(@Param('id') id: string) {
  return this.sessionService.getByStudent(id);
}


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSessionDto: UpdateSessionDto) {
    return this.sessionService.update(id, updateSessionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sessionService.remove(id);
  }
}
