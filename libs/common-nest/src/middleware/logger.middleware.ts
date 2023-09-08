import { IncomingMessage, ServerResponse } from 'node:http';
import { Header } from '../enums/header.enum';

declare const __GIT_VERSION__: string;
declare const __BUILD_TIME__: number;

/**
 *
 * @param req
 * @param res
 * @param next
 */
export function loggerMiddleware(req: IncomingMessage, res: ServerResponse, next: () => void) {
  res.setHeader('X-Server-Name', `${__GIT_VERSION__}/${__BUILD_TIME__}`);
  res.setHeader(Header.ReqId, req.id as string);
  next();
}
