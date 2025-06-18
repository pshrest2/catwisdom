import * as React from "react";

type Props = {
  wisdom: string;
  email: string;
};

export function EmailTemplate({ wisdom, email }: Props) {
  return (
    <div
      style={{
        maxWidth: "500px",
        textAlign: "left",
      }}
    >
      <div style={{ marginBottom: "24px" }}>
        <a href={process.env.NEXT_PUBLIC_APP_URL} style={{ display: "flex" }}>
          <img
            src={`${process.env.NEXT_PUBLIC_APP_URL}/images/logo.png`}
            alt="Cat Wisdom Logo"
            style={{
              width: "60px",
              height: "60px",
            }}
          />
        </a>
        <h1>Cat Wisdom</h1>
      </div>

      <p
        style={{
          marginBottom: "16px",
          fontSize: "16px",
          lineHeight: "1.5",
        }}
      >
        <p>Hello,</p>

        <p>Your daily dose of cat wisdom is ready ✨</p>
        {wisdom}
      </p>
      <p style={{ marginBottom: "32px", fontSize: "16px" }}>
        Have a purrfect day 😽
      </p>
      <footer
        style={{
          fontSize: "14px",
          color: "#666666",
          borderTop: "1px solid #e5e5e5",
          paddingTop: "16px",
        }}
      >
        <p style={{ margin: "0" }}>
          © {new Date().getFullYear()} Cat Wisdom. Made with love by your
          master.{" "}
          <a
            href={`${process.env.NEXT_PUBLIC_APP_URL}/unsubscribe?email=${encodeURIComponent(email)}`}
            style={{
              color: "#0070f3",
              textDecoration: "underline",
            }}
          >
            Unsubscribe
          </a>
        </p>
      </footer>
    </div>
  );
}
