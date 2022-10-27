import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface JwtPayload {
  cpf: string;
}

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const authorization = req.header('Authorization')
      ? req.header('Authorization')
      : null;

    if (!authorization) {
      return res.status(401).end();
    }

    verify(
      authorization,
      process.env.JWT_SECRET,
      function (err, decoded: JwtPayload) {
        if (!decoded) {
          return res.status(401).end();
        }

        req.body.sender_cpf = decoded.cpf;
        next();
      },
    );
  }
}
