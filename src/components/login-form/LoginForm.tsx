import { FC, FormEvent, useState } from "react";
import AuthAPI from "@/api/AuthAPI/AuthAPI";
import styles from "./LoginForm.module.css";

interface LoginFormProps {
  onAuth: (isAdmin: boolean) => void;
}

const LoginForm: FC<LoginFormProps> = ({ onAuth }) => {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const auth = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);
    const formProps = Object.fromEntries(formData);
    const password = formProps.password as string;

    setIsLoading(true);
    AuthAPI.login({ password })
      .then(() => onAuth(true))
      .catch((e) =>
        setError(e.response.data ? e.response.data.message : e.message)
      )
      .finally(() => setIsLoading(false));
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={auth}>
        <label htmlFor="password">Пароль</label>
        <input type="password" name="password" id="password" required />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Авторизация..." : "Войти"}
        </button>
        <p className={styles.error}>{error}</p>
      </form>
    </div>
  );
};

export default LoginForm;
