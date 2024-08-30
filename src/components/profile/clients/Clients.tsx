import { useAppContext } from "@/store/Context";
import Carousel from "@/components/ui/carousel/Carousel";
import createFileURL from "@/helpers/createFileURL";
import Image from "next/image";
import styles from "./Clients.module.css";

const Clients = () => {
  const { clients } = useAppContext();

  return (
    <div className={styles.container}>
      <p className={styles.title}>Мои заказчики</p>
      <Carousel>
        {clients.map((client) => (
          <Image
            className={styles.image}
            src={createFileURL("images", client.smallImage)}
            width={client.smallWidth}
            height={client.smallHeight}
            key={client.id}
            alt=""
          />
        ))}
      </Carousel>
    </div>
  );
};

export default Clients;
