import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 36,
  })
  id_competition: string;

  @Column({
    length: 15,
  })
  course_type: string;

  @Column({
    length: 30,
  })
  name: string;

  @Column({
    type: 'float',
    precision: 5,
    scale: 2,
  })
  sct: number|null;

  @Column({
    type: 'float',
    precision: 5,
    scale: 2,
  })
  mct: number|null;

  @Column({
    type: 'int',
    precision: 3,
  })
  course_length: number|null;

  @Column({
    type: 'float',
    precision: 4,
    scale: 2,
  })
  as: number|null;
}
