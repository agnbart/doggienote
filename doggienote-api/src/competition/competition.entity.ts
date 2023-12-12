import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Competition {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        length: 70,
    })
    name: string

    @Column({
        length: 50
    })
    place: string;

    @Column({
        length: 40,
    })
    country_competition: string;

    @Column({
        type: 'date'
    })
    date_from: Date|null;

    @Column({
        type: 'date'
    })
    date_to: Date|null;

    @Column({
        length: 60,
        default: null,
        nullable: true,
    })
    judge: string|null

    @Column({
        length: 40,
    })
    country_judge: string|null;
}