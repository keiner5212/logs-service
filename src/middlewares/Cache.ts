import { Request, Response, NextFunction } from "express";
import { Cache } from "../utils/cache";
import { createDebugger } from "../utils/debugConfig";
import { HttpStatusCode } from "../constants/ErrorControl";

const middlewareDebugger = createDebugger("cache");

export const CheckCache = async (req: Request, res: Response, next: NextFunction) => {
	const cacheKey = req.method + req.originalUrl;
	const cachedData = Cache.get(cacheKey);
	if (cachedData) {
		middlewareDebugger(`Cache found for ${cacheKey}`);
		return res.status(HttpStatusCode.Ok).send(cachedData);
	} else {
		res.locals.cacheKey = cacheKey
		next();
	}
};
