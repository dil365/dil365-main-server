import { IsArray, IsIn, IsNotEmpty, IsNumber, IsObject, IsString, isString } from "class-validator"

export class CreateWordSettingsDto {
    @IsString()
    @IsNotEmpty()
    sl: string

    @IsString()
    @IsNotEmpty()
    @IsIn(['noun', 'verb', 'adjective', 'adverb', 'pronoun', 'preposition', 'conjunction', 'interjection'])
    syntactic: 'noun' | 'verb' | 'adjective' | 'adverb' | 'pronoun' | 'preposition' | 'conjunction' | 'interjection'
    
    @IsString()
    @IsNotEmpty()
    @IsIn(['A1', 'B1', 'C1', 'A2', 'B2', 'C2'])
    level: 'A1' | 'B1' | 'C1' | 'A2' | 'B2' | 'C2'

    @IsString()
    @IsNotEmpty()
    category?: string
    
    @IsString()
    @IsNotEmpty()
    example: string
        
    @IsString()
    @IsNotEmpty()
    word: string
    
    @IsString()
    @IsNotEmpty()
    definition: string
}

export class CreateWordDto {
    @IsArray()
    already_learned?: string[]

    @IsNumber()
    count: number

    @IsObject()
    settings: CreateWordSettingsDto
}