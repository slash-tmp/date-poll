import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';

import { CreatePollDto } from './dto/create-poll.dto';
import { PollsService } from './polls.service';

@Controller('polls')
export class PollsController {
  constructor(private readonly pollsService: PollsService) {}

  @Post()
  createPoll(@Body() body: CreatePollDto) {
    return this.pollsService.createPoll(body);
  }

  @Get(':public_uid')
  async getPublicPoll(@Param('public_uid') publicUid: string) {
    const poll = await this.pollsService.getPublicPoll(publicUid);
    if (!poll) {
      throw new NotFoundException();
    }
    return poll;
  }

  @Get('admin/:admin_uid')
  async getAdminPoll(@Param('admin_uid') adminUid: string) {
    const poll = await this.pollsService.getAdminPoll(adminUid);
    if (!poll) {
      throw new NotFoundException();
    }
    return poll;
  }
}
