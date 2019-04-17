import * as React from 'react';
import styled from '@emotion/styled';

import { Label } from './Label';
import { Input } from './Input';
import { Error } from './Error';

interface FormInputProps {
  type?: string;
  name: string;
  label: string;
  touched: Array;
  errors: Array;
  children?: any;
  [key: string]: string | undefined | boolean | Array;
}

const FormItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export default function FormItem({
  errors,
  type,
  name,
  label,
  touched,
  children,
  ...rest
}: FormInputProps) {
  return (
    <FormItemWrapper>
      <Label>{label}</Label>
      <Input type={type || 'text'} name={name} {...rest} />
      {touched[name] && errors[name] && <Error>{errors[name]}</Error>}
      {children}
    </FormItemWrapper>
  );
}
