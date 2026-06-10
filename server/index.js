// server/index.js
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL }))
app.use(express.json())

// Health check — visit http://localhost:4000/health to confirm server is running
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Reggs API is running' })
})

// Contact form route
app.post('/api/contact', async (req, res) => {
    const { name, email, subject, message } = req.body

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Name, email and message are required' })
    }

    // Email sending will be added here in the next stage
    console.log('Contact form submission:', { name, email, subject })
    res.json({ success: true, message: 'Message received' })
})

// Basic root route to confirm server is running
app.get('/', (req, res) => {
    res.send('Reggs API is running successfully!');
});
    
app.listen(PORT, () => {
    console.log(`Reggs API running on http://localhost:${PORT}`)
})