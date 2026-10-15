import { redirect } from "next/navigation";
// Classes now live on the main schedule page
export default function ClassesRedirect() { redirect("/schedule#classes"); }
