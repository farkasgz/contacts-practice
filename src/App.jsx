import { useState } from "react";
import "./App.css";
import contacts from "./contacts.json";

function App() {
  const [contactsArr, setContactsArr] = useState(contacts.slice(0,5));

  const addRandomContact = () => {
    console.log(contacts.length, contactsArr.length)
    if(contacts.length === contactsArr.length) return
    let randomContact = contacts[Math.floor(Math.random()*contacts.length)]
    while(contactsArr.includes(randomContact)){
      randomContact = contacts[Math.floor(Math.random()*contacts.length)]
    }
    setContactsArr([randomContact, ...contactsArr])
  }

  const sortByName = () => {
    const sortedArr = [...contactsArr]
    sortedArr.sort((a,b) => {
      if (a.name > b.name) return 1
      if (b.name > a.name) return -1
      return 0
    })
    setContactsArr(sortedArr)
  }

  const sortByPopularity = () => {
    const sortedArr = [...contactsArr]
    sortedArr.sort((a,b) => b.popularity-a.popularity)
    setContactsArr(sortedArr)
  }

  const deleteContact = (id) => {
    setContactsArr(contactsArr.filter(elem => elem.id !== id))
  }

  return (
    <div className="App">
      <h1>LAB | React IronContacts</h1>
      <button onClick={() => addRandomContact()}>Add Random Contact</button>
      <button onClick={() => sortByName()}>Sort by Name</button>
      <button onClick={() => sortByPopularity()}>Sort by Popularity</button>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won an Oscar</th>
            <th>Won an Emmy</th>
          </tr>
        </thead>
        <tbody>
          {contactsArr.map((elem) =>   
            <tr key={elem.id}>
              <th><img className="contact-pic" src={elem.pictureUrl} alt="picture"/></th>
              <th>{elem.name}</th>
              <th>{elem.popularity.toFixed(1)}</th>
              <th>{elem.wonOscar && "🏆"}</th>
              <th>{elem.wonEmmy && "🏆"}</th>
              <th><button onClick={() => deleteContact(elem.id)}>Delete</button></th>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
