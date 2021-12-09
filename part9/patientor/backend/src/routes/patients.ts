/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientsService from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientsService.getPatients());
});

router.post('/', (req, res) => {
    const { name, dateOfBirth, gender, ssn, occupation } = req.body;

    const newPatient = patientsService.addPatient({
        name,
        dateOfBirth,
        gender,
        ssn,
        occupation,
    });
    res.json(newPatient);
});
export default router;
