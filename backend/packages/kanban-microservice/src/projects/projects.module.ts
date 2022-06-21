import { Module } from '@nestjs/common';
import { ProjectsService } from '@vira/projects/projects.service';
import { ProjectsController } from '@vira/projects/projects.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from '@vira/projects/entities/project.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
