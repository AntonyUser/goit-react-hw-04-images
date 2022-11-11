import { Formik, Field } from 'formik';
import { Component } from 'react';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { Search, Input, Label, Button, Span } from './Searchbar.styled';

const Schema = yup.object().shape({
  query: yup.string().required(),
});

export class Searchbar extends Component {
  state = {
    query: '',
  };
  static propTypes = {
    onSubmit: PropTypes.func,
  };
  onChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };
  resetForm() {
    this.setState(() => {
      return {
        query: '',
      };
    });
  }

  render() {
    return (
      <>
        <Formik
          initialValues={{ query: '' }}
          validationSchema={Schema}
          onSubmit={values => {
            if (this.state.query.trim() === '') {
              alert('Cannot be empty');
              this.resetForm();
              return;
            }
            this.props.onSubmit(values);
            this.resetForm();
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
                value={this.state.query}
                onChange={this.onChange}
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
              />
            </Field>
          </Search>
        </Formik>
      </>
    );
  }
}
