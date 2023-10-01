"use client";

import LandingPage from "./LandingPage";
import Chat from "./components/Chat";
import BottomBar from "./components/BottomBar";
import { HeadingBar } from "./components/HeadingBar";
import { useState } from "react";
import { IChat } from "./utils/types";
import { defaultRecommendations } from "./utils/constants";

export default function Home() {
  const [isUserChatting, setIsUserChatting] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<IChat[]>([]);
  const [latestRecommendations, setLatestRecommendations] = useState<string[]>(
    defaultRecommendations
  );

  return (
    <div className="bg-custom-green h-screen flex flex-col items-center justify-between text-white text-center text-xl font-extrabold">
      <div className="max-w-xl w-full ">
        <HeadingBar
          isUserChatting={isUserChatting}
          setIsUserChatting={setIsUserChatting}
          setConversationHistory={setConversationHistory}
        />
        <div className="h-full w-full flex flex-col items-center">
          {!isUserChatting ? (
            <LandingPage
              setIsUserChatting={setIsUserChatting}
              conversationHistory={conversationHistory}
              setConversationHistory={setConversationHistory}
              setRecommendationTexts={setLatestRecommendations}
            />
          ) : (
            <Chat
              conversationHistory={conversationHistory}
              setConversationHistory={setConversationHistory}
              setLatestRecommendations={setLatestRecommendations}
            />
          )}
        </div>
        <BottomBar
          isUserChatting={isUserChatting}
          setIsUserChatting={setIsUserChatting}
          conversationHistory={conversationHistory}
          setConversationHistory={setConversationHistory}
          latestRecommendations={latestRecommendations}
          setLatestRecommendations={setLatestRecommendations}
        />
      </div>
    </div>
  );
}
