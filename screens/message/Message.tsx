import React, { FC, useEffect, useState } from "react";
import styles from "./message.module.scss";

import MainWrapper from "../../components/MainWrapper";

import SearchIcon from "@mui/icons-material/Search";
import ChatName from "./ChatName/ChatName";
import AvatarBlock from "../../components/AvatarBlock";

import MoreHoriz from "@mui/icons-material/MoreHoriz";
import { IconButton } from "@mui/material";

import AttachFileIcon from "@mui/icons-material/AttachFile";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Msg from "./Msg/Msg";
import { Api } from "../../utils/api";
import { useAppSelector } from "../../redux/hooks";
import { selectUserData } from "../../redux/slices/user";
import { useRouter } from "next/router";
import { useChat } from "./useChat";

const Message: FC = () => {
  const [sendMessageState, setSendMessageState] = useState<string>("");
  const [messagesState, setMessagesState] = useState([]);

  const userData = useAppSelector(selectUserData);

  const { query } = useRouter();

  const { dialog, sendMessageIo, getMessages } = useChat(+query.id);

  useEffect(() => {
    const getDialog = async () => {
      const messages = await Api().message.getMessages({
        userTo: dialog?.userTo?.id,
        userFrom: userData?.id,
      });
      setMessagesState(messages);
    };
    getDialog();
  });

  const sendMessage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      //const message = await Api().message.createMessage({
      //  text: sendMessageState,
      //  userTo: dialog?.userTo?.id,
      //  userFrom: userData?.id,
      //  dialogId: +query?.id,
      //});

      sendMessageIo({
        text: sendMessageState,
        userTo: dialog?.userTo?.id,
        userFrom: userData?.id,
        dialogId: +query?.id,
      });

      setSendMessageState("");
    } catch (err) {
      console.log(err);
      if (err.response) {
        alert(err.response.data.message);
      }
    }
  };

  return (
    <>
      <MainWrapper sizePage="messagePage" width={true}>
        <section className={styles.messageBlock}>
          <div className={styles.wrapper}>
            <div className={styles.leftChat}>
              <div className={styles.messageBody}>
                <ul className={styles.listFriends}>
                  <ChatName user={dialog?.userTo} />
                </ul>
              </div>
            </div>
          </div>
          <div className={styles.rightChat}>
            <section className={styles.mainChatWrapper}>
              <section className={styles.mainChat}>
                <span className={styles.dateChat}>28 октября</span>
                {messagesState.map((message) => (
                  <Msg message={message} />
                ))}
              </section>
            </section>
            <form
              onSubmit={(e) => sendMessage(e)}
              className={styles.bottomInput}
            >
              <IconButton>
                <AttachFileIcon />
              </IconButton>
              <input
                value={sendMessageState}
                onChange={(e) => {
                  setSendMessageState(e.target.value);
                }}
                type="text"
                placeholder="Сообщение"
              />
              <button className={styles.buttonSend}>
                <ArrowUpwardIcon />
              </button>
            </form>
          </div>
          <div className={styles.search}>
            <label className={styles.labelInput}>
              <SearchIcon />
              <input type="text" placeholder="Поиск" />
            </label>
          </div>
          <div className={styles.about}>
            <div className={styles.avatarBlockAbout}>
              <AvatarBlock
                userName={dialog?.userTo?.fullName}
                avatarPath={dialog?.userTo?.avatarUrl}
                location="messagePageAbout"
              />
              <div className={styles.mainBody}>
                <span>{dialog?.userTo?.fullName}</span>
                <p>Был недавно</p>
              </div>
            </div>
            <IconButton>
              <MoreHoriz />
            </IconButton>
          </div>
        </section>
      </MainWrapper>
    </>
  );
};

export default Message;
