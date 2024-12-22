import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Setup __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors());

// Serve static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/employeeDashboard")
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define Employee Schema and Model
const employeeSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  department: { type: String, required: true },
  designation: { type: String, required: true },
  joiningDate: { type: Date, required: true },
  salary: { type: String, required: true },
  profileImage: { type: String, default: "" },
});

const Employee = mongoose.model("Employee", employeeSchema);

// Setup Multer for File Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, "uploads")),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    file.mimetype.startsWith("image/")
      ? cb(null, true)
      : cb(new Error("Only image files are allowed!"), false);
  },
});

// Helper to Generate Profile Placeholder
const generateProfilePlaceholder = (firstname, lastname) => {
  const initials = `${firstname[0]}${lastname[0]}`.toUpperCase();
  const colors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A6",
    "#A633FF",
    "#33FFF5",
  ];
  const bgColor = colors[Math.floor(Math.random() * colors.length)];
  return JSON.stringify({ initials, bgColor });
};

// POST endpoint for creating a new employee
app.post("/api/employees", upload.single("profileImage"), async (req, res) => {
  const {
    id,
    firstName,
    lastName,
    department,
    designation,
    joiningDate,
    salary,
    email,
  } = req.body;
  let profileImage = req.file ? req.file.path : null;

  try {
    const parsedJoiningDate = new Date(joiningDate);

    // Check if the date is valid
    if (isNaN(parsedJoiningDate)) {
      return res.status(400).json({ message: "Invalid joining date" });
    }

    const newEmployee = new Employee({
      id,
      firstName,
      lastName,
      department,
      designation,
      joiningDate: parsedJoiningDate,
      salary,
      email,
      profileImage,
    });

    await newEmployee.save();

    return res
      .status(201)
      .json({
        message: "Employee created successfully!",
        employee: newEmployee,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating employee" });
  }
});

// Get All Employees API
app.get("/api/employees", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching employees", error: error.message });
  }
});

// Get Employee by ID API
app.get("/api/employees/:id", async (req, res) => {
  try {
    const employee = await Employee.findOne({ id: req.params.id });
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });

    res.status(200).json(employee);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching employee", error: error.message });
  }
});

// Search Employees API
app.get("/api/employees/search", async (req, res) => {
  try {
    const { name, designation, department } = req.query;
    const query = {};
    if (name) {
      query.$or = [
        { firstname: { $regex: name, $options: "i" } },
        { lastname: { $regex: name, $options: "i" } },
      ];
    }
    if (designation) query.designation = { $regex: designation, $options: "i" };
    if (department) query.department = { $regex: department, $options: "i" };

    const employees = await Employee.find(query);
    res.status(200).json(employees);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error searching employees", error: error.message });
  }
});

// Update Employee API
app.put("/api/employees/:id", async (req, res) => {
  try {
    const updatedEmployee = await Employee.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedEmployee)
      return res.status(404).json({ message: "Employee not found" });

    res
      .status(200)
      .json({ message: "Employee updated successfully!", updatedEmployee });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating employee", error: error.message });
  }
});

// Delete Employee API
app.delete("/api/employees/:id", async (req, res) => {
  try {
    const deletedEmployee = await Employee.findOneAndDelete({
      id: req.params.id,
    });
    if (!deletedEmployee)
      return res.status(404).json({ message: "Employee not found" });

    res.status(200).json({ message: "Employee deleted successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting employee", error: error.message });
  }
});

// Start Server
const PORT = 4000;
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
