import Image from "next/image";
import { genWisdom } from "@/app/lib/wisdom";
import { SubscriptionForm } from "@/app/custom/subscribe";
import { ModeToggle } from "@/app/custom/mode-toggle";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default async function Home() {
  return (
    <div className="flex flex-col items-center">
      <div className="xs:absolute xs:top-6 xs:right-6">
        <ModeToggle />
      </div>
      <main className="flex flex-col gap-4 items-center sm:max-w-xl">
        <div className="text-4xl xs:text-5xl sm:text-6xl font-bold">
          Cat Wisdom 🐱
        </div>
        <div className="sm:text-2xl">Daily doses of feline philosophy</div>
        <Card className="w-full">
          <CardHeader className="flex items-center">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 mx-auto">
              <Image
                src="/images/wise-cat.jpg"
                alt="Wise cat sharing wisdom"
                className="object-cover"
                priority
                fill
              />
            </div>
          </CardHeader>
          <CardContent className="text-center">
            <span className="text-sm font-bold">
              Wisdom of the day -{" "}
              <span className="text-sm italic font-normal">{genWisdom()}</span>
            </span>
          </CardContent>
        </Card>
        <SubscriptionForm className="px-6" mode="subscribe" />
      </main>
    </div>
  );
}
