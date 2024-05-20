import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { AdminPoll } from './dto/admin-poll.dto';
import { CreatePollDto } from './dto/create-poll.dto';
import { PublicPoll } from './dto/public-poll.dto';
import { UpdatePollDto } from './dto/update-poll.dto';
import { ChoiceDoesNotExistError } from './errors';
import { PollsService } from './polls.service';

@Controller('polls')
export class PollsController {
  constructor(private readonly pollsService: PollsService) {}

  @Post()
  createPoll(@Body() body: CreatePollDto): Promise<AdminPoll> {
    return this.pollsService.createPoll(body);
  }

  @Get(':public_uid')
  async getPublicPoll(
    @Param('public_uid') publicUid: string,
  ): Promise<PublicPoll> {
    const poll = await this.pollsService.getPublicPoll(publicUid);
    if (!poll) {
      throw new NotFoundException();
    }
    return poll;
  }

  @Get('admin/:admin_uid')
  async getAdminPoll(@Param('admin_uid') adminUid: string): Promise<AdminPoll> {
    const poll = await this.pollsService.getAdminPoll(adminUid);
    if (!poll) {
      throw new NotFoundException();
    }
    return poll;
  }

  @Delete('admin/:admin_uid')
  async deletePoll(@Param('admin_uid') adminUid: string): Promise<void> {
    const poll = await this.pollsService.deletePoll(adminUid);
    if (!poll) {
      throw new NotFoundException();
    }
  }

  @Put('admin/:admin_uid')
  async updatePoll(
    @Param('admin_uid') adminUid: string,
    @Body() body: UpdatePollDto,
  ): Promise<AdminPoll> {
    try {
      const poll = await this.pollsService.updatePoll(adminUid, body);
      if (!poll) {
        throw new NotFoundException();
      }
      return poll;
    } catch (e) {
      if (e instanceof ChoiceDoesNotExistError) {
        throw new BadRequestException(e.message, { cause: e });
      }
      throw e;
    }
  }
}
