import type { Config, Context } from "@netlify/functions";

const json = (data: unknown, status = 200) =>
  Response.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store"
    }
  });

export default async (req: Request, context: Context) => {
  const resource = context.params.resource || "health";

  if (resource === "health") {
    return json({
      ok: true,
      service: "company-order-system",
      storage: "Connect Netlify Database/Postgres using db/schema.sql"
    });
  }

  if (req.method === "GET") {
    return json({
      resource,
      items: [],
      message: "API contract is ready. Wire this route to Netlify Database/Postgres in production."
    });
  }

  if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) {
    return json({
      resource,
      accepted: true,
      message: "Mutation endpoint placeholder. Frontend currently uses local demo storage."
    });
  }

  return new Response("Method not allowed", { status: 405 });
};

export const config: Config = {
  path: "/api/:resource"
};
