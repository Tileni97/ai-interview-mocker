// lib/auth.js
import { auth } from '@clerk/nextjs';

export async function getToken() {
  const { getToken } = auth();
  return getToken();
}