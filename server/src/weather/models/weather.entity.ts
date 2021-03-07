import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

@Entity('weather')
export class WeatherEntity {
    @PrimaryGeneratedColumn('uuid') id: string

    @Column('numeric')
    temperature: number;

    @Column('numeric')
    humidity: number;

    @Column('numeric')
    pressure: number;

    @Column()
    name: string;

    @CreateDateColumn()
    createdAt: Date;
}