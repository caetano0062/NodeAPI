"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const typeorm_1 = require("typeorm");
const ProductSituations_1 = require("./ProductSituations");
const ProductCategories_1 = require("./ProductCategories");
let Product = class Product {
};
exports.Product = Product;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ProductSituations_1.ProductSituation, (productSituation) => productSituation.products),
    (0, typeorm_1.JoinColumn)({ name: "productSituationId" }),
    __metadata("design:type", ProductSituations_1.ProductSituation)
], Product.prototype, "productSituation", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ProductCategories_1.ProductCategory, (productCategory) => productCategory.products),
    (0, typeorm_1.JoinColumn)({ name: "productCategoryId" }),
    __metadata("design:type", typeof (_a = typeof ProductCategories_1.ProductCategory !== "undefined" && ProductCategories_1.ProductCategory) === "function" ? _a : Object)
], Product.prototype, "productCategory", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Product.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Product.prototype, "updatedAt", void 0);
exports.Product = Product = __decorate([
    (0, typeorm_1.Entity)("products")
], Product);
