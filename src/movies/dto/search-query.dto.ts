import { ApiModelProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Length, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class SearchQueryDto {
  @ApiModelProperty({ type: Number, default: '1' })
  @Type(t => Number)
  @IsInt()
  page: number = 1;

  @ApiModelProperty({ required: true })
  @IsString()
  @Length(1)
  query: string;
}
