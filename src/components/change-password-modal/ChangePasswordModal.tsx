import { FC, FormEvent, useState } from "react";
import DrawerModal from "../ui/drawer-modal/DrawerModal";
import { useAppContext } from "@/store/Context";
import AuthAPI from "@/api/AuthAPI/AuthAPI";
import styles from "./ChangePasswordModal.module.css";

interface ChangePasswordModalProps {
  logout: () => void;
}

const ChangePasswordModal: FC<ChangePasswordModalProps> = ({ logout }) => {
  const [error, setError] = useState<string>("");

  const {
    changePasswordModal: { isOpen },
    closeModal,
  } = useAppContext();

  const changePassword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);
    const formProps = Object.fromEntries(formData);
    const oldPassword = formProps.oldPassword as string;
    const newPassword = formProps.newPassword as string;

    AuthAPI.changePassword({ oldPassword, newPassword })
      .then(() => {
        closeHandler();
        logout();
      })
      .catch((e) =>
        setError(e.response.data ? e.response.data.message : e.message)
      );
  };

  const closeHandler = () => {
    closeModal("changePasswordModal");
  };

  return (
    <DrawerModal isOpen={isOpen} onClose={closeHandler}>
      <div className={styles.container} data-vaul-no-drag>
        <form className={styles.form} onSubmit={changePassword}>
          <label htmlFor="oldPassword">Старый пароль</label>
          <input type="password" name="oldPassword" id="oldPassword" required />
          <label htmlFor="newPassword">Новый пароль</label>
          <input type="password" name="newPassword" id="newPassword" required />
          <button type="submit">Изменить</button>
          <p className={styles.error}>{error}</p>
        </form>
      </div>
    </DrawerModal>
  );
};

export default ChangePasswordModal;
