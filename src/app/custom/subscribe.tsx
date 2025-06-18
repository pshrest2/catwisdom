"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react";
import { faCat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { subscribe, unsubscribe, FormState } from "@/app/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface SubscriptionMode {
  mode: "subscribe" | "unsubscribe";
}

type SubscriptionFormProps = React.FormHTMLAttributes<HTMLFormElement> &
  SubscriptionMode & {
    initialEmail?: string;
  };

function SubmitButton({ mode }: SubscriptionMode) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit">
      <FontAwesomeIcon className="text-2xl ml-2" icon={faCat} />
      {mode === "subscribe" ? "Subscribe" : "Unsubscribe"}
    </Button>
  );
}

export function SubscriptionForm({
  mode = "subscribe",
  initialEmail,
  ...props
}: SubscriptionFormProps) {
  const initialState: FormState = {
    success: false,
    error: "",
  };
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
          defaultValue={initialEmail}
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
      </div>
      {state.error && (
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>Opps, we encountered an issue</AlertTitle>
          <AlertDescription>
            <p>{state.error}.</p>
          </AlertDescription>
        </Alert>
      )}
      {state.success && (
        <Alert>
          <CheckCircle2Icon />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>
            You have successfully{" "}
            {mode === "subscribe" ? "subscribed 🥳" : "unsubscribed."}
          </AlertDescription>
        </Alert>
      )}
    </>
  );
}
