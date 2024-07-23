import { createNextPageApiHandler } from "uploadthing/next-legacy";
import { ourFileRouter } from "./core";
import { getAuth } from "@clerk/nextjs/server";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = createNextPageApiHandler({
  router: ourFileRouter,
});

export default async function uploadthing(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Do something before the uploadthing handler runs
  const { userId } = getAuth(req);
  if (userId) {
    // add the userId to the body
    const body: any = req.body ? JSON.parse(req.body) : {};
    req.body = JSON.stringify({ ...body, userId });
  }
  await handler(req, res);
}
