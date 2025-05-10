import express from 'express';
import cors from 'cors';
import { downloadRouter } from './routes/download';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create downloads directory if it doesn't exist
const downloadsDir = path.join(process.cwd(), 'downloads');
import fs from 'fs';
if (!fs.existsSync(downloadsDir)) {
  fs.mkdirSync(downloadsDir, { recursive: true });
}

// Routes
app.use('/api/download', downloadRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'DownX API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`DownX API server running on port ${PORT}`);
});

export default app;
