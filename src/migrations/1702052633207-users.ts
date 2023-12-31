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
                        generationStrategy: "increment"
                    },
                    {
                        name: "name",
                        type: "varchar",
                        length: "50"
                    },
                    {
                        name: "lastName",
                        type: "varchar",
                        length: "50"
                    },
                    {
                        name: "phone",
                        type: "varchar",
                        length: "13"
                    },
                    {
                        name: "email",
                        type: "varchar",
                        length: "100",
                        isUnique: true
                    },
                    {
                        name: "password",
                        type: "varchar",
                        length: "255"
                    },
                    {
                        name: "documentId",
                        type: "varchar",
                        length: "20",
                        isUnique: true
                    },
                    {
                        name: "street",
                        type: "varchar",
                        length: "100"
                    },
                    {
                        name: "door",
                        type: "varchar",
                        length: "5"
                    },
                    {
                        name: "zipCode",
                        type: "varchar",
                        length: "50"
                    },
                    {
                        name: "town",
                        type: "varchar",
                        length: "30"
                    },
                    {
                        name: "country",
                        type: "varchar",
                        length: "30"
                    },
                    {
                        name: "is_active",
                        type: "boolean",
                        default: true
                    },
                    {
                        name: "role",
                        type: "varchar",
                        length: "45",
                        default: "user"
                    },
                    {
                        name: "specialty",
                        type: "varchar",
                        length: "20",
                        default: "null"
                    },
                    {
                        name: "picture",
                        type: "varchar",
                        length: "255",
                        default: "https://static.vecteezy.com/system/resources/previews/005/337/799/non_2x/icon-image-not-found-free-vector.jpg"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP"
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
