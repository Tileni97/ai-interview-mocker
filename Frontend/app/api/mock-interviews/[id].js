// pages/api/mock-interviews/[id].js
export default async function handler(req, res) {
  try {
    const token = await getToken();
    const response = await fetch(`${process.env.API_URL}/mock-interviews/${req.query.id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Error in mock-interviews API route:', error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
}