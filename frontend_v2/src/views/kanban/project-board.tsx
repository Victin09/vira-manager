import React from "react";
import type { CancelDrop, UniqueIdentifier } from "@dnd-kit/core";
import { rectSortingStrategy } from "@dnd-kit/sortable";

import { Board, TRASH_ID } from "../../components/kanban/board";
import { Outlet } from "react-router-dom";

export default {
  title: "Presets/Sortable/Multiple Containers",
};

export const BasicSetup = () => (
  <div className="container-fluid d-flex flex-column h-100 w-100">
    <Board />
    <Outlet />
  </div>
);

export const DragHandle = () => <Board handle />;

export const ManyItems = () => (
  <main tabIndex={-1}>
    <Board
      containerStyle={{
        maxHeight: "80vh",
      }}
      itemCount={15}
      scrollable
    />
    <Outlet />
  </main>
);

export const Vertical = () => <Board itemCount={5} vertical />;

export const TrashableItems = ({ confirmDrop }: { confirmDrop: boolean }) => {
  const [activeId, setActiveId] = React.useState<UniqueIdentifier | null>(null);
  const resolveRef = React.useRef<(value: boolean) => void>();

  const cancelDrop: CancelDrop = async ({ active, over }) => {
    if (over?.id !== TRASH_ID) {
      return true;
    }

    setActiveId(active.id);

    const confirmed = await new Promise<boolean>((resolve) => {
      resolveRef.current = resolve;
    });

    setActiveId(null);

    return confirmed === false;
  };

  return (
    <>
      <Board cancelDrop={confirmDrop ? cancelDrop : undefined} trashable />
      {/* {activeId && (
        <ConfirmModal
          onConfirm={() => resolveRef.current?.(true)}
          onDeny={() => resolveRef.current?.(false)}
        >
          Are you sure you want to delete "{activeId}"?
        </ConfirmModal>
      )} */}
    </>
  );
};

TrashableItems.argTypes = {
  confirmDrop: {
    name: "Request user confirmation before deletion",
    defaultValue: false,
    control: { type: "boolean" },
  },
};

export const Grid = () => (
  <Board
    columns={2}
    strategy={rectSortingStrategy}
    wrapperStyle={() => ({
      width: 150,
      height: 150,
    })}
  />
);

export const VerticalGrid = () => (
  <Board
    columns={2}
    itemCount={5}
    strategy={rectSortingStrategy}
    wrapperStyle={() => ({
      width: 150,
      height: 150,
    })}
    vertical
  />
);
