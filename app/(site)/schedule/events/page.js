import { redirect } from "next/navigation";
// Events now live on the main schedule page
export default function EventsRedirect() { redirect("/schedule#events"); }
