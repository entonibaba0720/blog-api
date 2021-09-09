import { Injectable } from '@nestjs/common';
import { BlogEntry, searchQuery } from '../models/blog-entry.interface';
import { from, map, Observable } from 'rxjs';
import { User } from '../../user/models/user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogEntryEntity } from '../models/blog-entry.entity';
import { Repository } from 'typeorm';

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

  async findAll(query: searchQuery) {
    const findOptions: any = { where: {}, order: { created: 'DESC' } };
    if (query.title) {
      findOptions.title = query.title;
    }
    if (query.tags) {
      findOptions.tags = query.tags;
    }
    if (query.body) {
      findOptions.body = query.body;
    }
    return await this.blogRepository.find(findOptions);
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
