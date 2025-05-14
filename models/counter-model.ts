import mongoose, { Schema } from "mongoose";

const CounterSchema = new Schema({
  name: { type: String, required: true, unique: true },
  seq: { type: Number, default: 0 },
});

const Counter = mongoose.models.Counter || mongoose.model("Counter", CounterSchema);

export default Counter;
