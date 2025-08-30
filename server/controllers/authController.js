// controllers/userController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// 🔐 LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      role: user.role,
      name: user.name,
      redirect: user.role === "admin" ? "dashboard/admin" : "dashboard/staff",
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Register Error:", error); // ✅ Console me dikhega
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// 📤 GET ALL USERS
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// 📤 GET USER BY ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// ✏️ UPDATE USER
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    let updateData = { ...req.body };

    // ✅ Agar password empty hai to usko hata do (taaki validation error na aaye)
    if (!updateData.password) {
      delete updateData.password;
    } else {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "✅ User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Update User Error:", error);
    res.status(500).json({ message: "❌ Server Error", error: error.message });
  }
};

// 🗑 DELETE USER
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
