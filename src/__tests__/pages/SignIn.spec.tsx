import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SignIn from '../../pages/SignIn';

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }: { children: React.ReactNode }) => children,
    useHref: ({ children }: { children: React.ReactNode }) => children,
  }
});

describe('SigIn Page', () => {
  it('should be able to sign in', () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar')


    fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });

    fireEvent.click(buttonElement);

  });
});
