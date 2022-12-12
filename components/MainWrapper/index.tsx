import { IconButton } from "@mui/material";
import clsx from "clsx";
import Head from "next/head";
import React, { FC } from "react";
import Header from "../Header";
import Layout from "../Layout";
import Navbar from "../Navbar";
import styles from "./mainWrapper.module.scss";

import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { selectUserData } from "../../redux/slices/user";
import { useAppSelector } from "../../redux/hooks";
import Link from "next/link";

import { IMainWrapper } from "./main-wrapper.interface";

const MainWrapper: FC<IMainWrapper> = ({ children, sizePage, width }) => {
  const userData = useAppSelector(selectUserData);

  const breakPoint = 750;
  const checkingWindow = typeof window !== "undefined";

  const [widthWindow, setWidthWindow] = React.useState(
    checkingWindow && window.innerWidth
  );

  const [showNavBar, setShowNavBar] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (widthWindow <= breakPoint) {
      setShowNavBar(false);
    } else {
      setShowNavBar(true);
    }
  }, []);

  const handleResizeWindow = () => {
    setWidthWindow(checkingWindow && window.innerWidth);
    // if (widthWindow <= breakPoint) {
    //   setShowNavBar(false);
    // } else {
    //   setShowNavBar(true);
    // }
  };

  checkingWindow && window.addEventListener("resize", handleResizeWindow);

  return (
    <div className={styles.mainContainer}>
      <Header showNavBar={showNavBar} setShowNavBar={setShowNavBar} />
      <main className={styles.main}>
        <Layout>
          <div
            className={clsx(
              styles.wrapper,
              sizePage === "newsPage" && styles.newsPage,
              sizePage === "profilePage" && styles.profilePage,
              sizePage === "ratingPage" && styles.ratingPage,
              sizePage === "profileSettingsPage" && styles.profileSettingsPage,
              sizePage === "messagePage" && styles.messagePage
            )}
          >
            <Navbar
              width={width}
              showNavBar={showNavBar}
              setShowNavBar={setShowNavBar}
            />
            {children}
          </div>
        </Layout>
      </main>
      <nav className={styles.navMobile}>
        <ul className={styles.navMobileList}>
          <li>
            <Link href="/">
              <IconButton>
                <HomeOutlinedIcon />
              </IconButton>
            </Link>
          </li>
          <li>
            <Link href="/messages">
              <IconButton>
                <CommentOutlinedIcon />
              </IconButton>
            </Link>
          </li>
          <li>
            <IconButton>
              <NotificationsNoneOutlinedIcon />
            </IconButton>
          </li>
          <li className={styles.avatarBlock}>
            <Link href="/profile/me">
              <button>{userData?.fullName[0]}</button>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MainWrapper;
