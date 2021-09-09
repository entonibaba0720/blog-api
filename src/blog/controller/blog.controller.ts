import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Query,
  Param,
} from '@nestjs/common';
import { BlogService } from '../service/blog.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { BlogEntry, searchQuery } from '../models/blog-entry.interface';
import { Observable } from 'rxjs';

@Controller('posts')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() blogEntry: BlogEntry, @Request() req): Observable<BlogEntry> {
    const user = req.user;
    return this.blogService.create(user, blogEntry);
  }

  @Get()
  async findAll(@Query() query: searchQuery) {
    return await this.blogService.findAll(query);
  }

  /*@Get()
  async findBlogEntries(@Query('userId') userId: number, @Query() query: searchQuery) {
    if (userId == null) {
      return await this.blogService.findAll(query);
    } else {
      return this.blogService.findByUser(userId);
    }
  }*/

  @Get(':id')
  findOne(@Param('id') id: number): Observable<BlogEntry> {
    return this.blogService.findOne(id);
  }
}
