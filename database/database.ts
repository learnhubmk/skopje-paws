import {drizzle} from "drizzle-orm/node-postgres";
import {Pool} from "pg";
import {dbURL} from "../drizzle.config";

const pool = new Pool({connectionString: dbURL})

const db = drizzle(pool);

export {db};