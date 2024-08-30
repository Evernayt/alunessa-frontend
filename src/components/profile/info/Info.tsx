import { useAppContext } from "@/store/Context";
import createFileURL from "@/helpers/createFileURL";
import Image from "next/image";
import styles from "./Info.module.css";

const Info = () => {
  const { info } = useAppContext();

  return (
    <div className={styles.container}>
      <Image
        className={styles.avatar}
        src={
          info?.avatar ? createFileURL("avatar", info.avatar) : "/avatar.jpg"
        }
        width={160}
        height={160}
        alt="avatar"
      />
      <p className={styles.description}>{info?.description}</p>
    </div>
  );
};

export default Info;
