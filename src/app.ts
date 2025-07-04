import cors from "cors";
import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import { LogsController } from "./controllers/LogsController";
import compression from "compression";

export class App {
	private app: Application;
	private prefix = "/api/v1";
	private numRequest = 0;

	constructor() {
		this.app = express();
	}

	private configuation() {
		// CONFIG
		this.app.disable("x-powered-by");
	}

	private midlewares() {
		// MIDDLEWARE
		this.app.use(cors());
		this.app.use(express.json({ limit: '50mb' }));
		morgan.token("date", () => {
			const date = new Date();
			return `[${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()} ${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}.${date.getUTCMilliseconds()}]`;
		});
		morgan.token("requests", () => `${++this.numRequest}`);
		const format = "\n#:requests\tt::date\tm::method\trt::response-time ms\np::url\ts::status\tb::res[content-length]\n";
		this.app.use(morgan(format));
		this.app.use(compression());
	}

	private generalRoutes() {
		// ROUTES
		this.app.get("/", async (req: Request, res: Response) => {
			res.json({
				message: "Welcome to the App",
			});
		});
	}

	private controllerRoutes() {
		// Controllers ROUTES
		this.app.use(this.prefix + "/logs", new LogsController().routes());

	}

	private NotFound() {
		// 404 PAGE
		this.app.use((req: Request, res: Response) => {
			res.status(404).send("Page not found");
		});
	}

	public config(): Application {
		this.configuation();
		this.midlewares();
		this.generalRoutes();
		this.controllerRoutes();
		this.NotFound();

		return this.app;
	}
}
