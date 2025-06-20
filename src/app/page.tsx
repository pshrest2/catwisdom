import { genLatestWisdom } from "@/app/lib/wisdom";
import { SubscriptionForm } from "@/app/custom/subscribe";
import { ModeToggle } from "@/app/custom/mode-toggle";
import { WisdomCard } from "@/app/custom/wisdom-card";

export default async function Home() {
  const { id, wisdom, likes, image_url } = await genLatestWisdom();
  return (
    <div className="flex flex-col items-center mb-4">
      <div className="xs:absolute xs:top-6 xs:right-6">
        <ModeToggle />
      </div>
      <main className="flex flex-col gap-4 items-center sm:max-w-xl">
        <div className="text-4xl xs:text-5xl sm:text-6xl font-bold">
          Cat Wisdom 😽
        </div>
        <div className="sm:text-2xl">Daily doses of feline philosophy</div>
        <WisdomCard avatarSrc={image_url} wisdomId={id} totalLikes={likes}>
          <span className="text-sm font-bold">
            Wisdom of the day -{" "}
            <span className="text-sm italic font-normal">{wisdom}</span>
          </span>
        </WisdomCard>
        <SubscriptionForm mode="subscribe" />
      </main>
    </div>
  );
}
