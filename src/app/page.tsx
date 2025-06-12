import SubscriptionForm from "@/app/components/subscribe";

export default async function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen p-8">
      <header className="flex flex-col gap-4 items-center">
        <div className="text-4xl sm:text-6xl font-bold">🐱 Cat Wisdom</div>
        <div className="sm:text-2xl">Daily doses of feline philosophy</div>
        <SubscriptionForm className="sm:ml-6" />
      </header>
      <main className="flex flex-col gap-8 row-start-2"></main>
    </div>
  );
}
