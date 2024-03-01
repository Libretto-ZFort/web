import { Button } from '@/src/common/components/ui/button';
import { SignIn } from '@/src/modules/auth/components/sign-in';
import { useAuthSession } from '@/src/modules/auth/providers/auth-session-provider';
import { ChatPage } from '@/src/modules/chat/pages/chat';
import { TasksPage } from '@/src/modules/tasks/pages/tasks';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

function App() {
  const { session, supabase } = useAuthSession();

  if (!session) {
    return <SignIn />;
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen pb-14">
        <header className="py-4 container flex justify-between border-b border-white/10 mb-4">
          <div className="flex gap-4 items-center">
            <h1 className="font-bold text-4xl">Workshop</h1>
            <div className="flex gap-4">
              <Link to="/">Tasks</Link>
              <Link to="/chat">Chat</Link>
            </div>
          </div>
          <div>
            <Button size="sm" onClick={() => supabase?.auth.signOut()}>
              Logout
            </Button>
          </div>
        </header>
        <Routes>
          <Route path="/" element={<TasksPage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
