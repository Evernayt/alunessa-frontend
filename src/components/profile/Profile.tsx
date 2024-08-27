import Clients from "./clients/Clients";
import Info from "./info/Info";
import SocialNetworks from "./social-networks/SocialNetworks";
import styles from "./Profile.module.css";

const Profile = () => {
  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <Info />
      </div>
      <div className={styles.bottomContainer}>
        <SocialNetworks />
        <Clients />
      </div>
    </div>
  );
};

export default Profile;
