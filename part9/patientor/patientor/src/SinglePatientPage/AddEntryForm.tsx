import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';

import { TextField, NumberField } from '../AddPatientModal/FormField';
import { Entry } from '../types';

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
export type EntryFormValues = Omit<Entry, 'id'>;

interface Props {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
}

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
    return (
        <Formik
            initialValues={{
                type: 'HealthCheck',
                description: '',
                date: '',
                specialist: '',
                healthCheckRating: 0,
            }}
            onSubmit={onSubmit}
        >
            {({ dirty, isValid }) => {
                return (
                    <Form className='form ui'>
                        <Field
                            label='Description'
                            name='description'
                            placeholder='description'
                            component={TextField}
                        />
                        <Field
                            label='Date'
                            name='date'
                            placeholder='yyyy-mm-dd'
                            component={TextField}
                        />
                        <Field
                            label='Specialist'
                            name='specialist'
                            placeholder='specialist'
                            component={TextField}
                        />
                        <Field
                            label='Healthcheckrating'
                            name='healthCheckRating'
                            placeholder='rating'
                            component={NumberField}
                        />
                        <Grid>
                            <Grid.Column floated='left' width={5}>
                                <Button
                                    type='button'
                                    onClick={onCancel}
                                    color='red'
                                >
                                    Cancel
                                </Button>
                            </Grid.Column>
                            <Grid.Column floated='right' width={5}>
                                <Button
                                    type='submit'
                                    floated='right'
                                    color='green'
                                    disabled={!dirty || !isValid}
                                >
                                    Add
                                </Button>
                            </Grid.Column>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AddEntryForm;
