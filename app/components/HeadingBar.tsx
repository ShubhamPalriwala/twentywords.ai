"use client";

import Image from "next/image";
import GithubIcon from "../../public/github.svg";
import ClearIcon from "../../public/clear.svg";
import { Dispatch, SetStateAction } from "react";
import { IChat } from "../utils/types";

export const HeadingBar = ({
  isUserChatting,
  setIsUserChatting,
  setConversationHistory,
}: {
  isUserChatting: boolean;
  setIsUserChatting: Dispatch<SetStateAction<boolean>>;
  setConversationHistory: Dispatch<SetStateAction<IChat[]>>;
}) => {
  return (
    <div className="w-full max-w-xl h-14 flex-shrink-0 shadow-downwards bg-custom-green flex items-center justify-between px-4 mb-1 fixed top-0 z-10">
      <div className="flex items-center">
        <Image
          src={GithubIcon}
          alt="Github Icon"
          className="cursor-pointer"
          width={18}
          height={18}
          onClick={() => {
            window.open(
              "https://github.com/ShubhamPalriwala/twentywords.ai",
              "_blank"
            );
          }}
        />
      </div>

      <span className="text-white text-lg font-extrabold">twentywords.ai</span>

      <div className="flex items-center">
        {isUserChatting && (
          <Image
            src={ClearIcon}
            alt="Github Icon"
            className="cursor-pointer"
            width={18}
            height={18}
            onClick={() => {
              setConversationHistory([]);
              setIsUserChatting(false);
            }}
          />
        )}
      </div>
    </div>
  );
};
