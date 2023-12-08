import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Appointment } from "./Appointment";
import { Exercise } from "./Exercise";



@Entity("appointmentsexercises")
export class Appointmentexercise extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    appointment_id!: number

    @Column()
    exercise_id!: number

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at!: Date

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updated_at!: Date

    @ManyToOne(() => Appointment, (appointment) => 
    appointment.appointments)
    @JoinColumn({ name: "appointment_id" })
    appointmentAppointmentexercise!: Appointment;

    @ManyToOne(() => Exercise, (exercise) => 
    exercise.exercises)
    @JoinColumn({ name: "exercise_id" })
    exerciseAppointmentexercise!: Exercise;

    
}