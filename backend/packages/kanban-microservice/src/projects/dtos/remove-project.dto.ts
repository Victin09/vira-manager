import { PartialType } from '@nestjs/mapped-types';
import { FindProjectDto } from './find-project.dto';

export class RemoveProjectDto extends PartialType(FindProjectDto) {}
