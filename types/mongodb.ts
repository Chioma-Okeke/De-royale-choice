import { Mongoose } from "mongoose";

export type MongooseCache = {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
};