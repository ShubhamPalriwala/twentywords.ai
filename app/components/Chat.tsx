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
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversationHistory]);

  return (
    <div className="flex h-screen w-full max-w-xl">
      <div className="w-full flex flex-col px-2 overflow-scroll [&::-webkit-scrollbar]:hidden mt-16 pb-44">
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
        <div ref={endOfMessagesRef}></div>
      </div>
    </div>
  );
}
