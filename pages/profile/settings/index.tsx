import React from "react";
import Header from "../../../components/Header";
import Layout from "../../../components/Layout";
import Navbar from "../../../components/Navbar";
import styles from "./settings.module.scss";
import { IconButton, Button } from "@mui/material";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import Link from "next/link";
import { useAppSelector } from "../../../redux/hooks";
import { selectUserData } from "../../../redux/slices/user";

import { updateUser } from "../../../utils/api/types";
import BtnBlue from "../../../components/Buttons/BtnBlue";
import { Api } from "../../../utils/api";
import { Router, useRouter } from "next/router";
import MainWrapper from "../../../components/MainWrapper";
import CommentBlock from "../../../components/CommentBlock";

const Settings: React.FC = () => {
  const router = useRouter();
  const userData = useAppSelector(selectUserData);

  const [inputInfoState, setInputInfoState] = React.useState<updateUser>({
    fullName: userData.fullName,
    email: userData.email,
  });

  const [avatarState, setAvatarState] = React.useState();

  const saveChangeData = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("fullName", inputInfoState.fullName);
      formData.append("email", inputInfoState.email);
      const data = await Api().user.updateProfile(formData);
    } catch (err) {
      console.log(err);
      if (err.response) {
        alert(err.response.data.message);
      }
    }
  };

  return (
    <MainWrapper sizePage="profileSettingsPage">
      <>
        <div className={styles.settingsBody}>
          <form
            acceptCharset="utf-8"
            encType="multipart/form-data"
            id="formUpdateUser"
            onSubmit={(e) => saveChangeData(e)}
            className={styles.settingsBlock}
          >
            <Link href="/profile">
              <IconButton>
                <KeyboardArrowDownRoundedIcon />
              </IconButton>
            </Link>
            <div className={styles.InputBlock}>
              <h2>Имя и Фамилия</h2>
              <input
                onChange={(e) =>
                  setInputInfoState({
                    ...inputInfoState,
                    fullName: e.target.value,
                  })
                }
                type="text"
                value={inputInfoState.fullName}
              />
            </div>
            <div className={styles.InputBlock}>
              <h2>Эл. почта</h2>
              <input
                onChange={(e) =>
                  setInputInfoState({
                    ...inputInfoState,
                    email: e.target.value,
                  })
                }
                type="text"
                value={inputInfoState.email}
              />
            </div>
            <BtnBlue submit={true} text="сохранить" />
          </form>
        </div>
        <CommentBlock />
      </>
    </MainWrapper>
  );
};

export default Settings;
