import React from "react";
import styles from "./btnAddPost.module.scss";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import Link from "next/link";
import clsx from "clsx";
import NoSsr from "@mui/base/NoSsr";

interface BtnAddPostProps {
  width: boolean;
  text: string;
  height?: boolean;
}

const BtnAddPost: React.FC<BtnAddPostProps> = ({ width, text, height }) => {
  return (
    <Link className={clsx(styles.linkAdd, width && styles.wide)} href="/write">
      <Button
        className={clsx(
          styles.buttonAdd,
          width && styles.wide,
          !height && styles.minHeight
        )}
      >
        <AddIcon style={{ fill: "black" }} />
        <span>{text}</span>
      </Button>
    </Link>
  );
};

export default BtnAddPost;
