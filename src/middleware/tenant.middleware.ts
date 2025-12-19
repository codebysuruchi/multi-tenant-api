import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const orgId = req.headers['x-organization-id'];
    if (!orgId) throw new Error('Organization ID missing');
    req['organizationId'] = Number(orgId);
    next();
  }
}
