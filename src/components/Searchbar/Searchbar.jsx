import { Formik, Field } from 'formik';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { Search, Input, Label, Button, Span } from './Searchbar.styled';
import { useState } from 'react';

const Schema = yup.object().shape({
  query: yup.string().required(),
});

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const onChange = e => {
    const { value } = e.currentTarget;
    setQuery(value);
  };

  const resetForm = () => {
    setQuery('');
  };

  return (
    <>
      <Formik
        initialValues={{ query: '' }}
        validationSchema={Schema}
        onSubmit={values => {
          if (query.trim() === '') {
            alert('Cannot be empty');
            this.resetForm();
            return;
          }
          onSubmit(values);
          resetForm();
        }}
      >
        <Search>
          <Button type="submit">
            <Span>Search</Span>
          </Button>
          <Field as={Label}>
            <Field
              as={Input}
              type="text"
              name="query"
              value={query}
              onChange={onChange}
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </Field>
        </Search>
      </Formik>
    </>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
