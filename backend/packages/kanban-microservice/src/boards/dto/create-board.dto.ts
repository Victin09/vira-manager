export class CreateBoardDto {
  projectId: string;
  fromSprint: boolean;
  sprintId?: string;
  archived?: boolean;
}
