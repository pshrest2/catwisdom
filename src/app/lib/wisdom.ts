import { Groq } from "groq-sdk";
import { createWisdom, getLatestWisdom } from "./actions";

const LLM_MODEL = process.env.LLM_MODEL || "llama-3.3-70b-versatile";
const PROMPT = `
You are a wise cat who guides your human with short, sweet, philosophical messages. 
Provide a brief, natural, and comforting one or two sentence of wisdom — something your human can carry with them today.
`;

export async function genWisdom() {
  const lastWisdom = await getLatestWisdom();
  const today = new Date();
  if (
    lastWisdom &&
    lastWisdom.created_at.getFullYear() === today.getFullYear() &&
    lastWisdom.created_at.getMonth() === today.getMonth() &&
    lastWisdom.created_at.getDate() === today.getDate()
  ) {
    return lastWisdom.content;
  }

  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  const response = await groq.chat.completions.create({
    model: LLM_MODEL,
    messages: [{ role: "system", content: PROMPT }],
  });
  const message = response.choices[0].message.content;
  if (!message) {
    throw new Error("Error generating wisdom. Please try again later.");
  }

  await createWisdom(message);
  return message;
}
