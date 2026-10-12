import HealerProfile from "@/components/HealerProfile";
import { healers } from "@/lib/site";

const healer = healers[1];
export const metadata = { title: healer.name, description: `${healer.name}, ${healer.role} at Pranatattva, Baner, Pune.` };

export default function Page() {
  return <HealerProfile healer={healer} />;
}
