import { useAppContext } from "@/store/Context";
import createFileURL from "@/helpers/createFileURL";
import DrawerModal from "@/components/ui/drawer-modal/DrawerModal";
import styles from "./DrawingModal.module.css";

const DrawingModal = () => {
  const {
    drawingModal: { isOpen, drawing },
    closeModal,
  } = useAppContext();

  const closeHandler = () => {
    closeModal("drawingModal");
  };

  return (
    <DrawerModal isOpen={isOpen} onClose={closeHandler}>
      <div className={styles.container}>
        <div className={styles.scroll}>
          <img
            className={styles.image}
            src={createFileURL("images", drawing?.originalImageName)}
            alt=""
          />
          <h3 className={styles.name}>{drawing?.name}</h3>
          {drawing?.description && (
            <p className={styles.description}>{drawing?.description}</p>
          )}
        </div>
        {drawing?.description && <div className={styles.shadow} />}
      </div>
    </DrawerModal>
  );
};

export default DrawingModal;
