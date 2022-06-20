import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectsModule } from './projects/projects.module';
import { ListsModule } from './lists/lists.module';
import { CardsModule } from './cards/cards.module';
import { SprintsModule } from './sprints/sprints.module';
import { BoardsModule } from './boards/boards.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://0.0.0.0:27017/vira-manager-kanban'),
    ProjectsModule,
    ListsModule,
    CardsModule,
    SprintsModule,
    BoardsModule,
  ],
})
export class AppModule {}
