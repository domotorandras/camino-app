import express from "express";
import cors from "cors";
import pool from "./db.js";

const app = express();

app.use(cors());
app.use(express.json());


app.get("/api/coordinates", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM coordinates ORDER BY id ASC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});


app.post("/api/coordinates", async (req, res) => {
  const { name, description, latitude, longitude } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO coordinates (name, description, latitude, longitude)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, description, latitude, longitude]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add coordinate" });
  }
});

app.put("/api/coordinates/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, latitude, longitude } = req.body;

  try {
    const result = await pool.query(
      `UPDATE coordinates
       SET name = $1, description = $2, latitude = $3, longitude = $4
       WHERE id = $5
       RETURNING *`,
      [name, description, latitude, longitude, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.delete("/api/coordinates/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM coordinates WHERE id=$1", [id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete coordinate" });
  }
});

const PORT = 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
