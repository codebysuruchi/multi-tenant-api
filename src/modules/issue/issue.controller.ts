import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { IssueService } from './issue.service';
import { ActivityService } from '../activity/activity.service';
import { Roles } from '../../decorators/roles.decorator';
import { RolesGuard } from '../../guards/roles.guard';
import { CreateIssueDto } from './dto/create-issue.dto';

@Controller('issues')
export class IssueController {
  constructor(
    private issueService: IssueService,
    private activityService: ActivityService,
  ) {}

  @Post()
  async create(@Body() data: CreateIssueDto, @Req() req) {
    const issue = await this.issueService.createIssue(data, req['organizationId']);
    return issue;
  }

  @Get()
  async findAll(@Req() req) {
    return this.issueService.getIssues(req['organizationId']);
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @Req() req) {
    return this.issueService.getIssueById(id, req['organizationId']);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  async update(@Param('id') id: number, @Body() data, @Req() req) {
    const issue = await this.issueService.updateIssue(
      id,
      data,
      req['organizationId'],
      req.user.role,
    );
    // Pass empty string instead of null for oldValue if your method expects string
    await this.activityService.logActivity(
      id,
      'STATUS_CHANGED',
      '', // or data.status if you want to log the old status
      data.status,
      req['organizationId'],
    );
    return issue;
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  async remove(@Param('id') id: number, @Req() req) {
    return this.issueService.deleteIssue(
      id,
      req['organizationId'],
      req.user.role,
    );
  }
}
