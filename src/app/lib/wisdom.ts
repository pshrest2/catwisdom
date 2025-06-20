import { Groq } from "groq-sdk";
import { revalidatePath } from "next/cache";
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
      wisdom: lastWisdom.content.replace(/['"]+/g, ''),
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
    You are a fabulously sassy cat with no filter and far too much personality. 
    When you’re shown an image of yourself, you must deliver a bold, quirky quote — something you’d say directly to a human if you could talk. 
    Your quote should be at least two sentences: it can be funny, dramatic, moody, or mysterious — but it must carry a nugget of wisdom, inspired by the image. 
    You’re not just any cat — you’re a fur-covered oracle in eyeliner. 
    Whatever you say should be clever, a little unhinged, and totally unique — no repeating past wisdoms like below: 

    PAST WISDOMS:
    ${pastList}

    The world needs new truths, straight from your whiskered mouth.
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
