package karol.project.controller;

import jakarta.validation.Valid;
import karol.project.exception.ResourceNotFoundException;
import karol.project.model.Contact;
import karol.project.repository.ContactRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ContactController {

    private final ContactRepository contactRepository;

    // Get all Contacts
    @GetMapping("/contacts")
    public List<Contact> getAllContacts(@RequestParam(name = "title") Optional<String> title ) {
        if (title.isPresent()){
            return contactRepository.findAllByTitleContainingIgnoreCase(title.get());
    }
        return contactRepository.findAll();
    }

    @GetMapping("/contacts/sorted/title")
    public List<Contact> getSortedContactsByName() {
        Comparator<Contact> reverseComparator = (first, second) -> second.getTitle().compareTo(first.getTitle());
        List<Contact> contacts = contactRepository.findAll();
        contacts.sort(reverseComparator.reversed());
        return contacts;
    };

    @GetMapping("/contacts/sorted/type")
    public List<Contact> getSortedContactsByType() {
        Comparator<Contact> reverseComparator = (first, second) -> second.getContactType().toString().compareTo(first.getContactType().toString());
        List<Contact> contacts = contactRepository.findAll();
        contacts.sort(reverseComparator.reversed());
        return contacts;
    };


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
