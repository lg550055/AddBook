// Business logic for AddressBook
function AddressBook() {
  this.contacts = {};
  this.currentId = 0;
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts[contact.id] = contact;
};

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

AddressBook.prototype.findContact = function(id) {
  if (this.contacts[id] != undefined) {
    return this.contacts[id];
  }
  return false;
};

AddressBook.prototype.deleteContact = function(id) {
  if (this.contacts[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true;
};

// Business logic for Contacts
function Contact(name, surname, email, phone) {
  this.name = name;
  this.surname = surname;
  this.email = email;
  this.phone = phone;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
};

// User Interface logic
let book = new AddressBook();

function contactDetails(book) {
  let htmlContactInfo = '';
  Object.keys(book.contacts).forEach(function(key) {
    const contact = book.findContact(key);
    htmlContactInfo += '<li class="list-group-item" id='+contact.id +'>'+ contact.name+" "+contact.surname+'</li>';
  });
  $('#book').html(htmlContactInfo);
}

function showContact(id) {
  const contact = book.findContact(id);
  $('#contact').show();
  $('.name').html(contact.name);
  $('.surname').html(contact.surname);
  $('.email').html(contact.email);
  $('.phone').html(contact.phone);
  let buttons = $('#buttons');
  buttons.empty();
  buttons.append('<button class="deleteButton" id='+id+'>Delete</button>')
}

function contactListner() {
  $('#book').on('click', 'li', function() {
    showContact(this.id);

  $('#buttons').on('click', '.deleteButton', function() {
    book.deleteContact(this.id);
    $('#contact').hide();
    contactDetails(book);
  })
  });
}

$(document).ready(function() {
  contactListner();

  $("#new").submit(function() {
    event.preventDefault();
    let contact = new Contact($('#name').val(), $('#last').val(), $('#email').val(), $('#phone').val());
    book.addContact(contact);
    contactDetails(book);
    $('#new').trigger('reset');
  });


});
