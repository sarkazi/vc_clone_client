import clsx from "clsx";
import React from "react";
import styles from "./layout.module.scss";

interface Layout {
  sizeLauout: string;
}

const Layout = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default Layout;
