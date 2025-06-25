import { Request, Response, Router } from "express";
import { ErrorControl } from "../constants/ErrorControl";
import { CheckCache } from "../middlewares/Cache";
import { LogsDAO } from "../dao/LogsDAO";
import { Log } from "../entities/Log";
import { Cache } from "../utils/cache";

export class LogsController extends LogsDAO {
	private router: Router;

	constructor() {
		super();
		this.router = Router();
	}

	public routes(): Router {
		// add
		this.router.post(
			"/",
			async (req: Request, res: Response) => {
				const log = Log.fromJson(req.body);
				const data = await LogsDAO.add(log);
				if (data[0] == ErrorControl.SUCCESS) {
					return res
						.status(data[2])
						.send("log created successfully: " + data[1]);
				}
				return res.status(data[2]).send(data[1]);
			}
		);

		// get all
		this.router.get(
			"/",
			CheckCache,
			async (req: Request, res: Response) => {
				const data = await LogsDAO.getAll();
				if (data[0] == ErrorControl.SUCCESS) {
					Cache.set(res.locals.cacheKey, data[1]);
					return res.status(data[2]).send(data[1]);
				}
				return res.status(data[2]).send(data[1]);
			}
		);

		return this.router;
	}
}
