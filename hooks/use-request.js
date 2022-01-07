import axios from 'axios';
import { useState } from 'react';

export default ({ url, method, body, onSuccess, withCredentials }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async (props = {}) => {
    try {
      setErrors(null);
      if (withCredentials) {
        axios.defaults.withCredentials = true
      }
      const response = await axios[method](url, { ...body, ...props });
      if (onSuccess) {
        onSuccess(response.data);
      }
      
      return response.data;
    } catch (err) {
      console.log(err)
      const errMsgs = err.response.data.errors.map(err => (
        `${err.message}`
      ))
      setErrors(errMsgs[0]);
    }
  };

  return { doRequest, errors };
};
