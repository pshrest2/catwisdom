"use client";

import { FormEvent, useState } from "react";
import { faCat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { subscribe } from "@/app/lib/actions";

type SubscriptionFormProps = React.FormHTMLAttributes<HTMLFormElement>;

export default function SubscriptionForm(props: SubscriptionFormProps) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      // Call server action
      const id = await subscribe(email.trim());
      console.log(id);
      setSuccess(true);
      setEmail("");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(false), 3000);
    }
  }

  return (
    <>
      <form
        {...props}
        className={`flex gap-4 xs:items-center flex-col xs:flex-row w-full ${props.className}`}
        onSubmit={handleSubmit}
      >
        <input
          name="email"
          type="email"
          className="border border-solid border-white focus:outline-none focus:ring-1 focus:ring-gray-50  rounded-xl w-full bg-background text-sm px-4 h-10"
          placeholder="wise.popper@catwisdom.purr"
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          value={email}
          required
        />
        <button
          className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:cursor-pointer hover:bg-gray-200 active:bg-gray-300 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto disabled:bg-gray-500"
          disabled={loading}
          type="submit"
        >
          <FontAwesomeIcon className="text-2xl ml-2" icon={faCat} />
          Subscribe
        </button>
      </form>
      <div className="mt-2">
        {error && <p className="text-red-400 mb-2">{error}</p>}
        {success && (
          <p className="text-green-400">You’re successfully subscribed! 🥳</p>
        )}
      </div>
    </>
  );
}
