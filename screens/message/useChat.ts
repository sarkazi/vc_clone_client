import { useEffect, useRef, useState } from "react";

import io, { Socket } from "socket.io-client";
import { getMessagesDto, sendMessageDto } from "../../utils/api/types";

const SERVER_URL = "http://localhost:80";

export const useChat = (dialogId: number) => {
  const [dialog, setDialog] = useState({});
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!dialogId) return;

    const newSocket = io(SERVER_URL, { query: { dialogId }, secure: true });
    setSocket(newSocket);
    return () => {
      newSocket.close();
    };
  }, [dialogId, setSocket]);

  useEffect(() => {
    if (!socket) return;

    socket.emit("dialog:get", { dialogId });

    socket.on("dialog", (dialog) => {
      setDialog(dialog);
    });

    return () => {
      socket.disconnect();
    };
  }, [dialogId, socket]);

  const sendMessageIo = (body: sendMessageDto) => {
    socket?.emit("message:add", body);
  };

  const getMessages = (body: getMessagesDto) => {
    socket?.emit("message:get", body);
  };

  return { dialog, sendMessageIo, getMessages };
};
