import { Link, createFileRoute, useRouter } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import authClient from "@/lib/auth-client";

export const Route = createFileRoute("/")({
  component: Home,
  loader: ({ context }) => {
    return { user: context.user };
  },
});

function Home() {
  const { queryClient } = Route.useRouteContext();
  const { user } = Route.useLoaderData();
  const router = useRouter();

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-10 p-2">
      <h1 className="text-3xl font-bold sm:text-4xl">Dirhamly</h1>

      {user ? (
        <div className="flex flex-col items-center gap-2">
          <p>Welcome back, {user.name}!</p>
          <Link to="/dashboard">Dashboard</Link>
          <Button
            onClick={async () => {
              await authClient.signOut();
              await queryClient.invalidateQueries({ queryKey: ["user"] });
              await router.invalidate();
            }}
            type="button"
            className="w-fit"
            variant="destructive"
            size="lg"
          >
            Sign out
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <p>You are not signed in.</p>
          <Button type="button" asChild className="w-fit" size="lg">
            <Link to="/login">Log in</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
