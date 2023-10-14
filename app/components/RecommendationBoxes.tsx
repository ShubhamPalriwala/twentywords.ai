import { Dispatch, SetStateAction, useState } from "react";
import { IChat } from "../utils/types";
import AskAi from "../utils/askAi";
import { parseText } from "../utils/parseAiResponse";

interface BoxesContainerProps {
  recommendationTexts: string[];
  setRecommendationTexts: Dispatch<SetStateAction<string[]>>;
  setIsUserChatting: Dispatch<SetStateAction<boolean>>;
  conversationHistory: IChat[];
  setConversationHistory: Dispatch<SetStateAction<IChat[]>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const BoxesContainer: React.FC<BoxesContainerProps> = ({
  recommendationTexts,
  setRecommendationTexts,
  setIsUserChatting,
  conversationHistory,
  setConversationHistory,
  isLoading,
  setIsLoading,
}) => {
  const handleIconClick = (value: string) => {
    setIsLoading(true);
    setIsUserChatting(true);
    answerInputQuestion(value);
  };

  const answerInputQuestion = async (question: string) => {
    if (question.trim() === "") {
      setIsLoading(false);
      return;
    }
    const newChatItem: IChat = { question };
    addToConversationHistory(newChatItem);

    const contextAnswer = await fetchAnswer(question);
    const parsedAnswer = parseText(contextAnswer);

    updateChatItemAnswer(newChatItem, parsedAnswer.answer);
    handleRecommendations(parsedAnswer.recommendations);

    setIsLoading(false);
  };

  const addToConversationHistory = (chatItem: IChat) => {
    setConversationHistory((prevHistory: IChat[]) => [
      ...prevHistory,
      chatItem,
    ]);
  };

  const updateChatItemAnswer = (chatItem: IChat, answer: string) => {
    chatItem.answer = answer;

    setConversationHistory((prevHistory: IChat[]) => {
      const historyWithoutLastItem = prevHistory.slice(0, -1);
      return [...historyWithoutLastItem, chatItem];
    });
  };

  const fetchAnswer = async (question: string): Promise<string> => {
    let contextAnswer: string | null;

    if (conversationHistory.length === 0) {
      contextAnswer = await AskAi(question);
    } else {
      const previousQuestion =
        conversationHistory[conversationHistory.length - 1];
      contextAnswer = previousQuestion.answer
        ? await AskAi(question, previousQuestion.answer)
        : await AskAi(question);
    }

    return contextAnswer?.toString() || "";
  };

  const handleRecommendations = (recommendations: string[]) => {
    const validRecommendations = recommendations.filter(
      (value) => value && value.length > 2
    );

    if (validRecommendations.length) {
      setRecommendationTexts(validRecommendations);
    }
  };

  return (
    <div className="flex flex-wrap justify-center mt-2 gap-2">
      {recommendationTexts.map((value, index) => (
        <div
          key={index}
          className={`h-8 flex-shrink-0 bg-opacity-60 border border-white rounded shadow-md flex items-center justify-center ${
            isLoading ? "cursor-not-allowed opacity-40" : "cursor-pointer"
          }`}
          style={{ backgroundColor: "rgba(217, 217, 217, 0.3)" }}
          onClick={() => handleIconClick(value)}
        >
          <p className="text-white text-sm font-normal text-center px-4">
            {value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default BoxesContainer;
