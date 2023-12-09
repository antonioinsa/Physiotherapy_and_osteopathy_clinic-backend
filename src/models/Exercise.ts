import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AppointmentExercise } from "./Appointmentexercise";

enum exercisesClass {
    flexibility = "Flexibility",
    tendonitis = "Tendonitis",
    neuropahty = "Neuropahty",
    cervical = "Cervical",
    hyperkyphosis = "Hyperkyphosis",
}

@Entity("exercises")
export class Exercise extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    activity!: string

    @Column({ type: "enum", enum: exercisesClass })
    type!: exercisesClass

    @Column()
    description!: string

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at!: Date

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updated_at!: Date


    @OneToMany(() => AppointmentExercise, (exercise) =>
        exercise.appointmentAppointmentExercise)
    exercises!: AppointmentExercise[]
}
