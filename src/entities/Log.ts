import { getDateTime } from "../utils/Time";

export class Log {
	public static readonly COLLECTION = "logs";

	creator?: string;
	message?: string;
	created_at?: Date;

	constructor(
		creator: string,
		message: string,
		created_at: Date
	) {
		this.creator = creator;
		this.message = message;
		this.created_at = created_at;
	}

	public static fromJson(json: any): Log {
		return new Log(
			json.creator,
			json.message,
			json.created_at
		)
	}

	public toSaveJson(): any {
		return {
			creator: this.creator,
			message: this.message,
			created_at: getDateTime(),
		};
	}

	public static fromJsonArray(jsonArray: any[]): Log[] {
		return jsonArray.map((json: any) => Log.fromJson(json));
	}
}
