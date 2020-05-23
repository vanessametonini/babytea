import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { getRepository } from 'typeorm';
import { User } from '../user.entity';

export function IsEmailAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isEmailAlreadyExist',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(email: any, args: ValidationArguments) {
          return getRepository(User)
            .findOne({ email })
            .then(user => {
              console.log(user);
              if (user) return false;
              return true;
            });
        },
      },
    });
  };
}
