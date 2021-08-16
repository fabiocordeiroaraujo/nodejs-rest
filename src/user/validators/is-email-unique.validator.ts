import { Injectable } from "@nestjs/common";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UserService } from "../user.service";

@Injectable()
@ValidatorConstraint()
export class IsEmailUniqueConstraint implements ValidatorConstraintInterface {    

    constructor(private userService: UserService) {
        this.userService = userService;
    }

    async validate(email: string, validationArguments?: ValidationArguments): Promise<boolean> {
        // O operador !! -> Transforma em Boolean             
        return !!!this.userService.recuperarPorEmail(email);
    }
}

export function IsEmailUnique(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'IsEmailUnique',
            target: object.constructor,
            propertyName: propertyName,
            options:  validationOptions,            
            validator: IsEmailUniqueConstraint,
        });
    };
}