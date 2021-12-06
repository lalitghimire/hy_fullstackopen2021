import express = require('express');
import { calculateBmi, parseWebArguments } from './bmiCalculator';
import bodyParser = require('body-parser');
import { calculateExercise } from './exerciseCalculator';

const app = express();
app.use(bodyParser.json());

//hello end point(9.4)
app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack! ');
});

// endpoint for the query task(9.5)(redone for error handling)
app.get('/bmi', (req, res) => {
    const heightQuery = req.query.height;
    const weightQuery = req.query.weight;
    if (heightQuery && weightQuery) {
        try {
            const { height, weight } = parseWebArguments(
                heightQuery,
                weightQuery
            );
            const bmi = calculateBmi(height, weight);
            res.send({
                height: height,
                weight: weight,
                bmi: bmi,
            });
        } catch (error) {
            console.log('here is errorobject', Error);
            res.status(400);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            res.send({ error: 'Provided values were not numbers!' });
        }
    } else {
        res.send({
            error: 'parameter missing, provide both height and weight',
        });
    }
});

interface requestBody {
    daily_exercises: number[];
    target: number;
}
// endpoint for the query task(9.7)
app.post('/exercises', (req, res) => {
    console.log(req.body);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const body: requestBody = req.body;
    const daily_exercises = body.daily_exercises;
    const target = body.target;
    res.send(calculateExercise(target, daily_exercises));
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`);
});
