import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Users1702052633207 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "name",
                        type: "varchar",
                        length: "50",
                    },
                    {
                        name: "lastName",
                        type: "varchar",
                        length: "50",
                    },
                    {
                        name: "phone",
                        type: "varchar",
                        length: "13",
                    },
                    {
                        name: "email",
                        type: "varchar",
                        length: "100",
                    },
                    {
                        name: "password",
                        type: "varchar",
                        length: "255",
                    },
                    {
                        name: "documentId",
                        type: "varchar",
                        length: "20",
                    },
                    {
                        name: "creditCard",
                        type: "varchar",
                        length: "20",
                    },
                    {
                        name: "street",
                        type: "varchar",
                        length: "100",
                    },
                    {
                        name: "door",
                        type: "varchar",
                        length: "5",
                    },
                    {
                        name: "zipCode",
                        type: "varchar",
                        length: "50",
                    },
                    {
                        name: "town",
                        type: "varchar",
                        length: "30",
                    },
                    {
                        name: "country",
                        type: "varchar",
                        length: "30",
                    },
                    {
                        name: "is_active",
                        type: "boolean",
                        default: true,
                    },
                    {
                        name: "role",
                        type: "varchar",
                        length: "45",
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
                    },
                ],
            }),
            true,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users")
    }

}
