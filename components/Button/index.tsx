import React from "react";
import styles from "./button.module.scss";
import { Button } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import NoSsr from "@mui/base/NoSsr";

const BtnFollow: React.FC = () => {
  const [statusUser, setStatusUser] = React.useState(false);

  return (
    <Button
      onClick={() => setStatusUser(!statusUser)}
      className={styles.btnAdd}
    >
      {statusUser ? (
        <>
          <CheckIcon className={styles.svgCheck} />
          <CloseIcon className={styles.svgRemove} />
        </>
      ) : (
        <PersonAddIcon />
      )}
    </Button>
  );
};

export default BtnFollow;
