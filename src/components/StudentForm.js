import React, { useEffect } from 'react';
import { Button, Card, Form as BoostrapForm } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { clsx } from 'clsx';
import moment from 'moment';
import { studentValidatorSchema } from '../validators/student.validator';

const defaultValuesData = {
  fullName: '',
  age: null,
  dateOfBirth: null,
  dateOfInscription: null,
  cost: null,
}

export const StudentForm = ({ onSubmit, defaultValues }) => {
  
  const { handleSubmit, register, reset, formState: { errors } } = useForm({
    defaultValues: defaultValuesData,
    resolver: yupResolver(studentValidatorSchema)
  });

  useEffect(() => {
    if(defaultValues) {
      reset({
        fullName: defaultValues.fullName,
        age: defaultValues.age,
        dateOfBirth: defaultValues.dateOfBirth,
        dateOfInscription: defaultValues.dateOfInscription,
        cost: defaultValues.cost,
      })
    } else reset(defaultValues);
  }, [defaultValues, reset])

  const handleOnSubmit = (data) => {
    onSubmit({
      fullName: data.fullName,
      age: +data.age,
      dateOfBirth: moment(data.dateOfBirth).format('YYYY-MM-DD'),
      dateOfInscription: moment(data.dateOfInscription).format('YYYY-MM-DD'),
      cost: +data.cost,
    })
  }

  return (
    <Card>
      <Card.Header>
        <Card.Title>
          Student Form
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <BoostrapForm onSubmit={handleSubmit(handleOnSubmit)}>
          <BoostrapForm.Group className="mb-3">
            <BoostrapForm.Label>Fullname</BoostrapForm.Label>
            <BoostrapForm.Control
               {...register('fullName')}  
               className={clsx({
                'is-invalid': !!errors.fullName
               })}  
            />
            <BoostrapForm.Control.Feedback type="invalid">
              {errors.fullName?.message}
            </BoostrapForm.Control.Feedback>
          </BoostrapForm.Group>
          <BoostrapForm.Group className="mb-3">
            <BoostrapForm.Label>Age</BoostrapForm.Label>
            <BoostrapForm.Control 
              type="number" 
              className={clsx({
                'is-invalid': !!errors.age
              })}
              {...register('age')} 
            />
            <BoostrapForm.Control.Feedback type="invalid">
              {errors.age?.message}
            </BoostrapForm.Control.Feedback>
          </BoostrapForm.Group>
          <BoostrapForm.Group className="mb-3">
            <BoostrapForm.Label>Date of birth</BoostrapForm.Label>
            <BoostrapForm.Control 
              type="date" 
              className={clsx({
                'is-invalid': !!errors.dateOfBirth
              })}
              {...register('dateOfBirth')} 
            />
            <BoostrapForm.Control.Feedback type="invalid">
              {errors.dateOfBirth?.message}
            </BoostrapForm.Control.Feedback>
          </BoostrapForm.Group>
          <BoostrapForm.Group className="mb-3">
            <BoostrapForm.Label>Date of inscription</BoostrapForm.Label>
            <BoostrapForm.Control 
              type="date" 
              className={clsx({
                'is-invalid': !!errors.dateOfInscription
              })}
              {...register('dateOfInscription')} 
            />
            <BoostrapForm.Control.Feedback type="invalid">
              {errors.dateOfInscription?.message}
            </BoostrapForm.Control.Feedback>
          </BoostrapForm.Group>
          <BoostrapForm.Group className="mb-3">
            <BoostrapForm.Label>Cost</BoostrapForm.Label>
            <BoostrapForm.Control 
              type="number" 
              className={clsx({
                'is-invalid': !!errors.cost
              })}
              {...register('cost')} 
            />
            <BoostrapForm.Control.Feedback type="invalid">
              {errors.cost?.message}
            </BoostrapForm.Control.Feedback>
          </BoostrapForm.Group>
          <div className="d-flex justify-content-end mt-3">
            <Button type="submit">
              Submit
            </Button>
          </div>
        </BoostrapForm>
      </Card.Body>
    </Card>
  );
};