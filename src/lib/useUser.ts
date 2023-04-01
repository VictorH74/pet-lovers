import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";
import { User } from "@prisma/client";

export default function useUser({
  redirectTo = "",
  redirectIfFound = false,
} = {}) {
  const { data: user, mutate: mutateUser } = useSWR<User>("/api/users/me");

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !user) return;
    Router.push(redirectTo);
  }, [user, redirectIfFound, redirectTo]);

  return { user, mutateUser };
}
