package karol.project.controller;

import jakarta.validation.Valid;
import karol.project.exception.ResourceNotFoundException;
import karol.project.model.Contact;
import karol.project.repository.ContactRepository;
import lombok.RequiredArgsConstructor;
import org.hibernate.validator.constraints.ru.INN;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ContactController {

    private final ContactRepository contactRepository;
    private int totalRequests = 0;
    HashMap<String, Integer> methodCounts = new HashMap<>();

    private void incrementMethodCount(String method) {
        methodCounts.put(method, methodCounts.getOrDefault(method, 0) + 1);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }


    // Get all Contacts
    @GetMapping("/contacts")
    public List<Contact> getAllContacts(@RequestParam(name = "title") Optional<String> title ) {
        totalRequests += 1;
        incrementMethodCount("GET");

        if (title.isPresent()){
            return contactRepository.findAllByTitleContainingIgnoreCase(title.get());
    }
        return contactRepository.findAll();
    }

    @GetMapping("/contacts/sorted/title")
    public List<Contact> getSortedContactsByName() {
        totalRequests += 1;
        incrementMethodCount("GET");


        Comparator<Contact> reverseComparator = (first, second) -> second.getTitle().compareTo(first.getTitle());
        List<Contact> contacts = contactRepository.findAll();
        contacts.sort(reverseComparator.reversed());
        return contacts;
    };

    @GetMapping("/contacts/sorted/type")
    public List<Contact> getSortedContactsByType() {
        totalRequests += 1;
        incrementMethodCount("GET");


        Comparator<Contact> reverseComparator = (first, second) -> second.getContactType().toString().compareTo(first.getContactType().toString());
        List<Contact> contacts = contactRepository.findAll();
        contacts.sort(reverseComparator.reversed());
        return contacts;
    };


    // Create new Contact
    @PostMapping("/contacts")
    public Contact createContact(@Valid @RequestBody Contact contact) {
        totalRequests += 1;
        incrementMethodCount("POST");

        return contactRepository.save(contact);
    }

    // Get Contact by id
    @GetMapping("/contacts/{id}")
    public Contact getContactById(@PathVariable(value = "id") Long contactId) {
        totalRequests += 1;
        incrementMethodCount("GET");


        return contactRepository.findById(contactId)
                .orElseThrow(() -> new ResourceNotFoundException("Contact", "id", contactId));
    }


    // Update Contact by id
    @PutMapping("/contacts/{id}")
    public Contact updateContact(@PathVariable(value = "id") Long contactId,
            @Valid @RequestBody Contact contactDetails) {
        totalRequests += 1;
        incrementMethodCount("PUT");


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
        totalRequests += 1;
        incrementMethodCount("DELETE");


        Contact contact = contactRepository.findById(contactId)
                .orElseThrow(() -> new ResourceNotFoundException("Contact", "id", contactId));

        contactRepository.delete(contact);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/stats")
    public int getStats() {
        return totalRequests;
    }

    @GetMapping("/statsByMethod")
    public HashMap<String, Integer> getStatsByMethod() {
        return methodCounts;
    }
}
