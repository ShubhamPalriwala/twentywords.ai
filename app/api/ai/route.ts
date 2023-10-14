import { NextRequest, NextResponse } from "next/server";

import OpenAI from "openai";

export async function GET(req: NextRequest) {
  const question = req.nextUrl.searchParams.get("question");
  const previousContext = req.nextUrl.searchParams.get("previousContext");

  const rateLimited = req.headers.get("x-rate-limited");
  if (rateLimited === "true") {
    return NextResponse.json({ answer: "Rate limit exceeded" });
  }

  if (previousContext === "Limit reached! Please try after an hour!") {
    return NextResponse.json({
      answer:
        "Apologies, you have reached the limit! Please try after an hour!",
    });
  }

  if (!question || Array.isArray(question)) {
    return NextResponse.json({ answer: "Question is Required" });
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY as string,
  });

  try {
    // Generate response from OpenAI
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
          content: `${previousContext || ""} Tell me about ${question}`,
        },
      ],
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    return NextResponse.json({ answer: response.choices[0]?.message?.content });
  } catch (error) {
    return NextResponse.json({ answer: "Internal Server Error" });
  }
}
