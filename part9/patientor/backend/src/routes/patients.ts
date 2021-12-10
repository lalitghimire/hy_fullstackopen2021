/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientsService.getPatients());
});

router.post('/', (req, res) => {
    //const { name, dateOfBirth, gender, ssn, occupation } = req.body;
    try {
        const newPatientEntry = toNewPatientEntry(req.body);
        const newPatient = patientsService.addPatient(newPatientEntry);
        res.json(newPatient);
    } catch (error: unknown) {
        let errorMessage = 'Something went Wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
export default router;
