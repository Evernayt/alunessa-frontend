import IconButton from "@/components/ui/icon-button/IconButton";
import { useAppContext } from "@/store/Context";
import createFileURL from "@/helpers/createFileURL";
import styles from "./SocialNetworks.module.css";

const SocialNetworks = () => {
  const { socialNetworks } = useAppContext();

  const openInNewTab = (url: string) => {
    window.open(url, "_blank", "noreferrer");
  };

  return (
    socialNetworks.length > 0 && (
      <div className={styles.container}>
        {socialNetworks.map((socialNetwork) => (
          <IconButton
            icon={createFileURL("icons", socialNetwork.icon)}
            onClick={() => openInNewTab(socialNetwork.url)}
            key={socialNetwork.id}
          />
        ))}
      </div>
    )
  );
};

export default SocialNetworks;
