import Link from "next/link";
import { SubscriptionForm } from "@/app/custom/subscribe";
import { Header } from "@/app/custom/header";

interface SearchParams {
  email?: string;
}

export default async function Unsubscribe({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { email } = await searchParams;

  return (
    <div className="flex flex-col items-center">
      <Header />
      <Link
        href="/"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        ← Changed your mind? Go back home
      </Link>
      <main className="flex flex-col gap-4 items-center sm:max-w-xl">
        <div className="text-4xl xs:text-5xl sm:text-6xl font-bold">
          Don't Leave 😿
        </div>
        <div className="sm:text-2xl">We are sorry to see you go</div>
        <SubscriptionForm mode="unsubscribe" initialEmail={email} />
      </main>
    </div>
  );
}
