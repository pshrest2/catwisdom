import SubscriptionForm from "@/app/custom/subscribe";

export default async function Unsubscribe() {
  return (
    <div className="flex flex-col items-center">
      <main className="flex flex-col gap-4 items-center sm:max-w-xl">
        <div className="text-4xl xs:text-5xl sm:text-6xl font-bold">
          Don't Leave 😿
        </div>
        <div className="sm:text-2xl">We are sorry to see you go</div>
        <SubscriptionForm className="px-6" mode="unsubscribe" />
      </main>
    </div>
  );
}
