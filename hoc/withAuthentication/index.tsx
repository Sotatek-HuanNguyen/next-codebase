import { useRouter } from 'next/router';
import { FC, ReactElement, useEffect } from 'react';
import localStorageHelper, { KeyStorage } from '~/utils/localStorage';

type withAuthProps = (Component: FC) => FC;

const withAuth: withAuthProps = (Component) => {
  const Auth: FC = (): ReactElement | null => {
    const router = useRouter();
    // Get token in redux-store (or use localStorage for example)
    const isAuthenticated = localStorageHelper.getObject(KeyStorage.X_TOKEN, null);

    useEffect(() => {
      // If user is not logged in, redirect to login
      if (!isAuthenticated) router.push('/login');
    });

    // If user is logged in, return original component
    return isAuthenticated ? <Component /> : null;
  };

  return Auth;
};

export default withAuth;
