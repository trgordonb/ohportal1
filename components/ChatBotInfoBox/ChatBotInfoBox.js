import React from "react";
import styles from "./ChatBotInfoBox.module.css";

const ChatBotInfoBox = ({ children, setState }) => {
  return (
    <div className={styles.informationBox}>
      <div className={styles.informationBoxContent}>{children}</div>
    </div>
  );
};

export default ChatBotInfoBox;
