import moment from 'moment';
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
    .test({
      name: 'equals',
      exclusive: false,
      params: {},
      message: 'the date does not match the age',
      test: function(val) {
        const diffYears = moment().diff(moment(val), 'years');
        return diffYears === this.parent.age;
      }
    })
    .required(),
  dateOfInscription: yup.date().required(),
  cost: yup.number()
    .test({
      name: 'equals',
      exclusive: false,
      params: {},
      message: 'the date does not match the cost',
      test: function(val) {
        const diffYears = moment().diff(moment(this.parent.dateOfInscription), 'years');
        console.log('val', val)
        console.log('diffYears', diffYears);
        return diffYears * 100 === +val;
      }
    })
    .required()
})