import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto {

  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;

}
