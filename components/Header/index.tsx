import React from "react";
import styles from "./header.module.scss";
import Link from "next/link";
import { destroyCookie } from "nookies";
import {
  Paper,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

import AuthModal from "../modals/AuthModal";

import ClickAwayListener from "react-click-away-listener";

import SearchIcon from "@mui/icons-material/Search";

import AcUnitIcon from "@mui/icons-material/AcUnit";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import Layout from "../Layout";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import { useAppSelector } from "../../redux/hooks";
import { selectUserData, logOutUser } from "../../redux/slices/user";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { Api } from "../../utils/api";

import AvatarBlock from "../AvatarBlock";

import BtnAddPost from "./BtnAddPost";

import NoSsr from "@mui/base/NoSsr";

import { SearchPostDto } from "../../utils/api/types";
import { string } from "yup";

import LogoBlock from "./LogoBlock";

import { PostType } from "../../utils/api/types";
import clsx from "clsx";

type HeaderProps = {
  setShowNavBar?: (status: boolean) => void;
  showNavBar?: boolean;
};

const Header: React.FC<HeaderProps> = ({ showNavBar, setShowNavBar }) => {
  const headerModalRef = React.useRef(null);

  const router = useRouter();
  const dispatch = useDispatch();

  const breakPoint = 750;
  const checkingWindow = typeof window !== "undefined";

  const [widthWindow, setWidthWindow] = React.useState(
    checkingWindow && window.innerWidth
  );
  const handleResizeWindow = () =>
    setWidthWindow(checkingWindow && window.innerWidth);

  checkingWindow && window.addEventListener("resize", handleResizeWindow);

  const [statusPopupUser, setStatusPopupUser] = React.useState(false);
  const [dataInput, setDataInput] = React.useState<SearchPostDto>();
  const [postsSearch, setPostsSearch] = React.useState<PostType[]>();
  const [hideInput, setHideInput] = React.useState<boolean>(false);

  const userData = useAppSelector(selectUserData);

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const openNav = () => {
    setShowNavBar(true);
  };
  const hideNav = () => {
    setShowNavBar(!showNavBar);
  };

  const logOut = () => {
    if (window.confirm("вы уверены?")) {
      destroyCookie(null, "vc_token");
      dispatch(logOutUser());
      setStatusPopupUser(false);
      router.push("/");
    }
  };

  const globalSearch = async (e) => {
    setDataInput({ ...dataInput, title: e.target.value, limit: 5 });
    try {
      const { items } = await Api().posts.search(dataInput);
      setPostsSearch(items);
    } catch (err) {
      console.log(err);
      if (err.response) {
        alert(err.response.data.message);
      }
    }
  };

  return (
    <NoSsr>
      <Paper className={styles.header} elevation={0}>
        <Layout>
          <div className={styles.wrapper}>
            <LogoBlock
              onclick={widthWindow < breakPoint ? openNav : hideNav}
              margin={false}
            />

            <div
              className={clsx(styles.searchBlock, !hideInput && styles.hide)}
            >
              <label>
                <NoSsr>
                  <SearchIcon
                    style={{
                      fill: "rgb(197, 172, 172)",
                      width: "20px",
                      alignSelf: "center",
                    }}
                  />
                </NoSsr>
                <input
                  onChange={(e) => globalSearch(e)}
                  type="text"
                  placeholder="Поиск"
                  value={dataInput?.title}
                />
                {dataInput?.title && postsSearch?.length > 0 && (
                  <section className={styles.searchModal}>
                    <ul className={styles.searchModalList}>
                      {postsSearch?.length > 0 &&
                        postsSearch.map((obj) => (
                          <li key={obj.id} className={styles.searchModalItem}>
                            {obj.title}
                          </li>
                        ))}
                    </ul>
                  </section>
                )}
              </label>
            </div>
            {userData && <BtnAddPost width={false} text="Создать" />}
            <div className={styles.notificationBlock}>
              <NoSsr>
                <IconButton
                  onClick={() => setHideInput(!hideInput)}
                  className={styles.hideSearchIcon}
                >
                  <SearchIcon style={{ position: "relative" }} />
                </IconButton>
              </NoSsr>
              <div className={styles.hideBlock}>
                <NoSsr>
                  <IconButton>
                    <NotificationsNoneOutlinedIcon
                      style={{ position: "relative" }}
                    />
                  </IconButton>
                </NoSsr>
                {userData ? (
                  <div className={styles.authHeaderBlock}>
                    <NoSsr>
                      <IconButton>
                        <CommentOutlinedIcon />
                      </IconButton>
                    </NoSsr>
                    <div
                      onClick={() => setStatusPopupUser(!statusPopupUser)}
                      className={styles.accountBlock}
                    >
                      <Link href={`/profile/${userData.id}`}>
                        <AvatarBlock
                          avatarPath={userData.avatarUrl}
                          location="headerAvatar"
                        />
                      </Link>
                      <IconButton className={styles.arrowModal}>
                        <KeyboardArrowDownRoundedIcon />
                      </IconButton>
                      {statusPopupUser && (
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className={styles.popupUA}
                          ref={headerModalRef}
                        >
                          <h3 className={styles.uaTitle}>Мой профиль</h3>
                          <Link
                            href={`/profile/${userData.id}`}
                            className={styles.uaUserBlock}
                          >
                            <AvatarBlock
                              avatarPath={userData.avatarUrl}
                              location="modalHeaderProfile"
                            />
                            <span>{userData.fullName}</span>
                          </Link>
                          <ul className={styles.items}>
                            <li onClick={logOut} className={styles.item}>
                              <ExitToAppOutlinedIcon />
                              <span>Выйти</span>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div onClick={handleClickOpen} className={styles.enterBlock}>
                    <NoSsr>
                      <IconButton
                        disableRipple={true}
                        className={styles.btnEnter}
                      >
                        <Person2OutlinedIcon style={{ position: "relative" }} />

                        <span>Войти</span>
                      </IconButton>
                    </NoSsr>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Layout>
        <AuthModal
          open={open}
          handleClose={handleClose}
          handleClickOpen={handleClickOpen}
        />
      </Paper>
    </NoSsr>
  );
};

export default Header;
