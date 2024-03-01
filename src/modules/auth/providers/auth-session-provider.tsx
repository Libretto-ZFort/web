import { supabase } from '@/src/lib/supabase';
import { Session, SupabaseClient } from '@supabase/supabase-js';
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

type AuthSessionContext = {
  session: Session | null;
  supabase: SupabaseClient | null;
};

const authSessionContext = createContext<AuthSessionContext>({
  session: null,
  supabase: null,
});

export function AuthSessionProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => setSession(session));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) =>
      setSession(session)
    );
    return () => subscription.unsubscribe();
  }, []);

  return (
    <authSessionContext.Provider value={{ session, supabase }}>
      {children}
    </authSessionContext.Provider>
  );
}

export function useAuthSession() {
  return useContext(authSessionContext);
}
