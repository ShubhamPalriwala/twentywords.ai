"use client";

import { useState, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import SendIcon from "../../public/send.svg";
import { IChat } from "../utils/types";
import AskAi from "../utils/askAi";
import { parseText } from "../utils/parseAiResponse";
import BoxesContainer from "./RecommendationBoxes";

export default function BottomBar({
  isUserChatting,
  setIsUserChatting,
  conversationHistory,
  setConversationHistory,
  latestRecommendations,
  setLatestRecommendations,
}: {
  isUserChatting: boolean;
  setIsUserChatting: Dispatch<SetStateAction<boolean>>;
  conversationHistory: IChat[];
  setConversationHistory: Dispatch<SetStateAction<IChat[]>>;
  latestRecommendations: string[];
  setLatestRecommendations: Dispatch<SetStateAction<string[]>>;
}) {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleIconClick = () => {
    setIsLoading(true);
    setIsUserChatting(true);
    answerInputQuestion(inputValue);
    setInputValue("");
  };

  const answerInputQuestion = async (question: string) => {
    if (question.trim() === "") {
      setIsLoading(false);
      return;
    }

    // Create a new chat item without the answer
    const newChatItem: IChat = {
      question: question,
    };

    // Update conversation history with newChatItem
    setConversationHistory((prevHistory: IChat[]) => [
      ...prevHistory,
      newChatItem,
    ]);

    const answer = await AskAi(inputValue);
    const parsedAnswer = parseText(answer?.toString() || "");

    // Update the answer of the newChatItem
    newChatItem.answer = parsedAnswer.answer;

    // Update the conversationHistory with the answered question
    setConversationHistory((prevHistory: IChat[]) => {
      // Remove the last item (which is the question we just added)
      const historyWithoutLastItem = prevHistory.slice(0, -1);

      // Append the newChatItem which now contains the answer
      return [...historyWithoutLastItem, newChatItem];
    });

    setLatestRecommendations(parsedAnswer.recommendations);
    setIsLoading(false);
  };

  return (
    <>
      {isUserChatting ? (
        <div className="max-w-xl w-full pb-16 pt-2 bg-custom-green fixed bottom-0">
          <p
            className={`text-white text-sm font-normal ${
              isLoading ? "invisible" : null
            }`}
          >
            now tell me about
          </p>

          {/* isLoading pass karna hai isme and use common one */}
          <BoxesContainer
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            recommendationTexts={latestRecommendations}
            setRecommendationTexts={setLatestRecommendations}
            setIsUserChatting={setIsUserChatting}
            conversationHistory={conversationHistory}
            setConversationHistory={setConversationHistory}
          />
        </div>
      ) : null}
      <div className="w-full h-14 max-w-xl flex-shrink-0 shadow-upwards bg-custom-green fixed bottom-0 z-10">
        <div
          className="h-8 mx-2 my-3 flex-shrink-0 border border-white rounded shadow-md flex items-center justify-between"
          style={{ backgroundColor: "rgba(217, 217, 217, 0.2)" }}
        >
          <input
            type="text"
            placeholder="Ask me anything"
            className="text-sm font-normal text-white pl-4 bg-transparent outline-none w-full pr-2"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />

          <Image
            src={SendIcon}
            alt="Send Icon"
            className={`flex-shrink-0 mr-2 ${
              isLoading ? "cursor-not-allowed opacity-40" : "cursor-pointer"
            }`}
            width={18}
            height={18}
            onClick={!isLoading ? handleIconClick : undefined}
          />
        </div>
      </div>
    </>
  );
}
