const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

app.post("/chat", async (req, res) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `तपाईं एक अनुभवी वैदिक ज्योतिषी हुनुहुन्छ। प्रयोगकर्ताको विवरण: ${req.body.details}। प्रश्न: ${req.body.question}। कृपया नेपाली भाषामा गहिरो विश्लेषण दिनुहोस्।`;
        const result = await model.generateContent(prompt);
        res.json({ reply: result.response.text() });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

app.listen(process.env.PORT || 3000);
