import SubscriptionForm from "@/app/custom/subscribe";
import { genWisdom } from "@/app/lib/wisdom";

export default async function Home() {
  return (
    <div className="flex flex-col items-center">
      <main className="flex flex-col gap-4 items-center sm:max-w-xl">
        <div className="text-4xl xs:text-5xl sm:text-6xl font-bold">
          Cat Wisdom 🐱
        </div>
        <div className="sm:text-2xl">Daily doses of feline philosophy</div>
        <span className="text-sm font-bold px-6 py-4">
          Wisdom of the day -{" "}
          <span className="text-sm italic font-normal">{genWisdom()}</span>
        </span>
        <SubscriptionForm className="px-6" mode="subscribe" />
      </main>
    </div>
  );
}
