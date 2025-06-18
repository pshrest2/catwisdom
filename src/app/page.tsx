import Image from "next/image";
import { genWisdom } from "@/app/lib/wisdom";
import { SubscriptionForm } from "@/app/custom/subscribe";
import { ModeToggle } from "@/app/custom/mode-toggle";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function Home() {
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
        <Card className="w-full">
          <CardHeader className="flex items-center">
            <Avatar className="relative size-32 mx-auto">
              <AvatarImage
                src="/images/wise-cat.png"
                className="object-cover"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </CardHeader>
          <CardContent className="text-center">
            <span className="text-sm font-bold">
              Wisdom of the day -{" "}
              <span className="text-sm italic font-normal">{genWisdom()}</span>
            </span>
          </CardContent>
        </Card>
        <SubscriptionForm mode="subscribe" />
      </main>
    </div>
  );
}
