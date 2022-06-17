import { Module } from '@nestjs/common';
import { ProjectsService } from '@vira/projects/projects.service';
import { ProjectsController } from '@vira/projects/projects.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from '@vira/projects/entities/project.entity';
import { ListsModule } from '@vira/lists/lists.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
    ListsModule,
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
