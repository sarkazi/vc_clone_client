import React from "react";
import styles from "./tabs.module.scss";

import { Button } from "@mui/material";

interface TabsProps {
  tabs: string[];
  marg?: {};
}

const Tabs: React.FC<TabsProps> = ({ tabs, marg }) => {
  const [activeTab, setActiveTab] = React.useState(0);

  return (
    <ul style={marg} className={styles.tabsItems}>
      {tabs.map((el, index) => (
        <li
          key={el}
          className={activeTab === index ? styles.active : undefined}
        >
          <Button>{el}</Button>
        </li>
      ))}
    </ul>
  );
};

export default Tabs;
