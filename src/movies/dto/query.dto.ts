import { ApiModelProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryDto {
  @ApiModelProperty({ type: Number, default: '1' })
  @Type(t => Number)
  @IsInt()
  page: number = 1;
}
