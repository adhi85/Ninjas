import { IsEnum, MinLength, isEnum } from "class-validator";

export class CreateNinjaDto {

    @MinLength(3)
    name: string;
    
    @IsEnum(['stars', 'nunchuks'], {message: 'Use correct weapon'})
    weapon: 'stars' | 'nunchuks';
}
