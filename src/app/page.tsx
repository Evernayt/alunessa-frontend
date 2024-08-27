"use client";

import Profile from "@/components/profile/Profile";
import { useMediaQuery } from "react-responsive";
import ProfileMobile from "@/components/profile/ProfileMobile";
import Clients from "@/components/profile/clients/Clients";
import Drawings from "@/components/drawings/Drawings";
import { useAppContext } from "@/store/Context";
import Loader from "@/components/ui/loader/Loader";
import styles from "./page.module.css";

const HomePage = () => {
  const { appIsLoading } = useAppContext();

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  return appIsLoading ? (
    <Loader />
  ) : (
    <div className={styles.container}>
      {isMobile ? <ProfileMobile /> : <Profile />}
      <Drawings />
      {isMobile && <Clients />}
    </div>
  );
};

export default HomePage;
