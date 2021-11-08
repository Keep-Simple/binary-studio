package com.keep.simple.backend.auth;

import com.keep.simple.backend.auth.dto.AuthUserDTO;
import com.keep.simple.backend.auth.dto.UserLoginDTO;
import com.keep.simple.backend.auth.dto.UserRegisterDto;
import com.keep.simple.backend.auth.model.AuthUser;
import com.keep.simple.backend.dto.UserCreateDTO;
import com.keep.simple.backend.models.User;
import com.keep.simple.backend.service.MainService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final PasswordEncoder bCryptPasswordEncoder;
    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;
    private final MainService service;

    public AuthService(PasswordEncoder bCryptPasswordEncoder, AuthenticationManager authenticationManager, TokenService tokenService, MainService service) {
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
        this.service = service;
    }

    public AuthUserDTO register(UserRegisterDto userDto) throws Exception {
        User user = AuthUserMapper.MAPPER.userRegisterDtoToUser(userDto);
        var loginDTO = new UserLoginDTO(user.getName(), user.getPassword());
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        if (service.addUser(new UserCreateDTO(user.getName(), user.getAvatar(), user.getPassword(), user.isAdmin())) == null) {
            throw new Exception("User already exists");
        }
        return login(loginDTO);
    }

    public AuthUserDTO login(UserLoginDTO user) throws Exception {
        Authentication auth;
        try {
            var authentication = new UsernamePasswordAuthenticationToken(user.getName(), user.getPassword());
            auth = authenticationManager.authenticate(authentication);
        } catch (BadCredentialsException e) {
            throw new Exception("Incorrect username or password", e);
        }

        var currentUser = (AuthUser) auth.getPrincipal();
        final var userDetails = service.getUser(currentUser.getId());
        final String jwt = tokenService.generateToken(currentUser);
        return new AuthUserDTO(jwt, userDetails);
    }
}
