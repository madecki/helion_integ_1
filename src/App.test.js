import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('Renders list elements correctly when valid list is provided', () => {
  const validList = ["To jest", "przykładowy", "element listy"];

  beforeEach(() => {
    render(<App initialList={validList} />);
  })

  test('Renders valid list', () => {
    const list = screen.getByTestId('list');
    expect(list).toBeInTheDocument();
  })

  test('Renders valid list elements', () => {
    const listElements = screen.getAllByTestId(/list-element-/);
    expect(listElements.length).toEqual(validList.length)
  })

  test('Renders valid list elements buttons', () => {
    const listElementsButtons = screen.getAllByTestId(/remove-/);
    expect(listElementsButtons.length).toEqual(validList.length)
  })
});

describe('Renders component and list element (ul) even if no list has been passed', () => {
  beforeEach(() => {
    render(<App/>);
  })

  test('Renders valid list', () => {
    const list = screen.getByTestId('list');
    expect(list).toBeInTheDocument();
  })
});

describe('Removes element from the list after "remove" button was clicked', () => {
  test('Removes element from an array of nonunique elements', () => {
    const listOfNonUniqueElements = ["To jest", "przykładowy", "element listy", "To jest"];
    render(<App initialList={listOfNonUniqueElements} />);

    const buttonElement = screen.getByTestId('remove-3');
    fireEvent.click(buttonElement);

    const listElements = screen.getAllByTestId(/list-element-/);
    const listElementsContent = listElements.map(listElem => listElem.textContent.replace('REMOVE', ''));

    expect(listElementsContent).toEqual(["To jest", "przykładowy", "element listy"]);
  })

  test('Removes element from an array of unique elements', () => {
    const listOfNonUniqueElements = ["To jest", "przykładowy", "element listy"];
    render(<App initialList={listOfNonUniqueElements} />);

    const buttonElement = screen.getByTestId('remove-2');
    fireEvent.click(buttonElement);

    const listElements = screen.getAllByTestId(/list-element-/);
    const listElementsContent = listElements.map(listElem => listElem.textContent.replace('REMOVE', ''));

    expect(listElementsContent).toEqual(["To jest", "przykładowy"]);
  })
});
