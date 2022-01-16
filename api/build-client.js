import axios from 'axios';

const buildClient = ({ req }) => {
  if (typeof window === 'undefined') {
    // We are on the server

    return axios.create({
      baseURL:
      'https://ohbiohealth.xyz',
      headers: {
        ...req.headers,
        Host: 'ohbiohealth.xyz'
      },
    });
  } else {
    // We must be on the browser

    return axios.create({
      baseURL: 'https://ohbiohealth.xyz',
      withCredentials: true,
    });
  }
};

export default buildClient
