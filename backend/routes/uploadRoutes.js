const express = require("express");
const multer = require("multer");
const csvParser = require("csv-parser");
const xlsx = require("xlsx");
const fs = require("fs");
const { UserModel, AgentModel, TaskModel } = require("../config/db"); // Ensure these are correctly exported



const router = express.Router();

// Multer setup for file upload
const upload = multer({ dest: "uploads/" });

// File upload API
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Validate file type
    const allowedExtensions = ["csv", "xlsx", "xls"];
    const fileExtension = file.originalname.split(".").pop();
    if (!allowedExtensions.includes(fileExtension)) {
      return res.status(400).json({ message: "Invalid file type" });
    }

    let records = [];

    if (fileExtension === "csv") {
      // Parse CSV
      fs.createReadStream(file.path)
        .pipe(csvParser())
        .on("data", (row) => {
          records.push(row);
        })
        .on("end", async () => {
          await distributeTasks(records);
          res.status(200).json({ message: "File processed successfully" });
        });
    } else {
      // Parse XLSX or XLS
      const workbook = xlsx.readFile(file.path);
      const sheetName = workbook.SheetNames[0];
      records = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
      await distributeTasks(records);
      res.status(200).json({ message: "File processed successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Function to distribute tasks equally
async function distributeTasks(records) {
  const agents = await AgentModel.find(); // Use AgentModel correctly
  if (agents.length === 0) {
    throw new Error("No agents found");
  }

  const numAgents = agents.length;


  for (let index = 0; index < records.length; index++) {
    const record = records[index];
    const agent = agents[index % numAgents]; // Assign tasks round-robin

    const task = new TaskModel({
      FirstName: record.FirstName,
      phone: record.Phone,
      notes: record.Notes,
      assignedTo: agent._id
    });

    await task.save();

    // Update agent's task list
    agent.tasks.push(task._id);
    await agent.save();
  };
}

module.exports = router;
