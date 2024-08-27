"use client";

import LoginForm from "@/components/login-form/LoginForm";
import { useLayoutEffect, useState } from "react";
import { setToken } from "@/helpers/localStorage";
import AuthAPI from "@/api/AuthAPI/AuthAPI";
import EditableInfo from "@/components/editable/info/EditableInfo";
import EditableSocialNetworks from "@/components/editable/social-networks/EditableSocialNetworks";
import EditableClients from "@/components/editable/clients/EditableClients";
import EditableDrawings from "@/components/editable/drawings/EditableDrawings";
import { useRouter } from "next/navigation";
import Loader from "@/components/ui/loader/Loader";
import { useAppContext } from "@/store/Context";
import ChangePasswordModal from "@/components/change-password-modal/ChangePasswordModal";
import styles from "./page.module.css";

const AdminPage = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const { appIsLoading, setAppIsLoading, openModal } = useAppContext();

  const router = useRouter();

  useLayoutEffect(() => {
    setAppIsLoading(true);
    AuthAPI.checkAuth()
      .then(() => setIsAuth(true))
      .catch(() => setIsAuth(false))
      .finally(() => setAppIsLoading(false));
  }, []);

  const goHome = () => {
    router.push("/");
  };

  const logout = () => {
    setToken("");
    setIsAuth(false);
  };

  const openChangePasswordModal = () => {
    openModal("changePasswordModal");
  };

  return appIsLoading ? (
    <Loader />
  ) : isAuth ? (
    <>
      <ChangePasswordModal logout={logout} />
      <div className={styles.container}>
        <div className={styles.column}>
          <EditableInfo />
        </div>
        <div className={styles.column}>
          <EditableSocialNetworks />
          <EditableClients />
        </div>
        <div className={styles.column}>
          <EditableDrawings />
        </div>
      </div>
      <div className={styles.footer}>
        <button onClick={goHome}>🏠 Главная</button>
        <button onClick={logout}>↪️ Выйти из аккаунта</button>
        <button onClick={openChangePasswordModal}>🔑 Изменить пароль</button>
      </div>
    </>
  ) : (
    <LoginForm onAuth={setIsAuth} />
  );
};

export default AdminPage;
