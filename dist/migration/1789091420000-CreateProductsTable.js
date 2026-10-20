"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductsTable1789091420000 = void 0;
const typeorm_1 = require("typeorm");
class CreateProductsTable1789091420000 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
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
                        type: "varchar"
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
            yield queryRunner.createForeignKey("products", new typeorm_1.TableForeignKey({
                columnNames: ["productSituationId"],
                referencedColumnNames: ["id"],
                referencedTableName: "product_situations",
                onDelete: "CASCADE"
            }));
            yield queryRunner.createForeignKey("products", new typeorm_1.TableForeignKey({
                columnNames: ["productCategoryId"],
                referencedColumnNames: ["id"],
                referencedTableName: "product_categories",
                onDelete: "CASCADE"
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable("products");
            const situationForeignKey = table === null || table === void 0 ? void 0 : table.foreignKeys.find(fk => fk.columnNames.includes("productSituationId"));
            if (situationForeignKey) {
                yield queryRunner.dropForeignKey("products", situationForeignKey);
            }
            const categoryForeignKey = table === null || table === void 0 ? void 0 : table.foreignKeys.find(fk => fk.columnNames.includes("productCategoryId"));
            if (categoryForeignKey) {
                yield queryRunner.dropForeignKey("products", categoryForeignKey);
            }
            yield queryRunner.dropTable("products");
        });
    }
}
exports.CreateProductsTable1789091420000 = CreateProductsTable1789091420000;
