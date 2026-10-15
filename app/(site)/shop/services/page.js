import { redirect } from "next/navigation";
// Healing services now live at the top of the main shop page
export default function ServicesRedirect() { redirect("/shop#healings"); }
