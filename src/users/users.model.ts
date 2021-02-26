import * as mongoose from "mongoose";
import { validateCPF } from "../common/validators";
import * as bcrypt from "bcrypt";
import { environment } from "../common/environment";

export interface User extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  firebaseId: String;
  level: Number;
  team: String;
  friendCode: String;
  profiles: string[];
  matches(password: string): boolean;
  hasAny(...profiles: string[]): boolean;
}

export interface UserModel extends mongoose.Model<User> {
  findByEmail(email: string, projection?: string): Promise<User>;
  findByFirebaseId(firebaseId: string, projection?: string): Promise<User>;
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 80,
    minlength: 3,
  },
  email: {
    type: String,
    unique: true,
    match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    required: true,
  },
  password: {
    type: String,
    select: false,
    required: false,
  },
  firebaseId: {
    type: String,
    required: false,
  },
  level: {
    type: Number,
    min: 1,
    max: 50,
    required: false,
  },
  team: {
    type: String,
    enum: ["Valor", "Mystic", "Instinct"],
    required: false,
  },
  friendCode: {
    type: String,
    required: false,
  },
  profiles: {
    type: [String],
    required: false,
  },
});

userSchema.statics.findByEmail = function (email: string, projection: string) {
  return this.findOne({ email }, projection); //{email: email}
};

userSchema.statics.findByFirebaseId = function (
  firebaseId: string,
  projection: string
) {
  return this.findOne({ firebaseId }, projection); //{firebaseId: firebaseId}
};

userSchema.methods.matches = function (password: string): boolean {
  return bcrypt.compareSync(password, (<User>this).password);
};

userSchema.methods.hasAny = function (...profiles: string[]): boolean {
  return profiles.some(
    (profile) => (<User>this).profiles.indexOf(profile) !== -1
  );
};

const hashPassword = (obj, next) => {
  bcrypt
    .hash(obj.password, environment.security.saltRounds)
    .then((hash) => {
      obj.password = hash;
      next();
    })
    .catch(next);
};

const saveMiddleware = function (next) {
  const user: User = this;
  if (!user.isModified("password")) {
    next();
  } else {
    hashPassword(user, next);
  }
};

const updateMiddleware = function (next) {
  if (!this.getUpdate().password) {
    next();
  } else {
    hashPassword(this.getUpdate(), next);
  }
};

userSchema.pre("save", saveMiddleware);
userSchema.pre("findOneAndUpdate", updateMiddleware);
userSchema.pre("update", updateMiddleware);

export const User = mongoose.model<User, UserModel>("User", userSchema);
