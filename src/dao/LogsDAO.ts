import { config } from "dotenv";
import { Log } from "../entities/Log";
import {
	addDoc,
	collection,
	getDocs,
} from "firebase/firestore";
import { FirebaseService } from "../service/firebaseDB";
import { createDebugger } from "../utils/debugConfig";
import {
	DaoResponse,
	ErrorControl,
	HttpStatusCode,
} from "../constants/ErrorControl";
import { Cache } from "../utils/cache";

config();

// logger config
const log = createDebugger("UserDAO");
const logError = log.extend("error");

const firebaseService = FirebaseService.getInstance();
const db = firebaseService.getFirestoreInstance();

export class LogsDAO {
	protected static async add(log_data: Log): Promise<DaoResponse> {
		try {
			// convert log to json
			const userTosave = log_data.toSaveJson();
			// save log
			const docRef = await addDoc(collection(db, Log.COLLECTION), userTosave);
			log("Document written with ID: %s", docRef.id);
			return [ErrorControl.SUCCESS, docRef.id, HttpStatusCode.Created];
		} catch (error) {
			const msg = "Error adding document";
			logError(msg + ": " + error);
			return [ErrorControl.ERROR, msg, HttpStatusCode.InternalServerError];
		}
	}

	protected static async getAll(): Promise<DaoResponse> {
		try {
			const querySnapshot = await getDocs(collection(db, Log.COLLECTION));
			const data = querySnapshot.docs.map((doc) => doc.data());
			Cache.set(Log.COLLECTION, data);
			return [ErrorControl.SUCCESS, data, HttpStatusCode.Ok];
		} catch (error) {
			const msg = "Error getting documents";
			logError(msg + ": " + error);
			return [ErrorControl.ERROR, msg, HttpStatusCode.InternalServerError];
		}
	}
}
