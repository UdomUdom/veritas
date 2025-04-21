import { app } from "./app";
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const url = new URL(`https://lambda.internal${event.path}`);

  if (event.queryStringParameters) {
    Object.entries(event.queryStringParameters).forEach(([key, value]) => {
      if (value) url.searchParams.append(key, value);
    });
  }

  const response = await app.handle(
    new Request(url.toString(), {
      method: event.httpMethod,
      headers: new Headers(event.headers as Record<string, string>),
      body: event.isBase64Encoded
        ? Buffer.from(event.body || "", "base64")
        : event.body,
    })
  );

  return {
    statusCode: response.status,
    headers: Object.fromEntries(response.headers.entries()),
    body: await response.text(),
  };
};
