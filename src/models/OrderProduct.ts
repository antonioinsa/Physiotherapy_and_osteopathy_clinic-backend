import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./Order";
import { Product } from "./Product";



@Entity("orderproduct")
export class OrderProduct extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    order_id!: number

    @Column()
    product_id!: number

    @Column()
    quantity!: string

    @Column({ type: "decimal", precision: 4, scale: 2 })
    price!: number

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at!: Date

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updated_at!: Date


    @ManyToOne(() => Order, (order) =>
        order.orders)
    @JoinColumn({ name: "order_id" })
    orderOrderProduct!: Order;

    @ManyToOne(() => Product, (product) =>
        product.products)
    @JoinColumn({ name: "product_id" })
    productOrderProduct!: Product;
}