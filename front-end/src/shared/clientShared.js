const handleCustomApiRequest = async ({url, method, body}) => {
  const fetching = await fetch(url, {
      method,
      headers: {"Content-Type": "application/json"},
      credentials: "include",
      body: body ? JSON.stringify(body) : undefined,
    }),
    petition = await fetching.json();

  return petition;
};

export {handleCustomApiRequest};
