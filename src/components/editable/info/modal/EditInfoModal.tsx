import { FormEvent, useState } from "react";
import InfoAPI from "@/api/InfoAPI/InfoAPI";
import { useAppContext } from "@/store/Context";
import errorHandler from "@/helpers/errorHandler";
import DrawerModal from "@/components/ui/drawer-modal/DrawerModal";
import Loader, { LoaderWrapper } from "@/components/ui/loader/Loader";
import styles from "./EditInfoModal.module.css";

const EditInfoModal = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    editInfoModal: { isOpen, info },
    closeModal,
    setInfo,
  } = useAppContext();

  const update = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formProps = Object.fromEntries(formData);
    const description = formProps.description as string;

    if (info) {
      setIsLoading(true);
      InfoAPI.update({ id: info.id, description })
        .then(() => {
          setInfo({ ...info, description });
          closeHandler();
        })
        .catch((e) => errorHandler("update info", e))
        .finally(() => setIsLoading(false));
    } else {
      errorHandler("info not created");
    }
  };

  const closeHandler = () => {
    closeModal("editInfoModal");
  };

  return (
    <DrawerModal isOpen={isOpen} onClose={closeHandler}>
      <div className={styles.container} data-vaul-no-drag>
        {isLoading ? (
          <LoaderWrapper>
            <Loader />
          </LoaderWrapper>
        ) : (
          <form className={styles.form} onSubmit={update}>
            <label htmlFor="description">Описание</label>
            <textarea
              id="description"
              name="description"
              required
              defaultValue={info?.description}
            />
            <div className={styles.controls}>
              <button type="submit">Сохранить</button>
              <button type="button" onClick={closeHandler}>
                Отмена
              </button>
            </div>
          </form>
        )}
      </div>
    </DrawerModal>
  );
};

export default EditInfoModal;
