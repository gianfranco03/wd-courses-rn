import React, {useEffect, useState, createContext, useContext} from 'react';
import {supabase} from '../lib/constants/api';

export const UserContext = createContext({
  user: null,
  userInfo: null,
  sections: [],
  courses: [],
});

export const UserContextProvider = props => {
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [sections, setSections] = useState(null);
  const [courses, setCourses] = useState(null);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const sessionAux = supabase.auth.session();
    setSession(sessionAux);
    setUser(sessionAux?.user ?? null);

    const {data: authListener} = supabase.auth.onAuthStateChange(
      async (event, sessionAuth) => {
        const currentUser = sessionAuth?.user;
        setUser(currentUser ?? null);
        setSession(sessionAuth);

        if (currentUser?.id) {
          getUserInfo(currentUser?.id);
          getSections();
          getCourses();
        }
      },
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  const getUserInfo = async id => {
    try {
      const {data: profile} = await supabase
        .from('profiles')
        .select('*')
        .eq('profile_id', id);
      setUserInfo(profile[0] ?? null);
    } catch (e) {
      console.log('error p', e);
    }
  };

  const getSections = async () => {
    try {
      const {data: sectionsAux} = await supabase.from('sections').select('*');
      setSections(sectionsAux ?? null);
    } catch (e) {
      console.log('error s', e);
    }
  };

  const getCourses = async id => {
    try {
      const {data: coursesAux} = await supabase.from('courses').select('*');
      setCourses(coursesAux ?? null);
    } catch (e) {
      console.log('error s', e);
    }
  };

  const value = {
    session,
    user,
    userInfo,
    sections,
    courses,
  };
  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    return null;
  }

  return context;
};
