import { PartialType } from '@nestjs/mapped-types';
import { CreateTokenSessionDto } from './create-token_session.dto';

export class UpdateTokenSessionDto extends PartialType(CreateTokenSessionDto) {}
