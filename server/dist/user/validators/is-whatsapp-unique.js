"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../user.entity");
function IsWhatsappAlreadyExist(validationOptions) {
    return function (object, propertyName) {
        class_validator_1.registerDecorator({
            name: 'isWhatsappAlreadyExist',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(whatsapp, args) {
                    return typeorm_1.getRepository(user_entity_1.User)
                        .findOne({ whatsapp })
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
exports.IsWhatsappAlreadyExist = IsWhatsappAlreadyExist;
//# sourceMappingURL=is-whatsapp-unique.js.map