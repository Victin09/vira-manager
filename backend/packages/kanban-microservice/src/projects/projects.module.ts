import { Module } from '@nestjs/common';
import { ProjectsService } from '@vira/projects/projects.service';
import { ProjectsController } from '@vira/projects/projects.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from '@vira/projects/entities/project.entity';
import { CardsModule } from '@vira/cards/cards.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
    CardsModule,
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
