import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { getRepository } from 'typeorm';
import { User } from '../user.entity';

export function IsWhatsappAlreadyExist(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'isWhatsappAlreadyExist',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(whatsapp: any, args: ValidationArguments) {
          return getRepository(User)
            .findOne({ whatsapp })
            .then(user => {
              if (user) return false;
              return true;
            });
        },
      },
    });
  };
}
