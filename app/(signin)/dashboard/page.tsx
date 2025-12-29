import { auth } from "@/auth";
import { LogoutButton } from "@/components/features/auth/logout-button";

export default async function Page() {
  const session = await auth();

  return <div>대시보드화면</div>;
}
