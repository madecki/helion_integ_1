import { useState } from 'react';
import './App.css';

function App({initialList = []}) {
  const [ displayedList, updateDisplayedList ] = useState(initialList)

  const removeElement = clickedIndex => {
    let updatedDisplayedList = [...displayedList];
    updatedDisplayedList = updatedDisplayedList.filter((li, index) => {
      return clickedIndex !== index;
    })

    updateDisplayedList(updatedDisplayedList)
  }

  return (
    <section className="container">
      <ul data-testid="list">
        {displayedList.map((li, index) => {
          return (
            <li key={`list-element-${index}`} data-testid={`list-element-${index}`} data-value={li}>
              {li}
              <button
                className="btn btn--danger"
                onClick={() => {removeElement(index)}}
                data-testid={`remove-${index}`}
              >
                REMOVE
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  );
}

export default App;
