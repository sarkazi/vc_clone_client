import { Button } from "@mui/material";
import Link from "next/link";
import React, { FC } from "react";
import styles from "./settingsButtons.module.scss";

import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import clsx from "clsx";

import { useRouter } from "next/router";
import { useAppSelector } from "../../../redux/hooks";
import { selectUserData } from "../../../redux/slices/user";
import { Api } from "../../../utils/api";

interface SettingsButtonsProps {
  absolute: boolean;
  userToId: number;
}

const SettingsButtons: FC<SettingsButtonsProps> = ({ absolute, userToId }) => {
  const router = useRouter();
  const userData = useAppSelector(selectUserData);

  console.log(userToId);

  const createDialog = async () => {
    try {
      const data = await Api().dialogs.createDialog(userToId);
      router.push(`/chats/${data.id}`);
    } catch (err) {
      console.log(err);
      if (err.response) {
        alert(err.response.data.message);
      }
    }
  };

  return (
    <div
      style={
        !absolute
          ? {
              position: "static",
              marginBottom: "20px",
              flexDirection: "row-reverse",
            }
          : { position: "absolute" }
      }
      className={styles.buttonBlock}
    >
      {+router.query.id === +userData.id && (
        <Link href="/profile/settings">
          <Button>
            <SettingsSuggestOutlinedIcon />
          </Button>
        </Link>
      )}

      <Button onClick={createDialog}>
        <SendOutlinedIcon />
        <span>Написать</span>
      </Button>
    </div>
  );
};

export default SettingsButtons;
