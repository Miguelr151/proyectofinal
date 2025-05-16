import { Module } from '@nestjs/common';
import { StudentModule } from './student/student.module';
import { TutorModule } from './tutor/tutor.module';
import { SessionModule } from './session/session.module';
import { ForumMessageModule } from './forum-message/forum-message.module';
import { CommentModule } from './comment/comment.module';
import { ResourceModule } from './resource/resource.module';

@Module({
  imports: [StudentModule, TutorModule, SessionModule, ForumMessageModule, CommentModule, ResourceModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
