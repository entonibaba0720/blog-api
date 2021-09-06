import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {BlogEntryEntity} from "./models/blog-entry.entity";
import {UserModule} from "../user/user.module";
import {AuthModule} from "../auth/auth.module";
import { BlogController } from './controller/blog.controller';
import { BlogService } from './service/blog.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([BlogEntryEntity]),
        AuthModule,
        UserModule
    ],
    controllers: [BlogController],
    providers: [BlogService]
})
export class BlogModule {

}
