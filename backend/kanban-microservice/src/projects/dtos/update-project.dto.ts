import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from '@vira/projects/dtos/create-project.dto';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  id: string;
}
