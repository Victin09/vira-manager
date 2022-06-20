import { createContext, useContext, useState } from "react";
import { CardType, ProjectType } from "../types/kanban";

export interface KanbanContextProps {
  projects: ProjectType[];
  setProjects: (projects: ProjectType[]) => void;
  selectedProject: ProjectType | null;
  setSelectedProject: (project: ProjectType) => void;
  selectedCard: CardType | null;
  setSelectedCard: (card: CardType) => void;
}

const defaultState: KanbanContextProps = {
  projects: [],
  setProjects: () => [],
  selectedProject: null,
  setSelectedProject: () => null,
  selectedCard: null,
  setSelectedCard: () => null,
};

const KanbanContext = createContext<KanbanContextProps>(defaultState);

export const KanbanProvider = ({ children }: any) => {
  const [projectsState, setProjectsState] = useState<ProjectType[]>([]);
  const [selectedProjectState, setSelectedProjectState] =
    useState<ProjectType | null>(null);
  const [selectedCardState, setSelectedCardState] = useState<CardType | null>(
    null
  );

  const setProjects = (projects: ProjectType[]) => {
    setProjectsState(projects);
  };

  const setSelectedProject = (project: ProjectType) => {
    setSelectedProjectState(project);
  };

  const setSelectedCard = (card: CardType) => {
    setSelectedCardState(card);
  };

  return (
    <KanbanContext.Provider
      value={{
        projects: projectsState,
        setProjects,
        selectedProject: selectedProjectState,
        setSelectedProject,
        selectedCard: selectedCardState,
        setSelectedCard,
      }}
    >
      {children}
    </KanbanContext.Provider>
  );
};

export const useKanban = () => {
  return useContext(KanbanContext);
};
