class ActionProvider {
    constructor(createChatbotMessage, setStateFunc, createClientMessage, stateRef) {
      this.createChatbotMessage = createChatbotMessage;
      this.setState = setStateFunc;
      this.createClientMessage = createClientMessage;
      this.stateRef = stateRef;
    }

    setChatbotMessage = (message, newstate) => {
        let stateKey = Object.keys(newstate).length === 1 ? Object.keys(newstate)[0] : null
        let stateValue = Object.values(newstate).length === 1 ? Object.values(newstate)[0] : null
        if (stateKey && stateValue) {
          this.setState((state) => ({
            ...state,
            [stateKey]: stateValue,
            step: state.step + 1,
            messages: [...state.messages, message]
          }))
        } else {
          this.setState((state) => ({
            ...state,
            step: state.step + 1,
            messages: [...state.messages, message]
          })
        )}
        
    }
    
    handleYes = () => {
      if (this.stateRef.step === 1) {
        const message = this.createChatbotMessage(this.stateRef.t('q2'), { withAvatar: false, delay: 500, widget: "yesno" });
        this.setChatbotMessage(message, { muscleache: true });
      } else if (this.stateRef.step === 2) {
        const message = this.createChatbotMessage(this.stateRef.t('q3'), { withAvatar: false, delay: 500, widget: "yesno" });
        this.setChatbotMessage(message, { needlesensation: true });
      } else if (this.stateRef.step === 3) {
        const message = this.createChatbotMessage(this.stateRef.t('q4'), { withAvatar: false, delay: 500, widget: "yesno" });
        this.setChatbotMessage(message, { burningsensation: true });
      } else if (this.stateRef.step === 4) {
        const message = this.createChatbotMessage(this.stateRef.t('q5'));
        this.setChatbotMessage(message, { numbsensation: true });
      }
    }

    handleNo = () => {
      if (this.stateRef.step === 1) {
        const message = this.createChatbotMessage(this.stateRef.t('q2'), { withAvatar: false, delay: 500, widget: "yesno" });
        this.setChatbotMessage(message, { muscleache: false });
      } else if (this.stateRef.step === 2) {
        const message = this.createChatbotMessage(this.stateRef.t('q3'), { withAvatar: false, delay: 500, widget: "yesno" });
        this.setChatbotMessage(message, { needlesensation: false });
      } else if (this.stateRef.step === 3) {
        const message = this.createChatbotMessage(this.stateRef.t('q4'), { withAvatar: false, delay: 500, widget: "yesno" });
        this.setChatbotMessage(message, { burningsensation: false });
      } else if (this.stateRef.step === 4) {
        const message = this.createChatbotMessage(this.stateRef.t('q5'));
        this.setChatbotMessage(message, { numbsensation: false });
      }
    }

}
  
export default ActionProvider;