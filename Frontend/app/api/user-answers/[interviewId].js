import { getToken } from '@/lib/auth';

export default async function handler(req, res) {
  const token = await getToken();

  if (req.method === 'GET') {
    const { interviewId } = req.query;
    const response = await fetch(`${process.env.API_URL}/user-answers/${interviewId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}