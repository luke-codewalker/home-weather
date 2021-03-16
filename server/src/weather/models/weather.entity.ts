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

    @Column('varchar', {
        nullable: true
    })
    name?: string;

    @Column('numeric', {
        nullable: true
    })
    voltage?: number;

    @CreateDateColumn()
    createdAt: Date;
}