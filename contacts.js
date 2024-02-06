const fs = require('fs').promises;
const path = require('path');

// Ścieżka do pliku contacts.json
const contactsPath = path.join(__dirname, 'db', 'contacts.json');

// Funkcja do wyświetlania wszystkich kontaktów
async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    return JSON.parse(data); // Zwraca tablicę kontaktów
  } catch (error) {
    console.error('Error reading contacts file:', error);
    return []; // Zwraca pustą tablicę w przypadku błędu
  }
}

// Funkcja do pobierania kontaktu po ID
async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(data);
    const contact = contacts.find(contact => contact.id === contactId);
    return contact; // Zwraca znaleziony kontakt lub undefined
  } catch (error) {
    console.error('Error getting contact:', error);
  }
}

// Funkcja do usuwania kontaktu po ID
async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    let contacts = JSON.parse(data);
    const filteredContacts = contacts.filter(contact => contact.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2));
    return { message: `Contact with id ${contactId} has been removed`, removed: true }; // Zwraca informację o usunięciu
  } catch (error) {
    console.error('Error removing contact:', error);
    return { message: error.message, removed: false }; // Zwraca informację o błędzie
  }
}

// Funkcja do dodawania nowego kontaktu
async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(data);
    const newContact = {
      id: require('crypto').randomBytes(16).toString("hex"), // Generuje unikalne ID
      name,
      email,
      phone
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact; // Zwraca dodany kontakt
  } catch (error) {
    console.error('Error adding contact:', error);
    return { message: error.message, added: false }; // Zwraca informację o błędzie
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
