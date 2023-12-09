import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Orderproduct1702052840296 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "orderproducts",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "order_id",
                        type: "int",
                    },
                    {
                        name: "product_id",
                        type: "int",
                    },
                    {
                        name: "quantity",
                        type: "int",
                    },
                    {
                        name: "price",
                        type: "decimal",
                        precision: 4,
                        scale: 2,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                        onUpdate: "CURRENT_TIMESTAMP",
                    },
                ],
                foreignKeys: [
                    {
                        columnNames: ["order_id"],
                        referencedTableName: "orders",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE",
                    },
                    {
                        columnNames: ["product_id"],
                        referencedTableName: "products",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE",
                    },
                ],
            }),
            true
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("orderproducts")
    }

}
