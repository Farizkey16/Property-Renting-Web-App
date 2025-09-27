import { Suspense } from "react";
import LoginForm from "@/components/pages/LoginForm";
import { Spinner } from "@/components/ui/shadcn-io/spinner";

export default function LoginPage() {
  return (

    <Suspense fallback={<LoadingSpinner />}>
      <LoginForm />
    </Suspense>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Spinner className="h-10 w-10" />
    </div>
  );
}
