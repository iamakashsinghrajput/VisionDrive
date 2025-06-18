// middleware.ts

export { default } from "next-auth/middleware"

export const config = { 
  matcher: [
    "/cars", 
    "/bikes",
    // Add any other routes you want to protect here
  ] 
};