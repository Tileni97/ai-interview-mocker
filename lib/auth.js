import { useUser } from '@clerk/nextjs';

export function useAuthToken() {
  const { getToken } = useUser();
  return getToken;
}
