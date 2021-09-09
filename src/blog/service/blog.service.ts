import { Injectable, Logger } from '@nestjs/common';
import { BlogEntry } from '../models/blog-entry.interface';
import { from, map, Observable, pipe } from 'rxjs';
import { User } from '../../user/models/user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogEntryEntity } from '../models/blog-entry.entity';
import { createQueryBuilder, getRepository, Repository } from 'typeorm';
import { RequestQueryBuilder } from '@nestjsx/crud-request';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogEntryEntity)
    private readonly blogRepository: Repository<BlogEntryEntity>,
  ) {}

  create(user: User, blogEntry: BlogEntry): Observable<BlogEntry> {
    blogEntry.author = user;
    return from(this.blogRepository.save(blogEntry));
  }

  async findAll(args?: any) {
    const { searchQuery } = args;
    const BlogRepository = getRepository(BlogEntryEntity);

    return await BlogRepository.createQueryBuilder()
      .select()
      .where('title LIKE :searchQuery', { searchQuery: `%${searchQuery}%` })
      .orWhere('tags LIKE :searchQuery', {
        searchQuery: `%${searchQuery}%`,
      })
      .orWhere('body LIKE :searchQuery', {
        searchQuery: `%${searchQuery}%`,
      })
      .getMany()
      .then(() => {
        return this.blogRepository.find({
          order: {
            created: 'DESC',
          },
        });
      });
  }

  findByUser(userId: number): Observable<BlogEntry[]> {
    return from(
      this.blogRepository.find({
        where: { author: userId },
        relations: ['author'],
      }),
    ).pipe(map((blogEntries: BlogEntry[]) => blogEntries));
  }

  findOne(id: number): Observable<BlogEntry> {
    return from(this.blogRepository.findOne(id, { relations: ['author'] }));
  }
}
