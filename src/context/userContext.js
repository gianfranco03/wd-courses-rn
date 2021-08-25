import React, { useEffect, useState, createContext, useContext } from 'react'
import { supabase } from '../lib/constants/api';

export const UserContext = createContext({
  user: null
})

export const UserContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const sessionAux = supabase.auth.session();
    setSession(sessionAux)
    setUser(sessionAux?.user ?? null);

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, sessionAuth) => {
        const currentUser = sessionAuth?.user;
        setUser(currentUser ?? null);
        setSession(sessionAuth)
      },
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  const value = {
    session,
    user,
  }
  return <UserContext.Provider value={value} {...props} />
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("error provider")
  }

  return context
}
