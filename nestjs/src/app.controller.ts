import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @HttpCode(201)
  @Post()
  createEntry(@Body('name') name: string) {
    return this.appService.createEntry(name);
  }

  @Get()
  async getEntries() {
    return this.appService.fetchAll();
  }
}
