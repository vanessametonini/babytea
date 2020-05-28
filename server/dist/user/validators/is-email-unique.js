"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../user.entity");
function IsEmailAlreadyExist(validationOptions) {
    return function (object, propertyName) {
        class_validator_1.registerDecorator({
            name: 'isEmailAlreadyExist',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(email, args) {
                    return typeorm_1.getRepository(user_entity_1.User)
                        .findOne({ email })
                        .then(user => {
                        if (user)
                            return false;
                        return true;
                    });
                },
            },
        });
    };
}
exports.IsEmailAlreadyExist = IsEmailAlreadyExist;
//# sourceMappingURL=is-email-unique.js.map