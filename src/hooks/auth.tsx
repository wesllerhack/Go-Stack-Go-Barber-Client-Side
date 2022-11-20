import React, {
  createContext,
  useCallback,
  useState,
  PropsWithChildren,
  useContext,
  useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

interface AuthState {
  token: string;
  user: object;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: object;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(
    async ({ email, password }: SignInCredentials) => {
      const response = await api.post('sessions', {
        email,
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem('@GoBarber:token', token);
      localStorage.setItem('@GoBarber:user', JSON.stringify(user));

      navigate('/dashboard');

      setData({ token, user });
    },
    [navigate],
  );

  useEffect(() => {
    console.log(data.user);
    if (!data.user || !data.token) {
      navigate('/');
    }
    if (data.user && data.token) {
      navigate('/dashboard');
    }
  }, [data]);

  const signOut = useCallback(() => {
    localStorage.removetem('@GoBarber:token');
    localStorage.removetem('@GoBarber:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be within a AuthProvider');
  }

  return context;
}
