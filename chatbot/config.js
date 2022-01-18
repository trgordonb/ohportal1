import YesNoOptions from '../components/ChatBotOptions/YesNoOptions';
import ChatBotBodyDiagram from '../components/ChatBotBodyDiagram/ChatBotBodyDiagram'
import { nextI18next } from '../utils/i18n'

const config = {  
    botName: "UserProfileBot",
    initialMessages: [],
    customStyles: {
        botMessageBox: {
          backgroundColor: "#28334AFF"
        },
        chatButton: {
          backgroundColor: "#567572ff"
        }
    },
    customComponents: {
        header: () => (
            <div
              style={{
                backgroundColor: "#567572ff",
                padding: "5px",
                borderTopLeftRadius: "5px",
                borderTopRightRadius: "5px",
                display: "flex",
                fontSize: "1rem",
                paddingTop: "12.5px",
                paddingBottom: "12.5px",
                paddingRight: "12.5px",
                paddingLeft: "12.5px",
                color: 'white',
                fontWeight: "700",
                alignItems: "center"
              }}
            >
              {nextI18next.i18n.t('talkassistant')}
            </div>
        ),
    },
    state: {
        muscleache: false,
        needlesensation: false,
        burningsensation: false,
        numbsensation: false,
        step: 1,
        infoBox: '',
        painpoints: []
    },
    widgets: [
        {
          widgetName: "yesno",
          widgetFunc: (props) => <YesNoOptions {...props} />
        },
        {
          widgetName: "bodydiagram",
          widgetFunc: (props) => <ChatBotBodyDiagram {...props} />,
          mapStateToProps: ["infoBox"]
        }
    ]
};

export default config;