import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderProduct } from "./OrderProduct";


@Entity("products")
export class Product extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    article!: string

    @Column()
    description!: string

    @Column({ type: "decimal", precision: 5, scale: 2 })
    price!: number

    @Column()
    stock!: string

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at!: Date

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updated_at!: Date


    @OneToMany(() => OrderProduct, (product) =>
        product.productOrderProduct)
        products!: OrderProduct[]
}