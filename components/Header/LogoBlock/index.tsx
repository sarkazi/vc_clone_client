import React from "react";
import styles from "./logoBlock.module.scss";
import MenuIcon from "@mui/icons-material/Menu";

import { IconButton } from "@mui/material";
import Link from "next/link";
import clsx from "clsx";
import NoSsr from "@mui/base/NoSsr";

interface LogoBlockProps {
  margin: boolean;
  onclick: () => void;
}

const LogoBlock: React.FC<LogoBlockProps> = ({ margin, onclick }) => {
  return (
    <div className={clsx(styles.logoBlock, margin && styles.margin)}>
      <NoSsr>
        <IconButton onClick={onclick}>
          <MenuIcon style={{ fill: "black" }} />
        </IconButton>
      </NoSsr>
      <Link href="/" className={styles.logo}>
        <img src="/img/heqder/logo.png" alt="" />
      </Link>
    </div>
  );
};

export default LogoBlock;
