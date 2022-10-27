import { PartialType } from '@nestjs/mapped-types';
import { CreateComunsDto } from './create-comuns.dto';

export class UpdateComunsDto extends PartialType(CreateComunsDto) {}
