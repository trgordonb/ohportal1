import { useEffect } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

export default function Signout(){
  const { doRequest } = useRequest({
    url: 'https://ohbiohealth.xyz/api/users/signout',
    method: 'post',
    body: {},
    withCredentials: true,
    onSuccess: () => Router.push('/')
  });

  useEffect(() => {
    doRequest();
  }, []);

  return <div>Signing you out...</div>;
};
