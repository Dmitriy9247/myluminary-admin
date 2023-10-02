import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@windmill/react-ui';
import { ImFacebook, ImGoogle } from 'react-icons/im';

import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import jsonData from '../utils/auth.json';
import { AdminContext } from '../context/AdminContext';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Cookies from 'js-cookie';
import { useContext } from 'react';
import Loading from '../components/preloader/Loading';
import { notifyError } from '../utils/toast';
import { useLazyQuery } from '@apollo/client';
import { GET_USER_BY_EMAIL } from '../graphql/query';


const Login = () => {
  const {user, loginWithRedirect, isAuthenticated, logout} = useAuth0()
  const [findbyEmail] = useLazyQuery(GET_USER_BY_EMAIL)
  const { dispatch } = useContext(AdminContext);
  const history = useHistory();

  const logoutWithRedirect = () =>
  logout({
      logoutParams: {
        returnTo: process.env.REACT_APP_URL,
      }
  });

  useEffect(() => {
    if(isAuthenticated){
      const email = user?.email
      findbyEmail({variables:{email}}).then(res=> {
        const cookieTimeOut = 0.5;
        if(res.data.findbyEmail){
          if (res.data.findbyEmail.role && res.data.findbyEmail.role === "admin"){
            dispatch({ type: 'USER_LOGIN', payload: jsonData });
            Cookies.set('adminInfo', JSON.stringify(jsonData), {
              expires: cookieTimeOut,
            });
            history.replace('/dashboard');
          }
        }
        setTimeout(logoutWithRedirect(), 2000)
      }).catch((err) => {
        notifyError(err)
        setTimeout(logoutWithRedirect(), 2000)
      })
    }else {
      loginWithRedirect()
    }
  }, [isAuthenticated])

  return (
    <>
      <div className="flex items-center min-h-screen justify-center p-6 bg-gray-50 dark:bg-gray-900">
        <Loading />
      </div>
    </>
  );
};

export default Login;
