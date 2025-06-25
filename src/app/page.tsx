import { genLatestWisdom } from "@/app/lib/wisdom";
import { SubscriptionForm } from "@/app/custom/subscribe";
import { WisdomCard } from "@/app/custom/wisdom-card";
import { Header } from "@/app/custom/header";

export default async function Home() {
  const { id, wisdom, likes, image_url } = await genLatestWisdom();

  return (
    <div className="flex flex-col items-center mb-4 gap-4">
      <Header />
      <main className="flex flex-col gap-4 items-center sm:max-w-xl">
        <div className="text-4xl xs:text-5xl sm:text-6xl font-bold">
          Cat Wisdom 😽
        </div>
        <div className="sm:text-2xl">Daily doses of feline philosophy</div>
        <WisdomCard
          avatarSrc={image_url}
          wisdomId={id}
          totalLikes={likes}
          wisdom={wisdom}
        />
        <SubscriptionForm mode="subscribe" />
      </main>
    </div>
  );
}
