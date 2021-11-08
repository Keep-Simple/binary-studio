package com.keep.simple.backend.controller;

import com.keep.simple.backend.dto.AllData;
import com.keep.simple.backend.dto.MessageCreateDTO;
import com.keep.simple.backend.dto.MessageEditDTO;
import com.keep.simple.backend.dto.UserCreateDTO;
import com.keep.simple.backend.models.Message;
import com.keep.simple.backend.models.User;
import com.keep.simple.backend.service.MainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class Controller {

    @Autowired
    private MainService service;

    @Autowired
    private PasswordEncoder encoder;

    @GetMapping("/all")
    public AllData getAllData() {
        return new AllData(
                service.getAllUsers(),
                service.getAllMessages(),
                service.getCurrentUser());
    }

    @GetMapping("/users/{id}")
    public User getUser(@PathVariable("id") UUID id) {
        return service.getUser(id);
    }

    @GetMapping("/messages/{id}")
    public Message getMessage(@PathVariable UUID id) {
        return service.getMessage(id);
    }

    @PostMapping("/messages")
    public Message addMessage(@RequestBody MessageCreateDTO ms) {
        return service.addMessage(ms);
    }

    @PostMapping("/users")
    public User addUser(@RequestBody UserCreateDTO us) {
        us.setPassword(encoder.encode(us.getPassword()));
        return service.addUser(us);
    }

    @PutMapping("/messages")
    public Message editMessage(@RequestBody MessageEditDTO ms) {
        return service.editMessage(ms);
    }

    @PutMapping("/messages/like/{id}")
    public Message likeMessage(@PathVariable UUID id) {
        return service.likeMessage(id);
    }

    @PutMapping("/users")
    public User editUser(@RequestBody User us) {
        return service.editUser(us);
    }

    @DeleteMapping("/messages/delete/{id}")
    public void deleteMessage(@PathVariable UUID id) {
        service.deleteMessage(id);
    }

    @DeleteMapping("/users/delete/{id}")
    public void deleteUser(@PathVariable UUID id) {
        service.deleteUser(id);
    }

}
