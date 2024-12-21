import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url"; // Required for handling __dirname in ES modules

// Define __dirname in ES module context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors());

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/employeeDashboard")
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.error("Connection error", err));

// Employee schema
const employeeSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  department: { type: String, required: true },
  designation: { type: String, required: true },
  joiningDate: { type: String, required: true },
  salary: { type: String, required: true },
  profileImage: { type: String, default: "" },
});

const Employee = mongoose.model("Employee", employeeSchema);

// Setup multer for file uploads
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads")); // Use absolute path for the uploads directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const upload = multer({ storage, fileFilter });

// Create / Add API with file upload
app.post("/api/employees", upload.single("profileImage"), async (req, res) => {
  try {
    const { id, name, email, department, designation, joiningDate, salary } =
      req.body;

    const employee = new Employee({
      id,
      name,
      email,
      department,
      designation,
      joiningDate,
      salary,
      profileImage: req.file ? req.file.path : "",
    });

    await employee.save();
    res.status(201).json({ message: "Employee added successfully!", employee });
  } catch (error) {
    res.status(400).json({ message: "Error adding employee", error });
  }
});

// Read / Select All API
app.get("/api/employees", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employees", error });
  }
});

// Read / Select by ID API
app.get("/api/employees/:id", async (req, res) => {
  try {
    const employee = await Employee.findOne({ id: req.params.id });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employee", error });
  }
});

// Search API
app.get("/api/employees/search", async (req, res) => {
  try {
    const { name, designation, department } = req.query;
    const query = {};
    if (name) query.name = { $regex: name, $options: "i" };
    if (designation) query.designation = { $regex: designation, $options: "i" };
    if (department) query.department = { $regex: department, $options: "i" };

    const employees = await Employee.find(query);
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Error searching employees", error });
  }
});

// Update / Edit API
app.put("/api/employees/:id", async (req, res) => {
  try {
    const updatedEmployee = await Employee.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res
      .status(200)
      .json({ message: "Employee updated successfully!", updatedEmployee });
  } catch (error) {
    res.status(400).json({ message: "Error updating employee", error });
  }
});

// Delete / Remove API
app.delete("/api/employees/:id", async (req, res) => {
  try {
    const deletedEmployee = await Employee.findOneAndDelete({
      id: req.params.id,
    });
    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting employee", error });
  }
});

// Start the server
const PORT = 4000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
