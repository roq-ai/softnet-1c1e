import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { brandalyzerValidationSchema } from 'validationSchema/brandalyzers';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getBrandalyzers();
    case 'POST':
      return createBrandalyzer();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getBrandalyzers() {
    const data = await prisma.brandalyzer
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'brandalyzer'));
    return res.status(200).json(data);
  }

  async function createBrandalyzer() {
    await brandalyzerValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.brand_guideline?.length > 0) {
      const create_brand_guideline = body.brand_guideline;
      body.brand_guideline = {
        create: create_brand_guideline,
      };
    } else {
      delete body.brand_guideline;
    }
    if (body?.invitation?.length > 0) {
      const create_invitation = body.invitation;
      body.invitation = {
        create: create_invitation,
      };
    } else {
      delete body.invitation;
    }
    const data = await prisma.brandalyzer.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
