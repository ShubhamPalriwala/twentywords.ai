export function parseText(text: string) {
  let answer = "";
  let recommendations: string[] = [];

  // Check for the presence of the pattern '---'
  if (text.includes("---")) {
    // Split using '---'
    const parts = text.split("---");
    answer = parts[0].trim();

    const recommendationParts = parts[1].split(/,|\n/).filter(Boolean);
    recommendations = recommendationParts.map((s) =>
      s.trim().replace(/\.$/, "")
    );
  } else {
    // Split the text by comma or newline
    const splits = text.split(/, |\n/);

    // Find the transition segment (containing the word "topics")
    const transitionIndex = splits.findIndex((segment) =>
      segment.toLowerCase().includes("topics")
    );

    if (transitionIndex !== -1) {
      // Extract the answer and recommendations relative to the transition segment
      answer = splits
        .slice(0, transitionIndex + 1)
        .join(" ")
        .trim();
      recommendations = splits.slice(transitionIndex + 1).map((s) => {
        // If it's a numbered list, strip out the numbers and periods, then remove trailing full stops
        return s.replace(/[ \t]*\d+\.\s*/, "").replace(/\.$/, "");
      });
    } else {
      // Default logic for extracting recommendations and answer
      recommendations = splits.slice(-5).map((s) => {
        return s.replace(/[ \t]*\d+\.\s*/, "").replace(/\.$/, "");
      });
      answer = splits.slice(0, -5).join(" ").trim();
    }
  }

  if (!answer && recommendations.length) {
    answer = recommendations.join(", ");
    recommendations = [];
  }

  return {
    answer,
    recommendations,
  };
}
