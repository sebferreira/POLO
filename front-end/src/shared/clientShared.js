import Cookies from "js-cookie";

const handleCustomApiRequest = async ({
  url,
  method,
  body,
  isMultipart,
  withToken,
  isAuth2fa,
}) => {
  const cookie = Cookies.get();
  let headers = {
    "Access-Control-Allow-Origin": "https://poloweb.vercel.app",
    //"Access-Control-Allow-Origin": "http://localhost:5173",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    "Access-Control-Request-Headers": "Content-Type",
    "Access-Control-Request-Method": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  };
  if (!isMultipart) {
    headers["Content-Type"] = "application/json";
    body = body ? JSON.stringify(body) : undefined;
  }
  if (withToken) {
    if (!isAuth2fa) {
      const Authorization = `Bearer ${cookie.token}`;
      headers = {...headers, Authorization};
    } else {
      const Authorization = `Bearer ${cookie.userRegistered}`;
      headers = {...headers, Authorization};
    }
  }

  const fetching = await fetch(url, {
      method,
      headers,
      credentials: "include",
      body: body,
    }),
    petition = await fetching.json();
  return petition;
};

export {handleCustomApiRequest};
