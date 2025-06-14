"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { faCat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { subscribe, unsubscribe, FormState } from "@/app/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SubscriptionMode {
  mode: "subscribe" | "unsubscribe";
}

type SubscriptionFormProps = React.FormHTMLAttributes<HTMLFormElement> &
  SubscriptionMode;

function SubmitButton({ mode }: SubscriptionMode) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit">
      <FontAwesomeIcon className="text-2xl ml-2" icon={faCat} />
      {mode === "subscribe" ? "Subscribe" : "Unsubscribe"}
    </Button>
  );
}

export default function SubscriptionForm({
  mode = "subscribe",
  ...props
}: SubscriptionFormProps) {
  const initialState: FormState = { success: false, error: "" };
  const [state, formAction] = useActionState(
    mode === "subscribe" ? subscribe : unsubscribe,
    initialState
  );

  return (
    <>
      <form
        {...props}
        className={`flex gap-4 xs:items-center flex-col xs:flex-row w-full ${props.className}`}
        action={formAction}
      >
        <Input
          name="email"
          type="email"
          placeholder="master@catwisdom.purr"
          required
        />
        <SubmitButton mode={mode} />
      </form>
      <div className="mt-2 px-6">
        <p className="text-xs text-muted-foreground mt-2">
          {mode === "subscribe"
            ? "By subscribing, you agree to receive daily wisdom email."
            : "By unsubscribing, you will no longer receive daily wisdom email."}
        </p>
        {state.error && <p className="text-red-400 mb-2">{state.error}</p>}
        {state.success && (
          <p className="text-green-400">
            {mode === "subscribe"
              ? "You're successfully subscribed! 🥳"
              : "You've unsubscribed successfully! 😿"}
          </p>
        )}
      </div>
    </>
  );
}
