export const fetchData = async (
  method: "GET" | "POST" | "PUT" | "DELETE",
  path: string,
  body?: object
) => {
  const options = {
    method,
    credentials: "include" as RequestCredentials,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
  try {
    const res = await fetch(process.env.API_URL + path, options);
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
