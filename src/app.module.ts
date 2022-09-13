import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { TaskService } from './task.service';
import { EditorModule } from './editor/editor.module';
import { EditorService } from './editor/editor.service';
import { Editor, EditorSchema } from './editor/editor.schema';
import { LanguageModule } from './language/language.module';
import { LanguageService } from './language/language.service';
import { Language, LanguageSchema } from './language/language.schema';
import { ProjectModule } from './project/project.module';
import { ProjectService } from './project/project.service';
import { Project, ProjectSchema } from './project/project.schema';
import { HealthModule } from './health/health.module';
import { UtilService } from './util.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([
      { name: Editor.name, schema: EditorSchema },
      { name: Language.name, schema: LanguageSchema },
      { name: Project.name, schema: ProjectSchema }
    ]),
    HttpModule,
    EditorModule,
    LanguageModule,
    ProjectModule,
    HealthModule
  ],
  controllers: [AppController],
  providers: [
    EditorService,
    LanguageService,
    ProjectService,
    TaskService,
    UtilService
  ]
})
export class AppModule {}
