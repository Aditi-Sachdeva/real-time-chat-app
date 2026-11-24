
import { useChatStore } from "../store/useChatStore";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <main className="min-h-screen bg-base-200 px-2 pb-4 pt-20 sm:px-4">
      <div className="mx-auto h-[calc(100vh-6rem)] min-h-[32rem] w-full max-w-6xl overflow-hidden rounded-xl border border-base-300 bg-base-100 shadow-lg">
        <div className="flex h-full overflow-hidden rounded-xl">
          <Sidebar />

          {selectedUser ? (
            <ChatContainer />
          ) : (
            <NoChatSelected />
          )}
        </div>
      </div>
    </main>
  );
};

export default HomePage;
