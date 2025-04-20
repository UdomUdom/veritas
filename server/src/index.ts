import { app } from "./app";
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const response = await app.handle(
    new Request(`https://lambda.internal${event.path}`, {
      method: event.httpMethod,
      headers: event.headers as HeadersInit,
      body: event.body,
    })
  );

  return {
    statusCode: response.status,
    headers: Object.fromEntries(response.headers),
    body: await response.text(),
  };
};
