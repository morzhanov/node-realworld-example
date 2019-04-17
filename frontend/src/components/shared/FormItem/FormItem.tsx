import * as React from 'react';
import styled from '@emotion/styled';

import { Label } from './Label';
import { Input } from './Input';
import { Textarea } from './Textarea';
import { File } from './File';
import { Error } from './Error';

interface FormInputProps {
  type?: string;
  name: string;
  label: string;
  touched: any;
  errors: any;
  children?: any;
  [key: string]: any;
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
  let InputComponent;
  switch (type) {
    case 'file':
      InputComponent = File;
      break;
    case 'textarea':
      InputComponent = Textarea;
      break;
    default:
      InputComponent = Input;
      break;
  }

  return (
    <FormItemWrapper>
      <Label htmlFor={name}>{label}</Label>
      <InputComponent id={name} type={type || 'text'} name={name} {...rest} />
      {touched[name] && errors[name] && <Error>{errors[name]}</Error>}
      {children}
    </FormItemWrapper>
  );
}
