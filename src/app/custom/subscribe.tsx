"use client";

import { FormEvent, useState } from "react";
import { faCat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { subscribe } from "@/app/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
        <Input
          name="email"
          type="email"
          placeholder="wise.popper@catwisdom.purr"
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          value={email}
          required
        />
        <Button disabled={loading} type="submit">
          <FontAwesomeIcon className="text-2xl ml-2" icon={faCat} />
          Subscribe
        </Button>
      </form>
      <div className="mt-2 px-6">
        <p className="text-xs text-muted-foreground mt-2">
          By subscribing, you agree to receive daily wisdom email.
        </p>
        {error && <p className="text-red-400 mb-2">{error}</p>}
        {success && (
          <p className="text-green-400">You're successfully subscribed! 🥳</p>
        )}
      </div>
    </>
  );
}
