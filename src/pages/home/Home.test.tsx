import React from 'react';
import { render, fireEvent, queryByText } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Home } from './Home';

// Mock the users data
jest.mock('../../data', () => [
  {
    username: 'John',
    address: {
      street: 'Dayna Park',
      suite: 'Suite 449',
      city: 'Bartholomebury',
      zipcode: '76495-3109',
      geo: {
        lat: '24.6463',
        lng: '-168.8889',
      },
    },
    age: 25,
    company: { name: 'Company A' },
  },
  {
    username: 'Jane',
    address: {
      street: 'Kattie Turnpike',
      suite: 'Suite 198',
      city: 'Lebsackbury',
      zipcode: '31428-2261',
      geo: {
        lat: '-38.2386',
        lng: '57.2232',
      },
    },
    age: 30,
    company: { name: 'Company B' },
  },
]);

describe('Home page', () => {
  test('renders the count and buttons', () => {
    const { getByText } = render(<Home />);
    expect(getByText('Count: 1')).toBeInTheDocument();
    expect(getByText('-')).toBeInTheDocument();
    expect(getByText('+')).toBeInTheDocument();
  });

  test('increments the count when the "+" button is clicked', () => {
    const { getByText } = render(<Home />);
    const incrementButton = getByText('+');
    fireEvent.click(incrementButton);
    expect(getByText('Count: 2')).toBeInTheDocument();
  });

  test('decrements the count when the "-" button is clicked', () => {
    const { getByText } = render(<Home />);
    const incrementButton = getByText('+');
    const decrementButton = getByText('-');
    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);
    fireEvent.click(decrementButton);
    expect(getByText('Count: 2')).toBeInTheDocument();
    fireEvent.click(decrementButton);
    fireEvent.click(decrementButton);
    //can't be less than 1
    expect(getByText('Count: 1')).toBeInTheDocument();
  });

  test('case to increment count with a random number, between 1 and 10', () => {
    const { getByTestId } = render(<Home />);
    const button = getByTestId('random-increment');
    fireEvent.click(button);
    const count = getByTestId('count');
    const countValue = count?.textContent?.split(':')[1].trim();
    expect(parseInt(countValue || '0')).toBeGreaterThanOrEqual(2);
    expect(parseInt(countValue || '0')).toBeLessThanOrEqual(11);
  });

  test('case to increment to the nearest odd number, if already odd - increment to next odd', () => {
    const { getByTestId, getByText } = render(<Home />);
    const button = getByTestId('next-odd');
    fireEvent.click(button);
    expect(getByText('Count: 3')).toBeInTheDocument();
  });

  test('case to decrease the count by the input of the first textfield', () => {
    const { getByTestId, getByText } = render(<Home />);
    const button = getByTestId('decrement-by-input-value');
    const input = getByTestId('first-input');
    const incrementButton = getByText('+');
    fireEvent.click(incrementButton);
    fireEvent.change(input, { target: { value: '12' } });
    fireEvent.click(button);
    expect(getByText('Count: 1')).toBeInTheDocument();
  });

  test('case to reset the count', () => {
    const { getByTestId, getByText } = render(<Home />);
    const button = getByTestId('reset');
    const incrementButton = getByText('+');
    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);
    fireEvent.click(button);
    expect(getByText('Count: 1')).toBeInTheDocument();
  });

  test('searches and displays users based on the input', () => {
    const { getByTestId, getByText, queryByText } = render(<Home />);
    const searchInput = getByTestId('search-users-input');
    fireEvent.change(searchInput, { target: { value: 'John' } });
    expect(getByText('Username: John')).toBeInTheDocument();
    expect(getByText('Age: 25')).toBeInTheDocument();
    expect(getByText('Company name: Company A')).toBeInTheDocument();
    expect(queryByText('Username: Jane')).not.toBeInTheDocument();
  });

  test('remove user card from the screen', () => {
    const { getAllByText, queryByText } = render(<Home />);
    const removeButton = getAllByText('remove')[0];
    fireEvent.click(removeButton);
    expect(queryByText('Username: John')).not.toBeInTheDocument();
  });

  test('restore removed user card', () => {
    const { getAllByText, queryByText, getByTestId } = render(<Home />);
    const removeButton = getAllByText('remove')[0];
    const searchInput = getByTestId('search-users-input');
    fireEvent.click(removeButton);
    expect(queryByText('Username: John')).not.toBeInTheDocument();
    fireEvent.change(searchInput, { target: { value: 'John' } });
    const restoreButton = getAllByText('restore')[0];
    expect(restoreButton).toBeInTheDocument();
    fireEvent.click(restoreButton);
    const restoreButtonAggain = queryByText('restore');
    expect(restoreButtonAggain).not.toBeInTheDocument();
    fireEvent.change(searchInput, { target: { value: '' } });
    expect(queryByText('Username: John')).toBeInTheDocument();
  });
});
