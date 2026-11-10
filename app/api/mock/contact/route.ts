export async function POST() {
  return Response.json({ message: 'This demo form has been retired. Use the email link on the contact page; no message was sent.' }, { status: 410, headers: { 'Cache-Control': 'no-store' } });
}
