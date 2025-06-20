import { Resend } from "resend";
import { revalidatePath } from "next/cache";
import { EmailTemplate } from "@/app/custom/email-template";
import { getSubscribers } from "@/app/lib/actions";
import { genWisdom } from "@/app/lib/wisdom";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return new Response("Unauthorized", {
        status: 401,
      });
    }

    const wisdom = await genWisdom();
    const subscribers = await getSubscribers();

    const result: Record<number, { data: any; error: any }> = {};
    await Promise.all(
      subscribers.map(async (subscriber) => {
        const { data, error } = await sendEmail({
          email: subscriber.email,
          wisdom: wisdom.wisdom,
          image_url: wisdom.image_url,
        });
        result[subscriber.id] = { data, error };
      })
    );
    revalidatePath("/");
    // TODO: add retry here if failed to send email
    return Response.json({ result });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

async function sendEmail({
  email,
  wisdom,
  image_url,
}: {
  email: string;
  wisdom: string;
  image_url: string;
}) {
  return await resend.emails.send({
    from: "Wise Cat <catwisdom@raspisurveillance.com>",
    to: [email],
    subject: "Meow! Your Daily Wisdom Is Here",
    react: EmailTemplate({ wisdom, email, image_url }),
  });
}
