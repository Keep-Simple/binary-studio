package com.keep.simple.backend.service;

import com.keep.simple.backend.auth.TokenService;
import com.keep.simple.backend.auth.model.AuthUser;
import com.keep.simple.backend.dto.MessageCreateDTO;
import com.keep.simple.backend.dto.MessageEditDTO;
import com.keep.simple.backend.dto.UserCreateDTO;
import com.keep.simple.backend.models.Message;
import com.keep.simple.backend.models.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class MainService implements UserDetailsService {
    private final Map<UUID, User> users = new ConcurrentHashMap<>();
    private final Map<UUID, Message> messages = new ConcurrentHashMap<>();

    public MainService() {
        var u1 = User.builder().avatar("https://robohash.org/quamestlaborum.png?size=50x50&set=set1").name("Dannie").user_id(UUID.randomUUID()).password("123").isAdmin(false).build();
        var u2 = User.builder().avatar("https://robohash.org/sedcumesse.png?size=50x50&set=set1").name("Evangelina").user_id(UUID.randomUUID()).password("123").isAdmin(false).build();
        var u3 = User.builder().avatar("https://robohash.org/quiadoloribusfuga.png?size=50x50&set=set1").name("Neron").user_id(UUID.randomUUID()).password("123").isAdmin(false).build();
        var u4 = User.builder().avatar("https://robohash.org/laborumdoloresvoluptas.png?size=50x50&set=set1").name("Glen").user_id(UUID.randomUUID()).password("123").isAdmin(false).build();
        var u5 = User.builder().avatar("https://robohash.org/numquamaperiameaque.png?size=50x50&set=set1").name("Jeremy").user_id(UUID.randomUUID()).password("123").isAdmin(false).build();
        var admin = User.builder().avatar("https://robohash.org/etquiaautem.png?size=50x50&set=set1").isAdmin(true).name("admin").user_id(UUID.fromString("20cbf0a5-3a94-43c4-b1a3-5670057c8717")).password("admin").build();

        var bCryptPasswordEncoder = new BCryptPasswordEncoder();
        admin.setPassword(bCryptPasswordEncoder.encode(admin.getPassword()));
        u1.setPassword(bCryptPasswordEncoder.encode(u1.getPassword()));
        u2.setPassword(bCryptPasswordEncoder.encode(u2.getPassword()));
        u3.setPassword(bCryptPasswordEncoder.encode(u3.getPassword()));
        u4.setPassword(bCryptPasswordEncoder.encode(u4.getPassword()));
        u5.setPassword(bCryptPasswordEncoder.encode(u5.getPassword()));

        var m1 = Message.builder().user_id(u1.getUser_id()).name(u1.getName()).avatar(u1.getAvatar()).id(UUID.randomUUID()).isLiked(false).text("Reverse-engineered disintermediate hub").date(randomDate()).edit_date(null).build();
        var m2 = Message.builder().user_id(u2.getUser_id()).name(u2.getName()).avatar(u2.getAvatar()).id(UUID.randomUUID()).isLiked(false).text("Cross-platform foreground website").date(randomDate()).edit_date(null).build();
        var m3 = Message.builder().user_id(u3.getUser_id()).name(u3.getName()).avatar(u3.getAvatar()).id(UUID.randomUUID()).isLiked(false).text("Digitized multi-tasking support. Reverse-engineered disintermediate hub").date(randomDate()).edit_date(null).build();
        var m4 = Message.builder().user_id(u4.getUser_id()).name(u4.getName()).avatar(u4.getAvatar()).id(UUID.randomUUID()).isLiked(false).text("Front-line 24 hour hierarchy. ").date(randomDate()).edit_date(null).build();
        var m5 = Message.builder().user_id(u5.getUser_id()).name(u5.getName()).avatar(u5.getAvatar()).id(UUID.randomUUID()).isLiked(false).text("Reverse-engineered disintermediate hub. Fundamental executive collaboration").date(randomDate()).edit_date(null).build();
        var adminMessage = Message.builder().user_id(admin.getUser_id()).name(admin.getName()).avatar(admin.getAvatar()).id(UUID.randomUUID()).isLiked(false).text("Long and beautiful message to demonstrate chat ui. It will take few more words, just keep going. Almost there, pretend this is a real chat. Finally, end is somewhere near. Yeap, here we are").date(randomDate()).edit_date(null).build();

        users.put(u1.getUser_id(), u1);
        users.put(u2.getUser_id(), u2);
        users.put(u3.getUser_id(), u3);
        users.put(u4.getUser_id(), u4);
        users.put(u5.getUser_id(), u5);
        users.put(admin.getUser_id(), admin);

        messages.put(m1.getId(), m1);
        messages.put(m2.getId(), m2);
        messages.put(m3.getId(), m3);
        messages.put(m4.getId(), m4);
        messages.put(m5.getId(), m5);
        messages.put(adminMessage.getId(), adminMessage);
    }

    public Set<User> getAllUsers() {
        return new HashSet<>(users.values());
    }

    public Set<Message> getAllMessages() {
        return new HashSet<>(messages.values());
    }

    public User getUser(UUID id) {
        return users.get(id);
    }

    private Instant randomDate() {
        Instant lb = Instant.now().minus(Duration.ofDays(365));
        Instant up = Instant.now().minus(Duration.ofDays(5));

        long startSeconds = lb.getEpochSecond();
        long endSeconds = up.getEpochSecond();
        long random = ThreadLocalRandom
                .current()
                .nextLong(startSeconds, endSeconds);

        return Instant.ofEpochSecond(random);
    }

    public Message getMessage(UUID id) {
        return messages.get(id);
    }

    public Message addMessage(MessageCreateDTO ms) {
        var id = UUID.randomUUID();
        var user = users.get(ms.getUser_id());

        messages.put(id,
                new Message(ms.getText(), null,
                        Instant.now(), id, ms.getUser_id(),
                        user.getName(), user.getAvatar(), false));

        return messages.get(id);
    }

    public Message editMessage(MessageEditDTO ms) {
        var prev = messages.get(ms.getId());
        prev.setText(ms.getText());

        return prev;
    }

    public User addUser(UserCreateDTO us) {
        var getIfExist = users.values()
                .stream()
                .filter(user -> user.getName().equals(us.getName()))
                .findFirst();

        if (getIfExist.isPresent()) return null;

        var id = UUID.randomUUID();

        users.put(id,
                new User(
                        us.getName(),
                        "https://robohash.org/quamestlaborum.png?size=50x50&set=set1",
                        us.getPassword(),
                        id,
                        false));

        return users.get(id);
    }

    public User editUser(User us) {
        users.put(us.getUser_id(), us);
        messages.values()
                .stream()
                .filter(m -> m.getUser_id().equals(us.getUser_id()))
                .forEach(m -> {
                    m.setAvatar(us.getAvatar());
                    m.setName(us.getName());
                });


        return users.get(us.getUser_id());
    }

    public void deleteMessage(UUID id) {
        messages.remove(id);
    }

    public void deleteUser(UUID id) {
        messages.values().forEach(message -> {
            if (message.getUser_id().equals(id))
                messages.remove(message.getId());
        });

        users.remove(id);
    }

    public Message likeMessage(UUID id) {
        var ms = messages.get(id);
        ms.setLiked(!ms.isLiked());

        return ms;
    }

    public User userWithName(String name) {
        return users.values()
                .stream()
                .filter(user -> user.getName().equals(name))
                .findFirst().orElseThrow(() -> new UsernameNotFoundException("No user with name " + name));
    }

    public User getCurrentUser() {
        return users.get(TokenService.getUserId());
    }

    @Override
    public AuthUser loadUserByUsername(String username) throws UsernameNotFoundException {
        var user = userWithName(username);
        return new AuthUser(user.getUser_id(), user.getName(), user.getPassword());
    }
}
