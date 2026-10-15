import { redirect } from "next/navigation";
// Products now live on the main shop page
export default function ProductsRedirect() { redirect("/shop#products"); }
