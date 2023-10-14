import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import AnswerComponent from "./AnswerComponent";
import QuestionComponent from "./QuestionComponent";
import { IChat } from "../utils/types";

export default function Chat({
  conversationHistory,
  setConversationHistory,
  setLatestRecommendations,
}: {
  conversationHistory: IChat[];
  setConversationHistory: Dispatch<SetStateAction<IChat[]>>;
  setLatestRecommendations: Dispatch<SetStateAction<string[]>>;
}) {
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (conversationHistory.length > 1) {
      if (endOfMessagesRef.current) {
        endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [conversationHistory]);

  // This effect scrolls to the top of the window when the component is mounted
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex h-screen w-full max-w-xl">
      <div className="w-full flex flex-col px-2 overflow-scroll [&::-webkit-scrollbar]:hidden mt-20 pb-44">
        <div ref={endOfMessagesRef}></div>
        {conversationHistory.map((chat, index) => {
          return (
            <div key={index}>
              <QuestionComponent key={chat.question} text={chat.question} />

              <AnswerComponent
                key={chat.answer}
                text={chat.answer}
                index={index}
                conversationHistory={conversationHistory}
                setConversationHistory={setConversationHistory}
                setLatestRecommendations={setLatestRecommendations}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
