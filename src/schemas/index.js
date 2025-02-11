import * as yup from 'yup';

export const expenseSchema = yup.object().shape({
  text: yup.string().required('Name is required'),
  amount: yup
    .number()
    .typeError('Amount must be a number')
    .required('Amount is required'),
  category: yup.string().required('Category is required'),
});
