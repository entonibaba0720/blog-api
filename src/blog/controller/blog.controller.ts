import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Query,
  Param,
  Req,
} from '@nestjs/common';
import { BlogService } from '../service/blog.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { BlogEntry } from '../models/blog-entry.interface';
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
  findAll(
    @Query('title') title: string,
    @Query('tags') tags: any,
    @Query('body') body: string,
  ) {
    const metadata = { title, tags, body };
    if (metadata) {
      const listResult = this.blogService.findAll(metadata);
      return listResult;
    } else {
      return this.blogService.findAll();
    }
  }

  @Get()
  findBlogEntries(@Query('userId') userId: number): Observable<BlogEntry[]> {
    return this.blogService.findByUser(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Observable<BlogEntry> {
    return this.blogService.findOne(id);
  }
}
