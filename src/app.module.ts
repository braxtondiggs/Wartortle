import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { TaskService } from './task.service';
import { EditorModule } from './editor/editor.module';
import { EditorService } from './editor/editor.service';
import { UtilService } from './util.service';
import { Editor, EditorSchema } from './editor/editors.schema';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([{ name: Editor.name, schema: EditorSchema }]),
    EditorModule
  ],
  controllers: [AppController],
  providers: [EditorService, TaskService, UtilService]
})
export class AppModule {}
