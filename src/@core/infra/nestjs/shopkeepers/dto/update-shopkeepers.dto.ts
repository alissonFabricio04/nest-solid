import { PartialType } from '@nestjs/mapped-types';
import { CreateShopkeepersDto } from './create-shopkeepers.dto';

export class UpdateShopkeepersDto extends PartialType(CreateShopkeepersDto) {}
