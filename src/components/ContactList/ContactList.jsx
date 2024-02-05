import { useSelector, useDispatch } from 'react-redux';

import { getFilteredContacts } from '../../redux/contacts/contacts-selectors';
import { deleteName } from '../../redux/contacts/contacts-slice';

import css from './contactlist.module.css';

const ContactList = () => {
  const sortedNames = useSelector(getFilteredContacts);
  const dispatch = useDispatch();

const deleteContact = event => {
  const contactId = event.currentTarget.closest('li').id;
  const action = deleteName(contactId);
  dispatch(action);
};

  const elements = sortedNames.map(({ name, number, id }) => (
    <li className={css.item} key={id} id={id}>
      <p className={css.text}>
        {name}: {number}
      </p>
      <button onClick={deleteContact} type="button" className={css.btn}>
        Delete
      </button>
    </li>
  ));

  return <ul className={css.list}>{elements}</ul>;
};

export default ContactList;
