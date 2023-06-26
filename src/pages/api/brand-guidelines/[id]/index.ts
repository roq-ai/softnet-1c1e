import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { brandGuidelineValidationSchema } from 'validationSchema/brand-guidelines';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.brand_guideline
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getBrandGuidelineById();
    case 'PUT':
      return updateBrandGuidelineById();
    case 'DELETE':
      return deleteBrandGuidelineById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getBrandGuidelineById() {
    const data = await prisma.brand_guideline.findFirst(convertQueryToPrismaUtil(req.query, 'brand_guideline'));
    return res.status(200).json(data);
  }

  async function updateBrandGuidelineById() {
    await brandGuidelineValidationSchema.validate(req.body);
    const data = await prisma.brand_guideline.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteBrandGuidelineById() {
    const data = await prisma.brand_guideline.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
