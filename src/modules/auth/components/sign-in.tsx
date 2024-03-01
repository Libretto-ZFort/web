import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Card } from '@/src/common/components/ui/card';
import { useAuthSession } from '@/src/modules/auth/providers/auth-session-provider';

export const SignIn = () => {
  const { supabase } = useAuthSession();

  if (!supabase) {
    return null;
  }

  return (
    <div className="container flex justify-center items-center min-h-screen">
      <Card className="max-w-md w-full p-4">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={[]}
          theme={'dark'}
        />
      </Card>
    </div>
  );
};
