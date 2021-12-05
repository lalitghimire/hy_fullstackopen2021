import express = require('express');
import { calculateBmi } from './bmiCalculator';

const app = express();

//hello end point
app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack! ');
});

// endpoint for the query exercise
app.get('/bmi', (_req, res) => {
    let heightQuery = _req.query.height;
    let weightQuery = _req.query.weight;

    const bmi = calculateBmi(Number(heightQuery), Number(weightQuery));

    res.send({
        height: heightQuery,
        weight: weightQuery,
        bmi: bmi,
    });
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`);
});
