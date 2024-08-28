import { useAppContext } from "@/store/Context";
import createFileURL from "@/helpers/createFileURL";
import styles from "./Info.module.css";

const Info = () => {
  const { info } = useAppContext();

  return (
    <div className={styles.container}>
      <img
        className={styles.avatar}
        src={createFileURL("avatar", info?.avatarImageName) || "/avatar.jpg"}
        alt="avatar"
      />
      <p className={styles.description}>{info?.description}</p>
    </div>
  );
};

export default Info;
