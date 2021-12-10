/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatientEntry, Gender } from './types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

// ------parse the input personal data-----
//name
const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }

    return name;
};

// date of birth
const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('Incorrect or missing date: ' + dateOfBirth);
    }
    return dateOfBirth;
};

//gender
// gender with Gender enum

const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): string => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender' + gender);
    }

    return gender;
};

//ssn
const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn' + ssn);
    }

    return ssn;
};

//occupation
const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation' + occupation);
    }

    return occupation;
};

const toNewPatientEntry = (object: any): NewPatientEntry => {
    const newPatientEntry: NewPatientEntry = {
        name: parseName(object.name),
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),
        gender: parseGender(object.gender),
        ssn: parseSsn(object.ssn),
        occupation: parseOccupation(object.occupation),
    };
    return newPatientEntry;
};

export default toNewPatientEntry;
