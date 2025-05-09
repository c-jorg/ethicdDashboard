import { useRouter } from 'next/router';
import { isAuthenticated } from '@/app/utils/auth';
import { useEffect, useState } from 'react';

export const withAuth = (Component: React.ComponentType) => {
  return function AuthenticatedComponent(props: any) {
    const router = useRouter();
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
      const checkAuth = async () => {
        const authenticated = await isAuthenticated();
        if (!authenticated) {
          
          router.push('/login');
        } else {
          setIsAuth(true);
        }
      };

      checkAuth();
    }, []);

    if (!isAuth) {
      return null; // Render nothing or a loading spinner while checking auth
    }

    return <Component {...props} />;
  };
};

// Usage
const ProtectedPage = () => {
  return <h1>This is a protected page!</h1>;
};

export default withAuth(ProtectedPage);
