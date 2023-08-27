import { useFormik } from 'formik';
import * as Yup from "yup";
import Complete from './Complete';
import { useState } from 'react';

export default function Validate() {
  const [submitted, setSubmitted] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: '',
      cardnumber: '',
      month: '',
      year: '',
      cvc: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is Required'),
      cardnumber: Yup.string()
        .test('is-valid-card', 'Invalid Credit Card', value => {
          const strippedValue = value.replace(/\s/g, '');
          return /^\d{13,19}$/.test(strippedValue);
        })
        .required('Empty Field'),
      month: Yup.string()
        .min(2)
        .max(2)
        .test('month', 'Invalid expiry month', value => {
          const parsedMonth = parseInt(value, 10);
          return parsedMonth >= 1 && parsedMonth <= 12;
        })
        .required('Empty Field'),
      year: Yup.string()
        .min(2)
        .max(2)
        .test('year', 'Invalid expiry year', value => {
          const currentYear = new Date().getFullYear() % 100;
          const parsedYear = parseInt(value, 10);
          return parsedYear >= currentYear;
        })
        .required('Required'),
      cvc: Yup.string()
        .matches(/^\d{3,4}$/, 'Invalid CVC')
        .required('Empty field'),
    }),
    onSubmit: (values,  { resetForm }) => {
      setSubmitted(true)
      // Handle form submission here
      console.log(values);
      resetForm()
    },
  });

  const handleCardNumberChange = event => {
    const { value } = event.target;
    const formattedValue = formatCardNumber(value);
    formik.setFieldValue('cardnumber', formattedValue);
  };

  const formatCardNumber = cardNumber => {
    const strippedValue = cardNumber.replace(/\s/g, '');
    const spacedValue = strippedValue
      .match(/.{1,4}|.*/g)
      .join(' ');
    return spacedValue;
  };


  return (
    <div className='outer'>
      {submitted ? (<Complete />) : (
        <form onSubmit={formik.handleSubmit}>
          <div className={`name ${formik.errors.name ? 'invalid-input' : ''}`}>
            <p>CARDHOLDER NAME</p>
            <input
              id="cardholderName"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              type="text"
              autoComplete="off"
              placeholder="e.g. John Doe"
            />
            <p>{formik.errors.name}</p>
          </div>
          <div className={`number ${formik.errors.cardnumber ? 'invalid-input' : ''}`}>
            <p>CARD NUMBER</p>
            <input
              id="cardnumber"
              name="cardnumber"
              value={formik.values.cardnumber}
              onChange={handleCardNumberChange}
              type="tel"
              autoComplete="cc-number"
              placeholder='e.g. 1234 5678 9123 4567'
            />
            <p>{formik.errors.cardnumber}</p>
          </div>
          <div className='last'>
            <div className={`exp ${formik.errors.month ? 'invalid-input' : ''}`}>
              <p>EXPIRATION DATE</p>
              <input
                id="expiryMonth"
                name="month"
                value={formik.values.month}
                onChange={formik.handleChange}
                type="text"
                maxLength="2"
                placeholder="MM"
              />
              <span> / </span>
              <input
                id="expiryYear"
                name="year"
                value={formik.values.year}
                onChange={formik.handleChange}
                type="text"
                maxLength="2"
                placeholder="YY"
              />
              <p id='stubborn'>{formik.errors.month}</p>
            </div>
            <div className={`cvc ${formik.errors.cvc ? 'invalid-input' : ''}`}>
              <p>CVC</p>
              <input
                id="cvc"
                name="cvc"
                value={formik.values.cvc}
                onChange={formik.handleChange}
                type="tel"
                placeholder="123"
                autoComplete="off"
              />
              <p>{formik.errors.cvc}</p>
            </div>
          </div>
          <div className='button'>
            <button type="submit">Confirm</button>
          </div>
        </form>
      )}
    </div>
  );
  
}