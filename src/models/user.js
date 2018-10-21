import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profileImageUrl: {
    type: String
  }
});

userSchema.pre("save", async function(next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    const hashedPass = await bcrypt.hash(this.password, 10);
    this.password = hashedPass;
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.method.comparePass = async function(candidatePass, next) {
  try {
    const isMatch = await bcrypt.compare(candidatePass, this.password);
    return isMatch;
  } catch (err) {
    return next(err);
  }
};

const User = mongoose.model("User", userSchema);

export default User;
