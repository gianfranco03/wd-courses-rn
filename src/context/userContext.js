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
    // loginTemp();
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
        }
      },
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  const loginTemp = async () => {
    try {
      // let {user, error} = await supabase.auth.signIn({
      //   email: 'mcastrov6@miumg.edu.gt',
      //   password: 'password',
      // });

      let {user, error} = await supabase.auth.signUp({
        email: 'crisgianfrancojuarez306@gmail.com',
        password: 'password',
      });
      if (user) {
        console.log('created', user);
      }
      if (error) {
        console.log('error', error);
      }
    } catch (e) {
      console.log('error');
    }
  };

  const getUserInfo = async id => {
    try {
      const {data: profile} = await supabase
        .from('profiles')
        .select('*')
        .eq('profile_id', id);
      const userInfoAux = profile[0] ?? null;
      setUserInfo(userInfoAux);

      if (userInfoAux) {
        getCourses(id, userInfoAux.current_semester);
      }
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

  const getCourses = async (id, semester) => {
    try {
      let {data: user_courses} = await supabase
        .from('user_courses')
        .select('course_id');

      let {data: coursesAux} = await supabase
        .from('courses')
        .select('name,course_id')
        .eq('semester_id', semester);

      const results = coursesAux.filter(({course_id: id1}) =>
        user_courses.some(({course_id: id2}) => id2 === id1),
      );

      setCourses(results ?? []);
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
