import React, { useEffect } from "react";
import ConditionallyRender from 'react-conditionally-render'
import ChatBotInfoBox from "../ChatBotInfoBox/ChatBotInfoBox"
import styles from './ChatBotBodyDiagram.module.css'
import Image from "next/image";
import bodyback from '../../public/images/bodyback.jpg'
import bodyfront from '../../public/images/bodyfront.jpg'

const ChatBotBodyDiagram = ({ infoBox, setState }) => {
  useEffect(() => {
    setState((state) => ({
      ...state,
      infoBox: "bodydiagram",
    }));
  }, [setState]);

  const showBodyDiagram = infoBox === "bodydiagram";

  return (
    <div>
      <ConditionallyRender
        condition={showBodyDiagram}
        show={
          <ChatBotInfoBox setState={setState}>
            <div className={styles.flexcontainer}>
                <div className={styles.flexchild}>
                    <Image src={bodyfront} alt="Body Front" width={130} height={400} />
                </div>
                <div className={styles.flexchild}>
                    <Image src={bodyback} alt="Body Back" width={130} height={400} />
                </div>
            </div>
          </ChatBotInfoBox>
        }
      />
    </div>
  );
};

export default ChatBotBodyDiagram;
