import Info from "./info/Info";
import SocialNetworks from "./social-networks/SocialNetworks";
import styles from "./Profile.module.css";

const ProfileMobile = () => {
  return (
    <div className={styles.container}>
      <SocialNetworks />
      <Info />
    </div>
  );
};

export default ProfileMobile;
