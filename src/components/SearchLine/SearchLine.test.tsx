import { fireEvent, render, screen } from '@testing-library/react';
import { SearchLine } from './SearchLine';

const mockSearch: (data: string) => Promise<string> = jest.fn((data) => {
  return Promise.resolve(data);
});

test('should render all form elements', () => {
  render(<SearchLine search={mockSearch} />);

  expect(screen.getByTestId('search')).toBeInTheDocument();
  expect(screen.getByTestId('resetBtn')).toBeInTheDocument();
  expect(screen.getByTestId('submitBtn')).toBeInTheDocument();
});

test('should clear the search bar when clicking on the reset button', () => {
  render(<SearchLine search={mockSearch} />);

  fireEvent.input(screen.getByTestId('search'), {
    target: {
      value: 'test search',
    },
  });

  expect(screen.getByTestId('search')).toHaveValue('test search');

  fireEvent.click(screen.getByTestId('resetBtn'));

  expect(screen.getByTestId('search')).toHaveValue('');
});

test('should not send request with empty string', async () => {
  render(<SearchLine search={mockSearch} />);

  expect(screen.getByTestId('search')).toHaveValue('');

  fireEvent.click(screen.getByTestId('submitBtn'));

  expect(mockSearch).not.toBeCalled();
});

test('should send request with test string', async () => {
  render(<SearchLine search={mockSearch} />);

  fireEvent.input(screen.getByTestId('search'), {
    target: {
      value: 'test search',
    },
  });

  fireEvent.click(screen.getByTestId('submitBtn'));

  expect(mockSearch).toBeCalledWith('test search');

  expect(screen.getByTestId('search')).toHaveValue('test search');
});
