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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
const bcrypt = require("bcrypt");
const token_service_1 = require("../token.service");
let UserService = class UserService {
    constructor(userRepository, tokenService) {
        this.userRepository = userRepository;
        this.tokenService = tokenService;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.find();
        });
    }
    findByEmail(userEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.findOne({ email: userEmail });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.findOneOrFail(id);
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdUser = yield this.userRepository.save(user);
            createdUser.token = this.tokenService.generate({ email: user.email });
            return createdUser;
        });
    }
    update(id, newValue) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOneOrFail(id);
            if (!user.id) {
                console.error("user doesn't exist");
            }
            if (newValue.password) {
                newValue.password = yield bcrypt.hash(newValue.password, 10);
            }
            yield this.userRepository.update(id, newValue);
            return yield this.userRepository.findOne(id);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.delete(id);
        });
    }
    login(userLoginInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({ email: userLoginInfo.email });
            if (!user)
                throw new common_1.HttpException('Email não encontrado', common_1.HttpStatus.BAD_REQUEST);
            return bcrypt
                .compare(userLoginInfo.password, user.password)
                .then(match => {
                if (!match)
                    throw new common_1.HttpException('Senha incorreta', common_1.HttpStatus.BAD_REQUEST);
                const token = this.tokenService.generate({ email: user.email });
                return {
                    nomeCompleto: user.nomeCompleto,
                    email: user.email,
                    produtos: user.produtos,
                    token
                };
            });
        });
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        token_service_1.TokenService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map