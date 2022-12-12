import React, { useRef } from "react";
import styles from "./profile.module.scss";
import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";
import ClearIcon from "@mui/icons-material/Clear";

import Post from "../../components/Post";
import Tabs from "../../components/Tabs";
import { GetServerSideProps, NextPage } from "next";
import { useAppSelector } from "../../redux/hooks";
import { selectUserData } from "../../redux/slices/user";

import { changeAvatar, changeCover } from "../../redux/slices/user";

import moment from "moment";
import { Api } from "../../utils/api";
import { PostType, responseUser } from "../../utils/api/types";

import { useDispatch } from "react-redux";

import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";

import MainWrapper from "../../components/MainWrapper";

import SettingsButtons from "../../components/Buttons/SettingsButtons";
import clsx from "clsx";
import { useRouter } from "next/router";

const tabsUserActivity = [
  "Статьи",
  "Комментарии",
  "Черновики",
  "Донаты",
  "Подробнее",
];

interface ProfilePageProps {
  posts: PostType[];
  user: responseUser;
}

const Profile: NextPage<ProfilePageProps> = ({ user, posts }) => {
  const dispatch = useDispatch();
  const tabsRef = React.useRef(null);
  const tabRef = React.useRef(null);

  const router = useRouter();

  const breakPoint = 670;
  const checkingWindow = typeof window !== "undefined";

  const [widthWindow, setWidthWindow] = React.useState(
    checkingWindow && window.innerWidth
  );
  const handleResizeWindow = () =>
    setWidthWindow(checkingWindow && window.innerWidth);

  checkingWindow && window.addEventListener("resize", handleResizeWindow);

  const sendAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("avatar", file);
      const data = await Api().user.updateProfile(formData);
      dispatch(changeAvatar(data.avatarUrl));
    } catch (err) {
      console.log(err);
      if (err.response) {
        alert(err.response.data.message);
      }
    }
  };
  const sendCover = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("cover", file);
      const data = await Api().user.updateProfile(formData);
      dispatch(changeCover(data.coverUrl));
    } catch (err) {
      console.log(err);
      if (err.response) {
        alert(err.response.data.message);
      }
    }
  };

  const removeCover = async () => {
    if (window.confirm("Удалить обложку?")) {
      try {
        const formData = new FormData();
        formData.append("coverUrl", "");
        const data = await Api().user.updateProfile(formData);
        dispatch(changeCover(data.coverUrl));
        console.log(data);
      } catch (err) {
        console.log(err);
        if (err.response) {
          alert(err.response.data.message);
        }
      }
    }
  };

  moment.updateLocale("ru", {
    months:
      "января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря".split(
        "_"
      ),
    weekdays:
      "Воскресенье_Понедельник_Вторник_Среда_Четверг_Пятница_Суббота".split(
        "_"
      ),
  });

  const userData = useAppSelector(selectUserData);

  const dateRegistration = moment(new Date(user?.createdAd)).format(
    "D MMMM YYYY"
  );

  return (
    <MainWrapper sizePage="profilePage">
      <div className={styles.profileWrapper}>
        <div
          style={{
            backgroundImage: `url(http://localhost:7777/covers/${user?.coverUrl})`,
          }}
          className={clsx(
            styles.profileCover,
            user?.coverUrl && styles.coverInstalled
          )}
        >
          {+router.query.id === +userData.id && (
            <label htmlFor="inputAddCover" className={styles.labelCover}>
              <CollectionsOutlinedIcon />

              <span>
                {user?.coverUrl ? "Сменить обложку" : "Добавить обложку"}
              </span>
              <input
                onChange={(e) => sendCover(e)}
                className={styles.inputAddCover}
                id="inputAddCover"
                type="file"
              />
            </label>
            //  {userData?.coverUrl && (
            //   <button onClick={removeCover} className={styles.labelCover}>
            //     <ClearIcon />
            //     <span>Удалить обложку</span>
            //   </button>
            // )}
          )}
        </div>
        <section className={styles.profileBlock}>
          <div ref={tabsRef} className={styles.contentBlock}>
            <form
              encType="multipart/form-data"
              style={{
                backgroundImage: `url(http://localhost:7777/avatars/${user?.avatarUrl})`,
              }}
              className={styles.avatarBlock}
            >
              {!user?.avatarUrl && <span>{user?.fullName[0]}</span>}
              {+router.query.id === +userData.id && (
                <label
                  htmlFor="upload-input"
                  className={styles.editingPhotoBlock}
                >
                  <input
                    onChange={(e) => sendAvatar(e)}
                    id="upload-input"
                    type="file"
                    className={styles.editingPhotoInput}
                  />
                  <AccountBoxOutlinedIcon className={styles.editingPhoto} />
                </label>
              )}
            </form>
            <h2 className={styles.name}>{user?.fullName}</h2>
            {+router.query.id === +userData.id && (
              <button className={styles.changeAbout}>изменить описание</button>
            )}

            {widthWindow < breakPoint && (
              <SettingsButtons userToId={user.id} absolute={false} />
            )}

            <span className={styles.dataReg}>
              на проекте с {dateRegistration}
            </span>
            <nav ref={tabRef} className={styles.allInfo}>
              <Tabs tabs={tabsUserActivity} />
            </nav>
          </div>

          {widthWindow >= breakPoint && (
            <SettingsButtons userToId={user.id} absolute={true} />
          )}
        </section>
        <section className={styles.itemsSection}>
          <section className={styles.itemPost}>
            {posts?.map((post) => (
              <Post post={post} key={post.id} />
            ))}
          </section>
          <section className={styles.itemSubscribe}>
            <div className={styles.subscribeItemBlock}>
              <h3>Подписчики</h3>
              <span>У вас нет ещё подписчиков</span>
            </div>
            <div className={styles.subscribeItemBlock}>
              <h3>Подписки</h3>
              <a href="">Настроить ленту</a>
            </div>
          </section>
        </section>
      </div>
    </MainWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const user = await Api(ctx).user.findOne(+ctx.query.id);
    const posts = await Api(ctx).posts.getByUser(+ctx.query.id);

    return {
      props: {
        user: user,
        posts: posts,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        user: null,
        posts: null,
      },
      redirect: {
        destination: "/",
      },
    };
  }
};

export default Profile;
