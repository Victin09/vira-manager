import { Module } from '@nestjs/common';
import { ProjectsService } from '@vira/projects/projects.service';
import { ProjectsController } from '@vira/projects/projects.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from '@vira/projects/entities/project.entity';
import { CardsModule } from '@vira/cards/cards.module';
import { ListsModule } from '@vira/lists/lists.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
    ListsModule,
    CardsModule,
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
