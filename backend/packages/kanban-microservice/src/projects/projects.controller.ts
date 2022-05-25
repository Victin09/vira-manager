import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProjectsService } from '@vira/projects/projects.service';
import { CreateProjectDto } from '@vira/projects/dtos/create-project.dto';
import { UpdateProjectDto } from '@vira/projects/dtos/update-project.dto';
import { FindProjectDto } from '@vira/projects/dtos/find-project.dto';
import { RemoveProjectDto } from '@vira/projects/dtos/remove-project.dto';

@Controller()
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @MessagePattern('createProject')
  create(@Payload() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @MessagePattern('findAllProjects')
  findAll(@Payload() userId: string) {
    return this.projectsService.findAllByUserId(userId);
  }

  @MessagePattern('findProjectById')
  findOne(@Payload() findProjectDto: FindProjectDto) {
    return this.projectsService.findById(findProjectDto);
  }

  @MessagePattern('updateProject')
  update(@Payload() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(updateProjectDto);
  }

  @MessagePattern('removeProject')
  remove(@Payload() removeProjectDto: RemoveProjectDto) {
    return this.projectsService.remove(removeProjectDto);
  }
}
