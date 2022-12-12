import React from "react";
import styles from "./navbar.module.scss";

import LocalFireDepartmentOutlinedIcon from "@mui/icons-material/LocalFireDepartmentOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import AddReactionOutlinedIcon from "@mui/icons-material/AddReactionOutlined";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";

import Link from "next/link";

import { useRouter } from "next/router";
import LogoBlock from "../Header/LogoBlock";
import clsx from "clsx";

import BtnAddPost from "../Header/BtnAddPost";

const itemsNavbar = [
  { icon: <LocalFireDepartmentOutlinedIcon />, text: "Моя лента", path: "/" },
  { icon: <CommentOutlinedIcon />, text: "Чаты", path: "/chats/1" },
  { icon: <BookmarkAddOutlinedIcon />, text: "Закладки", path: "/bookmarks" },
  { icon: <TrendingUpOutlinedIcon />, text: "Рейтинг", path: "/rating" },
  { icon: <AddReactionOutlinedIcon />, text: "Подписки", path: "/subscribe" },
];

type NavbarProps = {
  width: boolean;
  setShowNavBar: (status: boolean) => void;
  showNavBar: boolean;
};

const Navbar: React.FC<NavbarProps> = ({
  width,
  setShowNavBar,
  showNavBar,
}) => {
  const router = useRouter();
  const breakPoint = 750;
  const checkingWindow = typeof window !== "undefined";

  const [widthWindow, setWidthWindow] = React.useState(
    checkingWindow && window.innerWidth
  );
  const handleResizeWindow = () => {
    setWidthWindow(checkingWindow && window.innerWidth);
    // if (widthWindow < breakPoint && showNavBar) {
    //   setShowNavBar(false);
    // } else {
    //   setShowNavBar(true);
    // }
  };

  checkingWindow && window.addEventListener("resize", handleResizeWindow);

  const closeNav = () => {
    setShowNavBar(false);
  };

  return (
    <div
      className={clsx(
        styles.navWrapper,
        showNavBar && styles.show,
        !showNavBar && styles.hide
      )}
    >
      <nav className={styles.leftBlock}>
        {widthWindow < breakPoint && (
          <LogoBlock onclick={closeNav} margin={true} />
        )}
        <ul className={styles.items}>
          {itemsNavbar.map((obj, index) => (
            <li
              //  style={width}
              key={obj.text}
              className={clsx(
                router.pathname === obj.path && styles.active,
                width && styles.widthFull
              )}
            >
              <Link href={obj.path}>
                {obj.icon}
                <span>{obj.text}</span>
              </Link>
            </li>
          ))}
        </ul>
        {typeof window !== "undefined" && window.innerWidth < breakPoint && (
          <BtnAddPost text="Новая запись" width={true} height={false} />
        )}
      </nav>
    </div>
  );
};

export default Navbar;
