import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Appointment } from "./Appointment"

@Entity("users")
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column()
  lastName!: string
  
  @Column()
  phone!: string

  @Column()
  email!: string

  @Column()
  password!: string

  @Column()
  documentId!: string

  @Column()
  creditCard!: string

  @Column()
  street!: string
  
  @Column()
  door!: string

  @Column()
  zipCode!: string

  @Column()
  town!: string

  @Column()
  country!: string

  @Column()
  is_active!: boolean

  @Column()
  role!: string

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updated_at!: Date

  @OneToMany(() => Appointment, (appointment) => appointment.userAppointment)
  userAppointments!: Appointment[]

}