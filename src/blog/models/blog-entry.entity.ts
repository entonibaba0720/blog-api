import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../user/models/user.entity';

@Entity('blog_entry')
export class BlogEntryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => UserEntity, (user) => user.blogEntries)
  author: UserEntity;

  @Column({
    type: 'timestamp',
    default: 'CURRENT_TIMESTAMP',
  })
  created: Date;

  @Column()
  title: string;

  @Column()
  tags: string;

  @Column({ default: '' })
  body: string;
}
