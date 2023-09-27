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
/**
 * Middleware function that logs incoming requests and sets response headers.
 * @param req - The incoming request object.
 * @param res - The server response object.
 * @param next - The next middleware function in the chain.
 */
export function loggerMiddleware(req: IncomingMessage, res: ServerResponse, next: () => void) {
  res.setHeader('X-Server-Name', `${__GIT_VERSION__}/${__BUILD_TIME__}`);
  res.setHeader(Header.ReqId, req.id as string);
  next();
}
