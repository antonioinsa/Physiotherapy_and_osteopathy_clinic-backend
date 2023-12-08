import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

enum process {
    pending = "Pending",
    accepted = "Accepted",
    completed = "Completed"
}

@Entity("orders")
export class Order extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    user_id!: number

    @Column({ type: "enum", enum: process })
    status!: process

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at!: Date

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updated_at!: Date


    @ManyToOne(() => User, (user) => user.userOrder)
    @JoinColumn({ name: "user_id" })
    userOrders!: User;

    @OneToMany(() => OrderProduct, (order) =>
        order.orderOrderProduct)
    orders!: OrderProduct[]
}

