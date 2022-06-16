import React, { forwardRef, LegacyRef, useRef } from "react";

import { Handle } from "../handle";
import { Remove } from "../remove";

import "./column.scss";

export interface Props {
  children: React.ReactNode;
  columns?: number;
  label?: string;
  style?: React.CSSProperties;
  horizontal?: boolean;
  hover?: boolean;
  handleProps?: React.HTMLAttributes<any>;
  scrollable?: boolean;
  shadow?: boolean;
  placeholder?: boolean;
  unstyled?: boolean;
  onClick?(): void;
  onRemove?(): void;
}

export const Column = forwardRef<HTMLDivElement, Props>(
  (
    {
      children,
      columns = 1,
      handleProps,
      horizontal,
      hover,
      onClick,
      onRemove,
      label,
      placeholder,
      style,
      scrollable,
      shadow,
      unstyled,
      ...props
    }: Props,
    ref
  ) => {
    const Component = onClick ? "button" : "div";
    const refTest = useRef<HTMLDivElement>(null);

    return (
      <Component
        {...props}
        ref={ref as LegacyRef<HTMLButtonElement> & LegacyRef<HTMLDivElement>}
        style={
          {
            ...style,
            "--columns": columns,
          } as React.CSSProperties
        }
        className={`column${unstyled ? " unstyled" : ""}${
          horizontal ? " horizontal" : ""
        }${hover ? " hover" : ""}
        ${placeholder ? " placeholder" : ""}${scrollable ? " scrollable" : ""}${
          shadow ? " shadow" : ""
        }`}
        onClick={onClick}
        tabIndex={onClick ? 0 : undefined}
      >
        {label ? (
          <div className="header">
            {label}
            <div className="actions">
              {onRemove ? <Remove onClick={onRemove} /> : undefined}
              <Handle {...handleProps} />
            </div>
          </div>
        ) : null}
        {placeholder ? children : <ul>{children}</ul>}
      </Component>
    );
  }
);
