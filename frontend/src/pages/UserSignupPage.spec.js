import React from 'react';
import { render, cleanup, fireEvent, waitFor, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UserSignupPage from './UserSignupPage';

beforeEach(cleanup);

describe('UserSignupPage', () => {
    describe('Layout', () => {
        it('has header of Signup', () => {
            const { container } = render(<UserSignupPage />);
            const header = container.querySelector('h1');
            expect(header).toHaveTextContent('Sign Up');
        })
        it('has input for username', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage />);
            const username = queryByPlaceholderText('Enter username');
            expect(username).toBeInTheDocument();
        })
        it('has input for display name', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage />);
            const displayNameInput = queryByPlaceholderText('Enter display name');
            expect(displayNameInput).toBeInTheDocument();
        })
        it('has password type for password input', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage />);
            const passwordInput = queryByPlaceholderText('Enter password');
            expect(passwordInput.type).toBe('password');
        })
        it('has submit button for Signup', () => {
            const { container } = render(<UserSignupPage />);
            const button = container.querySelector('button');
            expect(button).toBeInTheDocument();
        })
    })
});

describe('Interactions', () => {
    const changeEvent = (content) => {
        return {
            target: {
                value: content
            }
        };
    };

    it('sets the username value into state', () => {
        const { queryByPlaceholderText } = render(<UserSignupPage />);
        const usernameInput = queryByPlaceholderText('Enter username');
        fireEvent.change(usernameInput, changeEvent('my-username'));

        expect(usernameInput).toHaveValue('my-username');
    })

    it('sets the password value into state', () => {
        const { queryByPlaceholderText } = render(<UserSignupPage />);
        const passwordInput = queryByPlaceholderText('Enter password');
        fireEvent.change(passwordInput, changeEvent('P4assword'));

        expect(passwordInput).toHaveValue('P4assword');
    })
    let button, displayNameInput, usernameInput, passwordInput, passwordRepeat;

    const setupForSubmit = (props) => {
        const rendered = render(<UserSignupPage {...props} />);

        const { container, queryByPlaceholderText } = rendered;

        displayNameInput = queryByPlaceholderText('Enter display name');
        usernameInput = queryByPlaceholderText('Enter username');
        passwordInput = queryByPlaceholderText('Enter password');
        passwordRepeat = queryByPlaceholderText('Repeat password');

        fireEvent.change(displayNameInput, changeEvent('my-display-name'));
        fireEvent.change(usernameInput, changeEvent('my-user-name'));
        fireEvent.change(passwordInput, changeEvent('P4ssword'));
        fireEvent.change(passwordRepeat, changeEvent('P4ssword'));

        button = container.querySelector('button');
        return rendered;
    };

    it('displays validation error for displayName when error is received for the field', async () => {
        const actions = {
            postSignUp: jest.fn().mockRejectedValue({
                response: {
                    data: {
                        validationErrors: {
                            displayName: 'Cannot be null'
                        }
                    }
                }
            })
        };
        const { queryByText } = setupForSubmit({ actions });
        fireEvent.click(button);

        const errorMessage = await waitForElement(() =>
            queryByText('Cannot be null')
        );
        expect(errorMessage).toBeInTheDocument();
    });
});

