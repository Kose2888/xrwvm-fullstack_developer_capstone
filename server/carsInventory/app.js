const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 3050;
const mongoURL = process.env.MONGO_URL || "mongodb://cars-inventory-db:27017/";

app.use(cors());
app.use(express.urlencoded({ extended: false }));

const carsData = JSON.parse(fs.readFileSync('car_records.json', 'utf8'));

mongoose.connect(mongoURL, { dbName: 'dealershipsDB' })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));


const Cars = require('./inventory');

try {

    Cars.deleteMany({}).then(() => {
        Cars.insertMany(carsData.cars);
    });
} catch (error) {
    console.error(error);
    // Handle errors properly here
}

app.get('/', async (req, res) => {
    res.send('Welcome to the Mongoose API');
});



app.get('/cars/:id', async (req, res) => {
    try {
        const documents = await Cars.find({ dealer_id: req.params.id });
        res.json(documents);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching reviews' });
    }
});

app.get('/carsbymake/:id/:make', async (req, res) => {
    try {
        const documents = await Cars.find({ dealer_id: req.params.id, make: req.params.make });
        res.json(documents);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching reviews by car make and model' });
    }
});

app.get('/carsbymodel/:id/:model', async (req, res) => {
    try {
        const documents = await Cars.find({ dealer_id: req.params.id, model: req.params.model });
        res.json(documents);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching dealers by ID' });
    }
});

app.get('/carsbymaxmileage/:id/:mileage', async (req, res) => {
    try {
        let mileage = parseInt(req.params.mileage);
        let condition = {};
        condition = { $lte: mileage };
        const documents = await Cars.find({ dealer_id: req.params.id, mileage: condition });
        res.json(documents);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching dealers by ID' });
    }
});


app.get('/carsbyprice/:id/:price', async (req, res) => {
    try {
        const dealerId = parseInt(req.params.id);
        const price = parseInt(req.params.price);

        if (Number.isNaN(dealerId) || Number.isNaN(price)) {
            return res.status(400).json({ error: 'Invalid dealer ID or price' });
        }

        let condition = {};
        if (price === 20000) {
            condition = { $lte: price };
        } else if (price === 40000) {
            condition = { $lte: price, $gt: 20000 };
        } else if (price === 60000) {
            condition = { $lte: price, $gt: 40000 };
        } else if (price === 80000) {
            condition = { $lte: price, $gt: 60000 };
        } else if (price > 80000) {
            condition = { $gt: 80000 };
        } else {
            condition = { $lte: price };
        }

        const documents = await Cars.find({ dealer_id: dealerId, price: condition });
        res.json(documents);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching dealers by ID' });
    }
});



app.get('/carsbyyear/:id/:year', async (req, res) => {
    try {
        const documents = await Cars.find({ dealer_id: req.params.id, year: { $gte: req.params.year } });
        res.json(documents);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching dealers by ID' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
