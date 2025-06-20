"use client";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Home() {

  const router = useRouter()
  const { data: session } = authClient.useSession()

  async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login")
          toast.success('Signed out, you will be redirected...')
        },
      },
    });
  }

  return (
    <div className="text-2xl font-bold text-red-500">
      <h1>Hello World</h1>
      <ThemeToggle />

      {session ? <div>
        <p>{session.user?.name}</p>
        <Button onClick={signOut}>Logout</Button>
      </div>
        : <Button>Login</Button>}
    </div>
  );
}
