import axios from 'axios';

class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
      this.state = state;
    }
  
    parse(message) {
      if (this.state.step === 5) {
        console.log('State: ',this.state);
        //axios['post'](`/api/profiles/painconditions`, { 
        //  muscleache: this.state.muscleache,
        //  needlesensation: this.state.needlesensation,
        //  burningsensation: this.state.burningsensation,
        //  numbsensation: this.state.numbsensation
        //})
        //.then(response => {
        //  console.log('Response: ',response)
        //})
      } 
    }
}

export default MessageParser