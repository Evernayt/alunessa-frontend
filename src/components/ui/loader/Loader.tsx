import { FC, ReactNode } from "react";
import styles from "./Loader.module.css";

const Loader = () => {
  return <span className={styles.loader}></span>;
};

interface LoaderWrapperProps {
  children: ReactNode;
  className?: string;
}

export const LoaderWrapper: FC<LoaderWrapperProps> = ({
  children,
  className,
}) => {
  return (
    <div className={[styles.wrapper, className].join(" ")}>{children}</div>
  );
};

export default Loader;
