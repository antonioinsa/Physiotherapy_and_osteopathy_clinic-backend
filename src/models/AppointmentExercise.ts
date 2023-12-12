import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Appointment } from "./Appointment";
import { Exercise } from "./Exercise";



@Entity("appointmentexercise")
export class AppointmentExercise extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    appointment_id!: number

    @Column()
    exercise_id!: number

    @Column()
    is_active!: boolean

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at!: Date

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updated_at!: Date


    @ManyToOne(() => Appointment, (appointment) =>
        appointment.appointments)
    @JoinColumn({ name: "appointment_id" })
    appointmentAppointmentExercise!: Appointment;

    @ManyToOne(() => Exercise, (exercise) =>
        exercise.exercises)
    @JoinColumn({ name: "exercise_id" })
    exerciseAppointmentExercise!: Exercise;
}
