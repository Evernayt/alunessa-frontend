import React from "react";
import { ButtonHTMLAttributes, FC } from "react";
import styles from "./IconButton.module.css";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
  variant?: "default" | "ghost";
  className?: string;
}

const IconButton: FC<IconButtonProps> = ({
  icon,
  variant = "default",
  className,
  ...props
}) => {
  return (
    <button
      className={[styles.base, styles[variant], className].join(" ")}
      {...props}
    >
      <img src={icon} width={24} height={24} alt="" />
    </button>
  );
};

export default IconButton;
