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
const typeorm_1 = require("typeorm");
const produto_entity_1 = require("../produto/produto.entity");
const class_validator_1 = require("class-validator");
const common_1 = require("@nestjs/common");
const is_email_unique_1 = require("./validators/is-email-unique");
const bcrypt = require("bcrypt");
const is_whatsapp_unique_1 = require("./validators/is-whatsapp-unique");
let User = class User {
    hashPassword() {
        return __awaiter(this, void 0, void 0, function* () {
            this.password = yield bcrypt.hash(this.password, 10);
        });
    }
    comparePassword(attempt) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt.compare(attempt, this.password);
        });
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], User.prototype, "nomeCompleto", void 0);
__decorate([
    is_whatsapp_unique_1.IsWhatsappAlreadyExist({ message: 'WhatsApp já cadastrado!' }),
    typeorm_1.Column({ nullable: true, unique: true }),
    __metadata("design:type", String)
], User.prototype, "whatsapp", void 0);
__decorate([
    class_validator_1.IsEmail(),
    is_email_unique_1.IsEmailAlreadyExist({ message: 'Email já cadastrado!' }),
    typeorm_1.Column({ nullable: false, unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Boolean)
], User.prototype, "termos", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ nullable: false }),
    __metadata("design:type", Date)
], User.prototype, "cadastradoEm", void 0);
__decorate([
    typeorm_1.ManyToOne(type => produto_entity_1.Produto, (produto) => produto.id, { eager: true }),
    __metadata("design:type", produto_entity_1.Produto)
], User.prototype, "produtos", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], User.prototype, "hashPassword", null);
User = __decorate([
    common_1.UseInterceptors(common_1.ClassSerializerInterceptor),
    typeorm_1.Entity({
        name: 'usuarios',
    })
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map