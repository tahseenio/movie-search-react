import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Search from "../components/Search";

// tests to run:
// - if user clicks search when empty in search bar, do nothing
// - if user searches batman check fetch data equal to sample batman data


test('on initial render, ', () => {
  render(<Search />);
  // screen.getByRole('');
  expect(screen.getByRole('heading', { name: 'The best place to search for your favourite movie' })).toBeEnabled();
})
