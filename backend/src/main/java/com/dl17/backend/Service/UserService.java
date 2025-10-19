package com.dl17.backend.Service;

import com.dl17.backend.DTO.UserDTO;
import com.dl17.backend.Exception.ThisAccountNotFoundException;
import com.dl17.backend.Exception.UserWithThisUsernameAlreadyExistException;
import com.dl17.backend.Model.Account;
import com.dl17.backend.Model.User;
import com.dl17.backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public UserService(PasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    public User registerUser(UserDTO userDTO) {
        if (userRepository.findByUsername(userDTO.getUsername()).isEmpty()) {

            String encodedPassword = passwordEncoder.encode(userDTO.getPassword());
            User user = User.builder()
                    .username(userDTO.getUsername())
                    .password(encodedPassword)
                    .build();

            return userRepository.save(user);
        } else {
            throw new UserWithThisUsernameAlreadyExistException("This username exists already.");
        }
    }
}
