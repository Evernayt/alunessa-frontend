import { useAppContext } from "@/store/Context";
import Carousel from "@/components/ui/carousel/Carousel";
import createFileURL from "@/helpers/createFileURL";
import styles from "./Clients.module.css";

const Clients = () => {
  const { clients } = useAppContext();

  return (
    <div className={styles.container}>
      <p className={styles.title}>Мои заказчики</p>
      <Carousel>
        {clients.map((client) => (
          <img
            className={styles.image}
            src={createFileURL("images", client.compressedImageName)}
            key={client.id}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default Clients;
