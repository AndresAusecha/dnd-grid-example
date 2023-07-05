import React from "react";
import {
  closestCorners,
  CollisionDetection,
  rectIntersection
} from "@dnd-kit/core";
import { rectSortingStrategy } from "@dnd-kit/sortable";

import { Selectable, defaultContainerStyle, VOID_ID } from "./Selectable";

export default function App() {
  return (
    <Selectable
      columns={3}
      strategy={rectSortingStrategy}
      wrapperStyle={() => ({
        width: 150,
        height: 150
      })}
    />
  );
}
