import { FC, ReactNode } from "react";
import styles from "./EditHeader.module.css";

interface EditHeaderProps {
  title: string;
  children: ReactNode;
}

const EditHeader: FC<EditHeaderProps> = ({ title, children }) => {
  return (
    <div className={styles.header}>
      <p>{title}</p>
      <div className={styles.controls}>{children}</div>
    </div>
  );
};

export default EditHeader;
