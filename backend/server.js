// ✅ Import dependencies
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';

// ✅ Initialize app
const app = express();
const PORT = 3000;

// ✅ Middleware
app.use(cors());
app.use(bodyParser.json());

// ✅ Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://asatyajawahar_db_user:feedbackform%4012004@feedbackform.uahsxlm.mongodb.net/')
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Define Schema
const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNumber: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true }
});

// ✅ Create Model
const Feedback = mongoose.model('Feedback', feedbackSchema);

// ✅ POST route to save feedback
app.post('/api/feedback', async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    const savedFeedback = await feedback.save();

    console.log('✅ Feedback saved:', savedFeedback);

    res.status(200).json({ message: 'Feedback saved successfully!', data: savedFeedback });
  } catch (err) {
    console.error('❌ Error saving feedback:', err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET route to fetch all feedbacks
app.get('/api/feedback', async (req, res) => {
  try {
    const allFeedback = await Feedback.find();
    res.status(200).json(allFeedback);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/', async (req, res) => {
  console.log(`🚀 Server running on render`);
});


// ✅ Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
