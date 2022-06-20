import { Module } from '@nestjs/common';
import { ProjectsService } from '@vira/projects/projects.service';
import { ProjectsController } from '@vira/projects/projects.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from '@vira/projects/entities/project.entity';
import { BoardsService } from '@vira/boards/boards.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
    BoardsService,
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
