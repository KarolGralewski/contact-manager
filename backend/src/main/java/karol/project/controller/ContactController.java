package karol.project.controller;

import jakarta.validation.Valid;
import karol.project.exception.ResourceNotFoundException;
import karol.project.model.Contact;
import karol.project.repository.ContactRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ContactController {

    private final ContactRepository contactRepository;

    // Get all Contacts
    @GetMapping("/contacts")
    public List<Contact> getAllContacts() {
        return contactRepository.findAll();
    }

    // Create new Contact
    @PostMapping("/contacts")
    public Contact createContact(@Valid @RequestBody Contact contact) {
        return contactRepository.save(contact);
    }

    // Get Contact by id
    @GetMapping("/contacts/{id}")
    public Contact getContactById(@PathVariable(value = "id") Long contactId) {
        return contactRepository.findById(contactId)
                .orElseThrow(() -> new ResourceNotFoundException("Contact", "id", contactId));
    }

    // Update Contact by id
    @PutMapping("/contacts/{id}")
    public Contact updateContact(@PathVariable(value = "id") Long contactId,
            @Valid @RequestBody Contact contactDetails) {
        Contact contact = contactRepository.findById(contactId)
                .orElseThrow(() -> new ResourceNotFoundException("Contact", "id", contactId));

        contact.setTitle(contactDetails.getTitle());
        contact.setContent(contactDetails.getContent());
        contact.setContactType(contactDetails.getContactType());

        Contact updatedContact = contactRepository.save(contact);

        return updatedContact;
    }

    // Delete Contact by id
    @DeleteMapping("/contacts/{id}")
    public ResponseEntity<?> deleteContact(@PathVariable(value = "id") Long contactId) {
        Contact contact = contactRepository.findById(contactId)
                .orElseThrow(() -> new ResourceNotFoundException("Contact", "id", contactId));

        contactRepository.delete(contact);

        return ResponseEntity.ok().build();
    }
}
