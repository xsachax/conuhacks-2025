import useConversationStore from "./conversationStore";
import { sendChatMessage } from "./sendChatMessage";
import { useGameStore } from "../utils/gameStore";

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

  const userResponses = store.careerAnswers.map((record) => `Q: ${record.question}\nA: ${record.answer}`).join("\n");

  const prompt = `
      You are an advanced AI trained in career advising and data analysis.
      Your task is to analyze the user's responses and determine their top 3 best-matching careers.
      
      **USER RESPONSES:**
      ${userResponses}
  
      **INSTRUCTIONS:**
      - Based on the user's answers, select the **top 3 career matches**.
      - For each job, assign an **accuracy score (out of 100)** based on how well it fits the user's responses.
      - Identify the **top 3 decision-making criteria** that influenced your selection.
      - Include a small biais towards Software Engineering and Computer Science related positions.
      - Return ONLY the following format with NO extra text, explanations, or formatting:
  
      job1: [Top Career 1]
      accuracy1: [Accuracy]
      job2: [Top Career 2]
      accuracy2: [Accuracy]
      job3: [Top Career 3]
      accuracy3: [Accuracy]
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

export async function getRelatedPositions(): Promise<{
  originalJob1: string;
  relatedJob1a: string;
  relatedJob1aPosting: string;
  relatedJob1b: string;
  relatedJob1bPosting: string;
  originalJob2: string;
  relatedJob2a: string;
  relatedJob2aPosting: string;
  relatedJob2b: string;
  relatedJob2bPosting: string;
  originalJob3: string;
  relatedJob3a: string;
  relatedJob3aPosting: string;
  relatedJob3b: string;
  relatedJob3bPosting: string;
}> {
  const { gameResults } = useGameStore.getState();

  const prompt = `
    You are an advanced AI trained in career advising and data analysis.
    Your task is to analyze the user's responses and determine their top 3 best-matching careers.

    **DATA INPUTS:**
    job1: ${gameResults.job1}
    job2: ${gameResults.job2}
    job3: ${gameResults.job3}
    criteria1: ${gameResults.criteria1}
    criteria2: ${gameResults.criteria2}
    criteria3: ${gameResults.criteria3}

    **INSTRUCTIONS:**
    - Based on the above jobs (job1, job2, job3) career matches and their decision-making criteria, suggest 2 other related positions of which they would be qualified for.
    
    Return ONLY the following format with NO extra text, explanations, or formatting:

    originalJob1: [Original Career 1]
    relatedJob1a: [Related Career 1a]
    relatedJob1b: [Related Career 1b]
    originalJob2: [Original Career 2]
    relatedJob2a: [Related Career 2a]
    relatedJob2b: [Related Career 2b]
    originalJob3: [Original Career 3]
    relatedJob3a: [Related Career 3a]
    relatedJob3b: [Related Career 3b]
  `.trim();

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: any = await sendChatMessage(prompt);

    if (typeof response !== "string") {
      console.error("Invalid response format:", response);
      throw new Error("sendChatMessage did not return a string");
    }

    const relatedPositions = response.split("\n").reduce((acc: Record<string, string>, line: string) => {
      const [key, value] = line.split(": ");
      if (key && value) {
        acc[key.trim()] = value.trim();
      }
      return acc;
    }, {});

    console.log("Generated Related Positions:", relatedPositions);

    const createIndeedUrl = (jobTitle: string) => `https://ca.indeed.com/jobs?q=${jobTitle.replace(/\s+/g, '+')}`;

    return {
      originalJob1: gameResults.job1,
      relatedJob1a: relatedPositions.relatedJob1a || "Project Manager",
      relatedJob1aPosting: createIndeedUrl(relatedPositions.relatedJob1a || "Project Manager"),
      relatedJob1b: relatedPositions.relatedJob1b || "SCRUM Lead",
      relatedJob1bPosting: createIndeedUrl(relatedPositions.relatedJob1b || "SCRUM Lead"),
      originalJob2: gameResults.job2,
      relatedJob2a: relatedPositions.relatedJob2 || "Solution Architect",
      relatedJob2aPosting: createIndeedUrl(relatedPositions.relatedJob2 || "Solution Architect"),
      relatedJob2b: relatedPositions.relatedJob2 || "VP Technology",
      relatedJob2bPosting: createIndeedUrl(relatedPositions.relatedJob2 || "VP Technology"),
      originalJob3: gameResults.job3,
      relatedJob3a: relatedPositions.relatedJob3 || "System Design Engineer",
      relatedJob3aPosting: createIndeedUrl(relatedPositions.relatedJob3 || "System Design Engineer"),
      relatedJob3b: relatedPositions.relatedJob3 || "Database Administrator",
      relatedJob3bPosting: createIndeedUrl(relatedPositions.relatedJob3 || "Database Administrator"),
    };
  } catch (error) {
    console.error("Error fetching related positions:", error);
    return {
      originalJob1: gameResults.job1,
      relatedJob1a: "Project Manager",
      relatedJob1aPosting: "https://ca.indeed.com",
      relatedJob1b: "SCRUM Lead",
      relatedJob1bPosting: "https://ca.indeed.com",
      originalJob2: gameResults.job2,
      relatedJob2a: "Solution Architect",
      relatedJob2aPosting: "https://ca.indeed.com",
      relatedJob2b: "VP Technology",
      relatedJob2bPosting: "https://ca.indeed.com",
      originalJob3: gameResults.job3,
      relatedJob3a: "System Design Engineer",
      relatedJob3aPosting: "https://ca.indeed.com",
      relatedJob3b: "Database Administrator",
      relatedJob3bPosting: "https://ca.indeed.com",
    };
  }
}
