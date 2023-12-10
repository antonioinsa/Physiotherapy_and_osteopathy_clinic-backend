import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Exercises1702052685809 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "exercises",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "activity",
                        type: "varchar",
                        length: "255"
                    },
                    {
                        name: "type",
                        type: "enum",
                        enum: [
                            "Flexibility",
                            "Tendonitis",
                            "Neuropahty",
                            "Cervical",
                            "Hyperkyphosis"
                        ],
                    },
                    {
                        name: "description",
                        type: "varchar",
                        length: "255"
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
            }),
            true
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("exercises")
    }

}
