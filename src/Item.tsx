import React, { useEffect } from "react";
import classNames from "classnames";
import { DraggableSyntheticListeners } from "@dnd-kit/core";
import { Transform } from "@dnd-kit/utilities";

import { Handle } from "./Handle";

import styles from "./Item.module.scss";

export interface Props {
  className?: string;
  dragOverlay?: boolean;
  color?: string;
  disabled?: boolean;
  dragging?: boolean;
  handle?: boolean;
  height?: number;
  index?: number;
  fadeIn?: boolean;
  transform?: Transform | null;
  listeners?: DraggableSyntheticListeners;
  sorting?: boolean;
  style?: React.CSSProperties;
  transition?: string;
  wrapperStyle?: React.CSSProperties;
  value: React.ReactNode;
  renderItem?(args: {
    dragOverlay: boolean;
    dragging: boolean;
    sorting: boolean;
    index: number | undefined;
    fadeIn: boolean;
    listeners: DraggableSyntheticListeners;
    ref: React.Ref<HTMLElement>;
    style: React.CSSProperties | undefined;
    transform: Props["transform"];
    transition: Props["transition"];
    value: Props["value"];
  }): React.ReactElement;
  isSelected?: boolean;
}

export const Item = React.memo(
  React.forwardRef<HTMLLIElement, Props>(
    (
      {
        className,
        color,
        dragOverlay,
        dragging,
        disabled,
        fadeIn,
        handle,
        height,
        index,
        listeners,
        renderItem,
        sorting,
        style,
        transition,
        transform,
        value,
        wrapperStyle,
        isSelected,
        ...props
      },
      ref
    ) => {
      useEffect(() => {
        if (!dragOverlay) {
          return;
        }

        document.body.style.cursor = "grabbing";

        return () => {
          document.body.style.cursor = "";
        };
      }, [dragOverlay]);

      console.log("handle", handle);

      return renderItem ? (
        renderItem({
          dragOverlay: Boolean(dragOverlay),
          dragging: Boolean(dragging),
          sorting: Boolean(sorting),
          index,
          fadeIn: Boolean(fadeIn),
          listeners,
          ref,
          style,
          transform,
          transition,
          value
        })
      ) : (
        <li
          className={classNames(
            className,
            styles.Wrapper,
            fadeIn && styles.fadeIn,
            sorting && styles.sorting,
            dragOverlay && styles.dragOverlay
          )}
          style={
            {
              ...wrapperStyle,
              transition,
              "--translate-x": transform
                ? `${Math.round(transform.x)}px`
                : undefined,
              "--translate-y": transform
                ? `${Math.round(transform.y)}px`
                : undefined,
              "--scale-x": transform?.scaleX
                ? `${transform.scaleX}`
                : undefined,
              "--scale-y": transform?.scaleY
                ? `${transform.scaleY}`
                : undefined,
              "--index": index,
              "--color": color
            } as React.CSSProperties
          }
          ref={ref}
        >
          <div
            className={classNames(
              styles.Item,
              dragging && styles.dragging,
              handle && styles.withHandle,
              dragOverlay && styles.dragOverlay,
              disabled && styles.disabled,
              color && styles.color
            )}
            tabIndex={!handle ? 0 : undefined}
            style={style}
            data-cypress="draggable-item"
            {...(!handle ? listeners : undefined)}
            {...props}
            onClick={() => {}}
          >
            {value}
            {handle ? <Handle {...listeners} /> : null}

            <input
              type="checkbox"
              id="vehicle1"
              name="vehicle1"
              checked={isSelected}
              onChange={(event) => {
                event.stopPropagation();
                listeners?.onClick({ isCtrlSelected: true });
              }}
            />
          </div>
        </li>
      );
    }
  )
);
