import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DictActivity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 15,
  })
  activity: string;

  @Column({
    type: 'text',
    default: '',
  })
  description: string;

  @Column({
    default: false,
  })
  removable: boolean;
}
