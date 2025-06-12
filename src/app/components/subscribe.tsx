"use client";

import { faCat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type SubscriptionFormProps = React.FormHTMLAttributes<HTMLFormElement>;

export default function SubscriptionForm(props: SubscriptionFormProps) {
  const subscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("subscribed");
  };

  return (
    <form
      {...props}
      className={`flex gap-4 sm:items-center flex-col sm:flex-row w-full ${props.className}`}
      onSubmit={subscribe}
    >
      <input
        type="email"
        className="border border-solid border-white focus:outline-none rounded-xl w-full bg-background text-sm px-4 h-10"
        placeholder="wise.popper@catwisdom.purr"
        required
      />
      <button
        className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
        type="submit"
      >
        <FontAwesomeIcon className="text-2xl" icon={faCat} />
        Subscribe
      </button>
    </form>
  );
}
