import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectsModule } from './projects/projects.module';
import { ListsModule } from './lists/lists.module';
import { CardsModule } from './cards/cards.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://0.0.0.0:27017/vira-manager-kanban'),
    ProjectsModule,
    ListsModule,
    CardsModule,
  ],
})
export class AppModule {}
