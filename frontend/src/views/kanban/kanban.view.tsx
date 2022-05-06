import React from "react";
import { useFetch } from "@vira/common/hooks/use-fetch.hook";
import { Kanban } from "@vira/models/kanban/kanban.model";

const Kanban = (): JSX.Element => {
  const { fetchData, data, error } = useFetch<Kanban>();

  return <div>Kanban</div>;
};

export default Kanban;
