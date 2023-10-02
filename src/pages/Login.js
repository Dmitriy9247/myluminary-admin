import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@windmill/react-ui';
import { ImFacebook, ImGoogle } from 'react-icons/im';

import Error from '../components/form/Error';
import LabelArea from '../components/form/LabelArea';
import InputArea from '../components/form/InputArea';
import ImageLight from '../assets/img/login-office.jpeg';
import ImageDark from '../assets/img/login-office-dark.jpeg';
import useLoginSubmit from '../hooks/useLoginSubmit';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import jsonData from '../utils/auth.json';
import { AdminContext } from '../context/AdminContext';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Cookies from 'js-cookie';
import { useContext } from 'react';
import Loading from '../components/preloader/Loading';


const Login = () => {
  const {user, loginWithRedirect, isAuthenticated} = useAuth0()
  const { dispatch } = useContext(AdminContext);
  const history = useHistory();

  useEffect(() => {
    if(isAuthenticated){
      const cookieTimeOut = 0.5;
      dispatch({ type: 'USER_LOGIN', payload: jsonData });
      Cookies.set('adminInfo', JSON.stringify(jsonData), {
        expires: cookieTimeOut,
      });
      history.replace('/');
    }else {
      loginWithRedirect()
    }
  }, [isAuthenticated])
  const { onSubmit, register, handleSubmit, errors, loading } =
    useLoginSubmit();

  return (
    <>
      <div className="flex items-center min-h-screen justify-center p-6 bg-gray-50 dark:bg-gray-900">
        <Loading />
      </div>
    </>
  );
};

export default Login;
