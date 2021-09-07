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
import { BlogEntry } from '../models/blog-entry.interface';
import { Observable } from 'rxjs';

@Controller('blogs')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() blogEntry: BlogEntry, @Request() req): Observable<BlogEntry> {
    const user = req.user;
    return this.blogService.create(user, blogEntry);
  }

  @Get()
  findBlogEntries(@Query('userId') userId: number): Observable<BlogEntry[]> {
    if (userId == null) {
      return this.blogService.findAll();
    } else {
      return this.blogService.findByUser(userId);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: number): Observable<BlogEntry> {
    return this.blogService.findOne(id);
  }
}
