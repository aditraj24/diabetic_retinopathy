import mongoose, { Schema } from "mongoose";

export interface IUser {
  _id: mongoose.Types.ObjectId;
  username: string;
  passwordHash: string;
  displayName: string;
  createdAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true, trim: true },
    passwordHash: { type: String, required: true },
    displayName: { type: String, default: function(this: IUser) { return this.username; } },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: false
  }
);

export const UserModel: mongoose.Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
