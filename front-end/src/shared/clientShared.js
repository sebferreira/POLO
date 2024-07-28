const handleCustomApiRequest = async ({url, method, body}) => {
  console.log(url, method);
  console.log(JSON.stringify(body));
  const fetching = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "https://poloweb.vercel.app",
    },
    credentials: "include",
    body: body ? JSON.stringify(body) : undefined,
  });
  const petition = await fetching.json();
  return petition;
};

export {handleCustomApiRequest};
