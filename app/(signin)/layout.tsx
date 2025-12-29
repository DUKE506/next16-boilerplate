import { DarkModeButton } from "@/components/features/theme/darkmode-button";
import { ProfileBox } from "@/components/features/user/profile-box";
import { SessionProvider } from "next-auth/react";

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <div className="relative h-full">
        <ProfileBox />
        {children}
        <DarkModeButton />
      </div>
    </SessionProvider>
  );
}
