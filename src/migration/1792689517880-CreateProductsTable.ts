import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateProductsTable1792689517880 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "products",
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
                },
                {
                    name: "productSituationId",
                    type: "int"
                },
                {
                    name: "productCategoryId",
                    type: "int"
                },
                {
                    name: "createdAt",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP"
                },
                {
                    name: "updatedAt",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                    onUpdate: "CURRENT_TIMESTAMP"
                }
            ]
        }));
        await queryRunner.createForeignKey(
            "products", 
            new TableForeignKey({
                columnNames: ["productSituationId"],
                referencedColumnNames: ["id"],
                referencedTableName: "product_situations",
                onDelete: "CASCADE",
            })
        );
        await queryRunner.createForeignKey(
            "products", 
            new TableForeignKey({
                columnNames: ["productCategoryId"],
                referencedColumnNames: ["id"],
                referencedTableName: "product_categories",
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("products");
        const productSituationForeignKey = table?.foreignKeys.find((fk) => fk.columnNames.includes("productSituationId"));
        if (productSituationForeignKey) {
            await queryRunner.dropForeignKey("products", productSituationForeignKey);
        }
        const productCategoryForeignKey = table?.foreignKeys.find((fk) => fk.columnNames.includes("productCategoryId"));
        if (productCategoryForeignKey) {
            await queryRunner.dropForeignKey("products", productCategoryForeignKey);
        }
        await queryRunner.dropTable("products");
    }

}
