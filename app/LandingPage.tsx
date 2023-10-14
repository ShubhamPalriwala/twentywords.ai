import { Dispatch, SetStateAction, useState } from "react";
import PrivacySection from "./components/PrivacySection";
import BoxesContainer from "./components/RecommendationBoxes";
import { defaultRecommendations } from "./utils/constants";
import { IChat } from "./utils/types";

export default function LandingPage({
  setIsUserChatting,
  conversationHistory,
  setConversationHistory,
  setRecommendationTexts,
}: {
  setIsUserChatting: Dispatch<SetStateAction<boolean>>;
  conversationHistory: IChat[];
  setConversationHistory: Dispatch<SetStateAction<IChat[]>>;
  setRecommendationTexts: Dispatch<SetStateAction<string[]>>;
}) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div
      className="h-screen w-full max-w-xl flex flex-col items-center pb-16"
      style={{ height: "calc(100vh - 7rem)" }}
    >
      <div className="mt-32 w-2/3">get answers about anything in 20 words</div>
      <p className="text-white text-sm font-normal mt-4">For example,</p>

      <BoxesContainer
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        recommendationTexts={defaultRecommendations}
        setIsUserChatting={setIsUserChatting}
        conversationHistory={conversationHistory}
        setConversationHistory={setConversationHistory}
        setRecommendationTexts={setRecommendationTexts}
      />

      <div className="flex flex-col items-center">
        <div className="flex items-center my-12">
          <PrivacySection />
        </div>
        <p className="text-white text-sm font-normal mb-2">
          type your own query
        </p>
      </div>
    </div>
  );
}
