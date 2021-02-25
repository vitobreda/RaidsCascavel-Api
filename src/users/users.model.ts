import * as mongoose from "mongoose";
<<<<<<< HEAD
=======
import { validateCPF } from "../common/validators";
>>>>>>> origin/back_to_begin
import * as bcrypt from "bcrypt";
import { environment } from "../common/environment";

export interface User extends mongoose.Document {
  name: string;
  email: string;
  password: string;
<<<<<<< HEAD
=======
  cpf: string;
>>>>>>> origin/back_to_begin
  gender: string;
  profiles: string[];
  matches(password: string): boolean;
  hasAny(...profiles: string[]): boolean;
}

export interface UserModel extends mongoose.Model<User> {
  findByEmail(email: string, projection?: string): Promise<User>;
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
    required: true,
  },
  gender: {
    type: String,
    required: false,
    enum: ["Male", "Female"],
  },
  profiles: {
    type: [String],
    required: false,
<<<<<<< HEAD
  },
  level: {
    type: Number,
    min: 1,
    max: 40,
    required: true,
  },
  nickname: {
    type: String,
  },
  friendscode: {
    type: String,
  },
  team: {
    type: String,
    enum: ["Mystic", "Valor", "Instinct"],
=======
    validate: {
      validator: validateCPF,
      message: "{PATH}: Invalid CPF ({VALUE})",
    },
  },
  profiles: {
    type: [String],
    required: false,
>>>>>>> origin/back_to_begin
  },
});

userSchema.statics.findByEmail = function (email: string, projection: string) {
  return this.findOne({ email }, projection); //{email: email}
};

userSchema.methods.matches = function (password: string): boolean {
<<<<<<< HEAD
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.hasAny = function (...profiles: string[]): boolean {
  return profiles.some((profile) => this.profiles.indexOf(profile) !== -1);
=======
  return bcrypt.compareSync(password, (<User>this).password);
};

userSchema.methods.hasAny = function (...profiles: string[]): boolean {
  return profiles.some(
    (profile) => (<User>this).profiles.indexOf(profile) !== -1
  );
>>>>>>> origin/back_to_begin
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
