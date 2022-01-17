import { useEffect } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';
import { useAppState } from '../../hooks/use-appstate'

export default function Signout(){
  const { setCurrentUser } = useAppState()

  const { doRequest } = useRequest({
    url: 'https://ohbiohealth.xyz/api/users/signout',
    method: 'post',
    body: {},
    withCredentials: true,
    onSuccess: () => Router.push('/')
  });

  useEffect(() => {
    //doRequest();
    setCurrentUser(null)
    Router.push('/')
  }, []);

  return <div>Signing you out...</div>;
};
