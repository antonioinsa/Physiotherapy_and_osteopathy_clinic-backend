import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User"
import { AppointmentExercise } from "./AppointmentExercise"
import { Exercise } from "./Exercise"

enum hours {
    H09_00 = "09:00",
    H10_15 = "10:15",
    H11_30 = "11:30",
    H12_45 = "12:45",
    H16_00 = "16:00",
    H17_15 = "17:15",
    H18_30 = "18:30"
}

enum services {
    physiotherapy = "physiotherapy",
    osteopathy = "osteopathy"
}

@Entity("appointments")
export class Appointment extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    date!: string

    @Column({ type: "enum", enum: hours })
    hour!: string

    @Column({ type: "decimal", precision: 4, scale: 2, default: 40 })
    price!: number

    @Column({ type: "enum", enum: services })
    service!: string

    @Column()
    user_id!: number

    @Column()
    worker!: number

    @Column()
    is_active!: boolean

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at!: Date

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updated_at!: Date


    @ManyToMany(() => Exercise)
    @JoinTable({
        name: "appointmentexercise",
        joinColumn: {
            name: "appointment_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "exercise_id",
            referencedColumnName: "id"
        }
    }) appointmentExercise!: Exercise[]

    @ManyToOne(() => User, (user) => user.userAppointments)
    @JoinColumn({ name: "user_id" })
    userAppointment!: User;

    @OneToMany(() => AppointmentExercise, (appointment) =>
        appointment.appointmentAppointmentExercise)
    appointments!: AppointmentExercise[]
}
