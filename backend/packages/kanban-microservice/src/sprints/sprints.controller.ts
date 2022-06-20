import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SprintsService } from './sprints.service';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { UpdateSprintDto } from './dto/update-sprint.dto';

@Controller()
export class SprintsController {
  constructor(private readonly sprintsService: SprintsService) {}

  @MessagePattern('createSprint')
  create(@Payload() createSprintDto: CreateSprintDto) {
    return this.sprintsService.create(createSprintDto);
  }

  @MessagePattern('findAllSprints')
  findAll() {
    return this.sprintsService.findAll();
  }

  @MessagePattern('findOneSprint')
  findOne(@Payload() id: number) {
    return this.sprintsService.findOne(id);
  }

  @MessagePattern('findSprintByProjectId')
  findSprintByProjectId(@Payload() projectId: string) {
    return this.sprintsService.findSprintByProjectId(projectId);
  }

  @MessagePattern('updateSprint')
  update(@Payload() updateSprintDto: UpdateSprintDto) {
    return this.sprintsService.update(updateSprintDto.id, updateSprintDto);
  }

  @MessagePattern('removeSprint')
  remove(@Payload() id: number) {
    return this.sprintsService.remove(id);
  }
}
