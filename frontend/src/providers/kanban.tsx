import { createContext, useContext, useState } from "react";

export interface KanbanContextProps {
  projects: any[];
  setProjects: (projects: any) => void;
  displayCreateProjectModal: boolean;
  setDisplayCreateProjectModal: (displayCreateProjectModal: boolean) => void;
  displayProjectModal: boolean;
  setDisplayProjectModal: (displayProjectModal: boolean) => void;
  displayCardModal: boolean;
  setDisplayCardModal: (displayCardModal: boolean) => void;
  selectedCard: any;
  setSelectedCard: (card: any) => void;
}

const defaultState: KanbanContextProps = {
  projects: [],
  setProjects: () => [],
  displayCreateProjectModal: false,
  setDisplayCreateProjectModal: () => false,
  displayProjectModal: false,
  setDisplayProjectModal: () => false,
  displayCardModal: false,
  setDisplayCardModal: () => false,
  selectedCard: null,
  setSelectedCard: () => null,
};

const KanbanContext = createContext<KanbanContextProps>(defaultState);

export const KanbanProvider = ({ children }: any) => {
  const [projects, setProjects] = useState<any[]>([]);
  const [displayCreateProjectModal, setDisplayCreateProjectModal] =
    useState<boolean>(false);
  const [displayProjectModal, setDisplayProjectModal] =
    useState<boolean>(false);
  const [displayCardModal, setDisplayCardModal] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<any>(null);

  return (
    <KanbanContext.Provider
      value={{
        projects,
        setProjects,
        displayCreateProjectModal,
        setDisplayCreateProjectModal,
        displayProjectModal,
        setDisplayProjectModal,
        displayCardModal,
        setDisplayCardModal,
        selectedCard,
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
