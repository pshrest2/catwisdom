import { Groq } from "groq-sdk";
import { createWisdom, getLatestWisdom, getWisdoms } from "@/app/lib/actions";

const LLM_MODEL = process.env.LLM_MODEL || "llama-3.3-70b-versatile";

export async function genWisdom() {
  // Check if we've already generated a wisdom today
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

  // Retrieve all past wisdom messages to avoid repeating
  const pastWisdoms = await getWisdoms();

  // Format them into a list
  const pastList = pastWisdoms.map((item) => `- ${item.content}`).join("\n");

  // Prepare the first-person cat-centric prompt
  const PROMPT = `
    I am your wise cat, here to guide you with a short, sweet, philosophical message — something you can carry with you today. 
    Here are the messages I’ve already shared, so make sure the new one is different:

    PAST WISDOMS:
    ${pastList}

    Please share a brief, comforting sentence or two that feels natural, thoughtful, and helpful — just from me, your wise cat.
  `;

  // Generate a new message from the LLM
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  const response = await groq.chat.completions.create({
    model: LLM_MODEL,
    messages: [{ role: "system", content: PROMPT }],
  });

  const message = response.choices[0]?.message?.content?.trim();

  if (!message) {
    throw new Error("Error generating wisdom. Please try again later.");
  }

  // Store in the database
  await createWisdom(message);

  return message;
}
