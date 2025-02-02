import useConversationStore from "./conversationStore";
import { sendChatMessage } from "./sendChatMessage";

export async function getCareerMatchResults(): Promise<{
    job1: string;
    accuracy1: string;
    job2: string;
    accuracy2: string;
    job3: string;
    accuracy3: string;
    criteria1: string;
    criteria2: string;
    criteria3: string;
  }> {
    const store = useConversationStore.getState();
  
    const userResponses = store.careerAnswers.map(
      (record) => `Q: ${record.question}\nA: ${record.answer}`
    ).join("\n");
  
    const prompt = `
      You are an advanced AI trained in career advising and data analysis.
      Your task is to analyze the user's responses and determine their top 3 best-matching careers.
      
      **USER RESPONSES:**
      ${userResponses}
  
      **INSTRUCTIONS:**
      - Based on the user's answers, select the **top 3 career matches**.
      - For each job, assign an **accuracy score (out of 100)** based on how well it fits the user's responses.
      - Identify the **top 3 decision-making criteria** that influenced your selection.
      - Return ONLY the following format with NO extra text, explanations, or formatting:
  
      job1: [Top Career 1]
      accuracy1: [Accuracy %]
      job2: [Top Career 2]
      accuracy2: [Accuracy %]
      job3: [Top Career 3]
      accuracy3: [Accuracy %]
      criteria1: [Most important decision factor]
      criteria2: [Second important factor]
      criteria3: [Third important factor]
    `.trim();
  
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response: any = await sendChatMessage(prompt);
  
      if (typeof response !== "string") {
        console.error("Invalid response format:", response);
        throw new Error("sendChatMessage did not return a string");
      }
  
      console.log("Generated Career Matches:", response);
  
      const parsedResults = response.split("\n").reduce((acc, line) => {
        const [key, value] = line.split(":").map((x) => x.trim());
        if (key && value) acc[key] = value;
        return acc;
      }, {} as Record<string, string>);
  
      return {
        job1: parsedResults.job1 || "Software Engineer",
        accuracy1: parsedResults.accuracy1 || "95",
        job2: parsedResults.job2 || "Product Manager",
        accuracy2: parsedResults.accuracy2 || "82",
        job3: parsedResults.job3 || "Engineer Consultant",
        accuracy3: parsedResults.accuracy3 || "30",
        criteria1: parsedResults.criteria1 || "Flexibility",
        criteria2: parsedResults.criteria2 || "Problem Solving",
        criteria3: parsedResults.criteria3 || "Career Growth",
      };
    } catch (error) {
      console.error("Error retrieving career match results:", error);
  
      return {
        job1: "Software Engineer",
        accuracy1: "95",
        job2: "Product Manager",
        accuracy2: "82",
        job3: "Engineer Consultant",
        accuracy3: "30",
        criteria1: "Flexibility",
        criteria2: "Problem Solving",
        criteria3: "Career Growth",
      };
    }
  }
  