async function askAi(
  question: string,
  previousContext?: string
): Promise<string | null> {
  try {
    const apiUrl = new URL("/api/ai", window.location.origin);
    apiUrl.searchParams.append("question", question);

    if (previousContext) {
      apiUrl.searchParams.append("previousContext", previousContext);
    }

    const response = await fetch(apiUrl.toString());

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API Error: ${errorData.error}`);
    }

    const data = await response.json();
    return data.answer;
  } catch (error) {
    return "Something went wrong!";
  }
}

export default askAi;
