import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Appointments1702052671982 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "appointments",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "date",
                        type: "date",
                        isNullable: false
                    },
                    {
                        name: "hour",
                        type: "enum",
                        enum: [
                            "09:00",
                            "10:15",
                            "11:30",
                            "12:45",
                            "14:00",
                            "16:00",
                            "17:15",
                            "18:30"
                        ],
                    },
                    {
                        name: "price",
                        type: "decimal",
                        precision: 4,
                        scale: 2,
                        default: 40
                    },
                    {
                        name: "service",
                        type: "enum",
                        enum: [
                            "Physiotherapy",
                            "Osteopathy"
                        ],
                    },
                    {
                        name: "user_id",
                        type: "int"
                    },
                    {
                        name: "is_active",
                        type: "boolean",
                        default: true
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                        onUpdate: "CURRENT_TIMESTAMP"
                    },
                ],
                foreignKeys: [
                    {
                        columnNames: ["user_id"],
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE"
                    },
                ]
            }),
            true
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("appointments")
    }

}
