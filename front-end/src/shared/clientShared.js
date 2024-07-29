const handleCustomApiRequest = async ({url, method, body}) => {
  const fetching = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:5173",
    },
    credentials: "include",
    body: body ? JSON.stringify(body) : undefined,
  });
  const petition = await fetching.json();
  return petition;
};

export {handleCustomApiRequest};
