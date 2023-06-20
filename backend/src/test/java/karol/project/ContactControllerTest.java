package karol.project;

import karol.project.controller.ContactController;
import karol.project.exception.ResourceNotFoundException;
import karol.project.model.Contact;
import karol.project.model.ContactType;
import karol.project.repository.ContactRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.*;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.when;

class ContactControllerTest {

    @Mock
    private ContactRepository contactRepository;

    @InjectMocks
    private ContactController contactController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getAllContacts_ShouldReturnAllContacts() {
        List<Contact> contacts = new ArrayList<>();


        contacts.add(new Contact(null, ContactType.Number,  "Johns Phone", "521233512", null, null));
        contacts.add(new Contact(null, ContactType.Email,  "Larrys Email", "larry@gmail.com", null, null));

        when(contactRepository.findAll()).thenReturn(contacts);

        List<Contact> result = contactController.getAllContacts(Optional.empty());

        assertEquals(2, result.size());
        assertEquals("Johns Phone", result.get(0).getTitle());
        assertEquals("Larrys Email", result.get(1).getTitle());
    }

    @Test
    void updateContact_ShouldReturnUpdatedContact() {
        // Mock existing contact
        Contact existingContact = new Contact();
        existingContact.setId(1L);
        existingContact.setTitle("Email");
        existingContact.setContent("EmailContent");
        existingContact.setContactType(ContactType.Email);

        // Mock updated contact details
        Contact updatedContactDetails = new Contact();
        updatedContactDetails.setTitle("Number");
        updatedContactDetails.setContent("NumberContent");
        updatedContactDetails.setContactType(ContactType.Number);

        when(contactRepository.findById(anyLong())).thenReturn(Optional.of(existingContact));

        when(contactRepository.save(any())).thenReturn(new Contact(1L,updatedContactDetails.getContactType(),  updatedContactDetails.getTitle(), updatedContactDetails.getContent(), null, null));

        Contact updated = contactController.updateContact(1L, updatedContactDetails );

        verify(contactRepository, times(1)).findById(1L);

        verify(contactRepository, times(1)).save(any(Contact.class));

        assertEquals(updated.getId(), existingContact.getId());

    }


    @Test
    void createContact_ValidContact_ShouldReturnCreatedContact() {
        Contact contact = new Contact(null, ContactType.Number,  "Johns Phone", "521233512", null, null);

        when(contactRepository.save(any(Contact.class))).thenReturn(contact);

        Contact result = contactController.createContact(contact);

        assertEquals("Johns Phone", result.getTitle());
        assertEquals("521233512", result.getContent());
    }

    @Test
    void deleteContact_ExistingId_ShouldReturnOkResponse() {
        Long contactId = 1L;
        Contact contact = new Contact(null, ContactType.Number,  "Johns Phone", "521233512", null, null);

        when(contactRepository.findById(contactId)).thenReturn(Optional.of(contact));

        ResponseEntity<?> response = contactController.deleteContact(contactId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        verify(contactRepository, times(1)).delete(contact);
    }

}