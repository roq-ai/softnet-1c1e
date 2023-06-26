import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { brandalyzerValidationSchema } from 'validationSchema/brandalyzers';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.brandalyzer
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getBrandalyzerById();
    case 'PUT':
      return updateBrandalyzerById();
    case 'DELETE':
      return deleteBrandalyzerById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getBrandalyzerById() {
    const data = await prisma.brandalyzer.findFirst(convertQueryToPrismaUtil(req.query, 'brandalyzer'));
    return res.status(200).json(data);
  }

  async function updateBrandalyzerById() {
    await brandalyzerValidationSchema.validate(req.body);
    const data = await prisma.brandalyzer.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    if (req.body.name) {
      await roqClient.asUser(roqUserId).updateTenant({ id: user.tenantId, tenant: { name: req.body.name } });
    }
    return res.status(200).json(data);
  }
  async function deleteBrandalyzerById() {
    const data = await prisma.brandalyzer.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
