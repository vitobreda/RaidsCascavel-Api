import * as mongoose from "mongoose";

export interface Gym extends mongoose.Document {
  description: string;
  coordinates: string;
  ex: Boolean;
  type: string;
}

const gymSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  coordinates: {
    type: String,
    required: true,
  },
  ex: {
    type: Boolean,
    required: true,
  },
  type: {
    type: String,
  },
});

export const Gym = mongoose.model<Gym>("Gym", gymSchema);
