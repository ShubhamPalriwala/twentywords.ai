"use server";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// function sleep(ms: number): Promise<void> {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

export default async function AskAi(
  question: string,
  previousContext?: string
): Promise<string | null> {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant. Answer the user's question in 20 words. After the answer, add three hyphens, and then suggest 5 similar 1-word topics the user might ask based on their current query comma separated.",
      },
      {
        role: "user",
        content: `${previousContext} Tell me about ${question}`,
      },
    ],
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return response.choices[0]?.message?.content;
  // return "hiiiiihiiiiihiiiiihiiiiihiiiiihiiiiihiiiiihiiiiihiiiiihiiiiihiiiiihiiiiihiiiiihiiiiihiiiiihiiiiihiiiii"
}
