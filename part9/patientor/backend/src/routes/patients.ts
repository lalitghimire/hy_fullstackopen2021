/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientsService.getPatients());
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const singlePatient = patientsService.getPatientById(id);
    if (singlePatient) {
        return res.send(singlePatient);
    } else {
        return res.status(404).send({ error: 'Patient not found' });
    }
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

router.post('/:id/entries', (req, res) => {
    const patientId = req.params.id;
    try {
        const newEntry = req.body;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const addedEntry = patientsService.addEntry(newEntry, patientId);
        res.send(addedEntry);
    } catch (error) {
        res.status(400).send(error);
    }
});

export default router;
