import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Issue } from '../../entities/issue.schema';
import { Activity } from '../../entities/activity.schema';

@Injectable()
export class IssueService {
  constructor(
    @InjectModel(Issue.name) private issueModel: Model<Issue>,
    @InjectModel(Activity.name) private activityModel: Model<Activity>,
  ) {}

  // ... your methods
}
