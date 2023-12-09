import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AppointmentExercise } from "./AppointmentExercise";
import { Appointment } from "./Appointment";

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


    @ManyToMany(() => Appointment)
    @JoinTable({
        name: "appointmentexercise",
        joinColumn: {
            name: "exercise_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "appointment_id",
            referencedColumnName: "id"
        }
    }) exerciseAppointment!: Appointment[]

    @OneToMany(() => AppointmentExercise, (exercise) =>
        exercise.appointmentAppointmentExercise)
    exercises!: AppointmentExercise[]
}
