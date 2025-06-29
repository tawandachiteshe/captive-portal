
export async function POST(req: Request) {

  const json = await req.json();

  const {
    uamip,
    uamport,
    challenge,
    called,
    mac,
    ip,
    url,
    username,
    password,
  } = json;

  console.log(json)

  // TODO: Add your real authentication logic here (DB, vouchers, etc.)
  // For demo, accept everyone


  // After successful login, redirect user to any page you want
  const redirectAfterLogin = "http://www.google.com";

  // Build Coova-Chilli logon URL to grant access
  const logonUrl = `http://${uamip}:${uamport}/logon?challenge=${challenge}&called=${called}&mac=${mac}&ip=${ip}&url=${url}&username=${username}&password=${password}&redirurl=${encodeURIComponent(
    redirectAfterLogin
  )}`;

  return new Response(JSON.stringify({ redirectUrl: logonUrl }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
