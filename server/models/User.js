import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { 
    type: String, 
    required: function () { return this.isNew; }  // ✅ sirf create ke time required
  },
  role: { type: String, enum: ["admin", "staff"], default: "staff" }
});

const User = mongoose.model("User", userSchema);

export default User;
