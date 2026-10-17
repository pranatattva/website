import { redirect } from "next/navigation";
// Courses now live on the main schedule page
export default function ClassesRedirect() { redirect("/schedule#courses"); }
