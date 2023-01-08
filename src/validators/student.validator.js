import * as yup from 'yup';

export const studentValidatorSchema = yup.object({
  fullName: yup.string()
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
          'Name can only contain letters.'
      )
    .matches(/\b\w+\b(?:.*?\b\w+\b){1}/,'Please enter your full name.')
    .required(),
  age: yup.number()
    .min(18, 'You must be of legal age')
    .required(),
  dateOfBirth: yup.date()
    // .when(['age', (age, schema) =>  {
    //   return schema.date
    // }])
    .required(),
  dateOfInscription: yup.date().required(),
  cost: yup.number().required()
})