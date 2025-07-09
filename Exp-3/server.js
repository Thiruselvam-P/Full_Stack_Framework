const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const multer = require("multer");
const Student = require("./student");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ► serve static assets
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ► MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected to Compass"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ► Multer setup (image uploads)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// ────────────────────────────────────────────────────────────
// CRUD ROUTES
// ────────────────────────────────────────────────────────────

// 1) CREATE  ─ POST /api/students
app.post("/api/students", upload.single("image"), async (req, res) => {
  try {
    const studentData = JSON.parse(req.body.data);
    if (req.file) studentData.image = req.file.filename; // save filename only
    const student = new Student(studentData);
    await student.save();
    res.status(201).json(student); // return created doc (includes _id)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2) READ‑ALL ─ GET /api/students
app.get("/api/students", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// 3) READ‑ONE ─ GET /api/students/:id   ← NEW ROUTE
app.get("/api/students/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(400).json({ error: "Invalid ID" });
  }
});

// 4) UPDATE   ─ PUT /api/students/:id
app.put("/api/students/:id", async (req, res) => {
  const updated = await Student.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

// 5) DELETE   ─ DELETE /api/students/:id
app.delete("/api/students/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Student deleted" });
});

// ────────────────────────────────────────────────────────────
// Start server
// ────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);
