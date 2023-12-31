import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AppointmentExercise } from "./AppointmentExercise";
import { Appointment } from "./Appointment";

enum exercisesClass {
    flexibility = "flexibility",
    tendonitis = "tendonitis",
    neuropahty = "neuropahty",
    cervical = "cervical",
    hyperkyphosis = "hyperkyphosis",
}

@Entity("exercises")
export class Exercise extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    activity!: string

    @Column({ type: "enum", enum: exercisesClass })
    type!: string

    @Column()
    description!: string

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at!: Date

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updated_at!: Date


    
    @OneToMany(() => AppointmentExercise, (appointmentExercise) =>
    appointmentExercise.exerciseAppointmentExercise)
    exercises!: AppointmentExercise[]

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
}
