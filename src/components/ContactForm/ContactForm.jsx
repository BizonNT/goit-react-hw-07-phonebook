import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';

import { addName } from '../../redux/contacts/contacts-slice';
import { getAllNames } from '../../redux/contacts/contacts-selectors';

import css from './contactform.module.css';

export default function ContactForm() {
  const contacts = useSelector(getAllNames);

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const dispatch = useDispatch();

  const handleInput = event => {
    const { name, value } = event.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handleAddName = event => {
    event.preventDefault();
    const nameId = event.currentTarget.elements.name.id;
    const arrayContacts = contacts.find(contact => contact.name === name);
    const arrayNumbers = contacts.find(contact => contact.number === number);

    if (arrayContacts) {
      alert(
        `${name} is already in contacts with number ${arrayContacts.number}`
      );
      return;
    }
    if (arrayNumbers) {
      alert(`${number} is already in contact ${arrayNumbers.name}`);
      return;
    }

    const data = {
      name,
      number,
      id: nameId,
    };
    const action = addName(data);
    dispatch(action);

    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  const nameId = nanoid();
  const phoneId = nanoid();

  return (
    <form className={css.info} onSubmit={handleAddName}>
      <label htmlFor={nameId} className={css.label}>
        Name
        <input
          className={css.field}
          type="text"
          name="name"
          required
          value={name}
          onChange={handleInput}
          id={nameId}
        />
      </label>
      <label htmlFor={phoneId} className={css.label}>
        Number
        <input
          className={css.field}
          type="tel"
          name="number"
          required
          value={number}
          onChange={handleInput}
          id={phoneId}
        />
      </label>
      <button className={css.btn} type="submit">
        Add contact
      </button>
    </form>
  );
}
