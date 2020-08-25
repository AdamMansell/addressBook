// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = [],
    this.currentId = 0
}


AddressBook.prototype.addContact = function (contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function () {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function (id) {
  for (let i = 0; i < this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}

AddressBook.prototype.deleteContact = function (id) {
  for (let i = 0; i < this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber, email, workEmail, physicalAddress) {
  this.firstName = firstName,
    this.lastName = lastName,
    this.phoneNumber = phoneNumber,
    this.email = [email, workEmail],
    this.physicalAddress = physicalAddress
}


// User Interface Logic ---------
let addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  let contactsList = $("ul#contacts");
  let htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function (contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
};

function showContact(contactId) {
  const contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".email").html(contact.email[0]);
  $(".work-email").html(contact.email[1]);
  $(".physical-address").html(contact.physicalAddress);
  let buttons = $("#buttons");
  let delButton1 = $("#delButton1");
  let delButton2 = $("#delButton2");
  buttons.empty();
  delButton1.empty();
  delButton2.empty();
  buttons.append("<button class='deleteButton' id=" + contact.id + ">Delete</button>");
  delButton1.append("<button class='deleteButton' id=" + contact.email[0] + ">Delete Email</button>")
  delButton2.append("<button class='deleteButton' id=" + contact.email[1] + ">Delete Email</button>")
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function () {
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function () {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
  $("#delButton1").on("click", ".deleteButton", function () {
    $(".email").remove();
    $("#email").hide();
    $(".email").hide();
    $("#delButton1").empty();
  })
  $("#delButton2").on("click", ".deleteButton", function () {
    $(".work-email").remove();
    $("#workEmail").hide();
    $(".work-email").hide();
    $("#delButton2").empty();
  })
};

$(document).ready(function () {
  attachContactListeners();
  $("form#new-contact").submit(function (event) {
    event.preventDefault();
    const inputtedFirstName = $("input#new-first-name").val();
    const inputtedLastName = $("input#new-last-name").val();
    const inputtedPhoneNumber = $("input#new-phone-number").val();
    const inputtedEmail = $("input#new-email").val();
    const inputtedWorkEmail = $("input#work-email").val();
    const inputtedPhysicalAddress = $("input#new-physical-address").val();
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-email").val("");
    $("input#work-email").val("");
    $("input#new-physical-address").val("");
    let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmail, inputtedWorkEmail, inputtedPhysicalAddress);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
    if (inputtedEmail == "") {
      $("#delButton1").hide();
      $("#email").hide();
    } if (inputtedWorkEmail == "") {
      $("#workEmail").hide();
      $("#delButton2").hide();
    }
  })
})