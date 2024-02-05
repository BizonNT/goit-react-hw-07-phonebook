export const getAllNames = store => store.contacts;

export const getFilteredContacts = store => {
  const { contacts, filter } = store;
  if (!filter) {
    return contacts;
  }
  const filterLowerCase = store.filter.toLowerCase();
  return store.contacts.filter(contact =>
    contact.name.toLowerCase().includes(filterLowerCase)
  );
};
