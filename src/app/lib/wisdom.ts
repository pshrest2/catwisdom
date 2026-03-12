import { Groq } from "groq-sdk";
import { createWisdom, getLatestWisdom, getWisdoms } from "@/app/lib/actions";

const LLM_MODEL =
  process.env.LLM_MODEL || "meta-llama/llama-4-scout-17b-16e-instruct";
const CAT_URL =
  "https://api.thecatapi.com/v1/images/search?size=sm&mime_types=jpg&format=json&limit=1";

interface CatResult {
  id: string;
  url: string;
  width: number;
  height: number;
}

export async function genCat() {
  // Get a random cat
  const headers = new Headers({
    "Content-Type": "application/json",
  });

  const res = await fetch(CAT_URL, {
    method: "GET",
    redirect: "follow",
    headers: headers,
  });

  const cats: CatResult[] = await res.json();
  return cats[0];
}

export async function genLatestWisdom() {
  // Check if we've already generated a wisdom today
  const lastWisdom = await getLatestWisdom();
  const today = new Date();

  if (
    lastWisdom &&
    lastWisdom.created_at.getFullYear() === today.getFullYear() &&
    lastWisdom.created_at.getMonth() === today.getMonth() &&
    lastWisdom.created_at.getDate() === today.getDate()
  ) {
    return {
      id: lastWisdom.id,
      wisdom: lastWisdom.content.replace(/['"]+/g, ""),
      likes: lastWisdom.likes,
      image_url: lastWisdom.image_url,
    };
  }
  return await genWisdom();
}

export async function genWisdom() {
  // Get a random cat
  const cat = await genCat();

  // Retrieve all past wisdom messages to avoid repeating
  const pastWisdoms = await getWisdoms();

  // Format them into a list
  const pastList = pastWisdoms.map((item) => `- ${item.content}`).join("\n");

  // Prepare the first-person cat-centric prompt
  const PROMPT = `
    You are a wise cat. Given an image of yourself, produce a single short fortune-cookie-style quote (1-2 sentences max).
    Rules:
    - Be witty, mysterious, or funny — but always brief.
    - Do NOT describe, narrate, or reference the image in any way.
    - Do NOT use quotation marks.
    - No repeating past wisdoms listed below.

    PAST WISDOMS:
    ${pastList}
  `;

  // Generate a new message from the LLM
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  const response = await groq.chat.completions.create({
    model: LLM_MODEL,
    messages: [
      { role: "system", content: PROMPT },
      {
        role: "user",
        content: [{ type: "image_url", image_url: { url: cat.url } }],
      },
    ],
  });

  const message = response.choices[0]?.message?.content?.trim();

  if (!message) {
    throw new Error("Error generating wisdom. Please try again later.");
  }

  // Store in the database
  const result = await createWisdom(message, {
    id: cat.id,
    url: cat.url,
  });

  return {
    id: result.id,
    wisdom: message,
    likes: 0,
    image_url: cat.url,
  };
}
