import { Drawer } from "vaul";
import { FC, ReactNode } from "react";
import styles from "./DrawerModal.module.css";

interface DrawerModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
}

const DrawerModal: FC<DrawerModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  return (
    <Drawer.Root open={isOpen} onClose={onClose}>
      <Drawer.Portal>
        <Drawer.Overlay className={styles.overlay} onClick={onClose} />
        {isOpen && (
          <Drawer.Close className={styles.close_button}>
            <img src="/close.svg" width={24} height={24} alt="" />
          </Drawer.Close>
        )}
        <Drawer.Content
          className={styles.content}
          aria-describedby=""
          onClick={onClose}
        >
          <Drawer.Title className={styles.title}>{title}</Drawer.Title>
          {isOpen && <div className={styles.swipe_line} />}
          <div
            className={styles.container}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default DrawerModal;
