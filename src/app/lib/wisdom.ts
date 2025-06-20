import { Groq } from "groq-sdk";
import { revalidatePath } from "next/cache";
import { createWisdom, getLatestWisdom, getWisdoms } from "@/app/lib/actions";

const LLM_MODEL = process.env.LLM_MODEL || "llama-3.3-70b-versatile";

interface CatResult {
  id: string;
  url: string;
  width: number;
  height: number;
}

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
    return {
      id: lastWisdom.id,
      wisdom: lastWisdom.content,
      likes: lastWisdom.likes,
      image_url: lastWisdom.image_url,
    };
  }

  // Get a new cat
  const headers = new Headers({
    "Content-Type": "application/json",
  });

  const res = await fetch(
    "https://api.thecatapi.com/v1/images/search?size=sm&mime_types=jpg&format=json&limit=1",
    {
      method: "GET",
      redirect: "follow",
      headers: headers,
    }
  );

  const cats: CatResult[] = await res.json();
  const cat = cats[0];

  // Retrieve all past wisdom messages to avoid repeating
  const pastWisdoms = await getWisdoms();

  // Format them into a list
  const pastList = pastWisdoms.map((item) => `- ${item.content}`).join("\n");

  // Prepare the first-person cat-centric prompt
  const PROMPT = `
    Hey, it's me — your wise, fluffy feline friend. I'm here to drop a little nugget of cat wisdom to help you glide through today with style (and maybe a nap or two).

    Here are the things I've already meowed at you — so don't repeat these:

    PAST WISDOMS:
    ${pastList}

    Now give me a new one — something cozy, a little quirky, and totally cat-brained. Just a sentence or two that sounds like it came straight from my purring soul to yours. 😼
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
  const result = await createWisdom(message, {
    id: cat.id,
    url: cat.url,
  });

  revalidatePath("/");

  return {
    id: result.id,
    wisdom: message,
    likes: 0,
    image_url: cat.url,
  };
}
