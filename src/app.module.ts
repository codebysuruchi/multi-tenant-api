import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IssueModule } from './modules/issue/issue.module';
import { ActivityModule } from './modules/activity/activity.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/issue-management'),
    IssueModule,
    ActivityModule,
  ],
})
export class AppModule {}
