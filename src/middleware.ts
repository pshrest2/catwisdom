export { auth as middleware } from "@/auth";

export const config = {
  matcher: ["/api/cats/upload", "/cats/upload"],
};
