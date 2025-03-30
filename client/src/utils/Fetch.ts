interface FetchOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: unknown[];
}

export default async function Fetch(
  url: string,
  { method = "GET", headers = {}, body }: FetchOptions = {}
) {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.warn("Fetch error:", error);
  }
}
