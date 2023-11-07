package com.scootshare.base.services;

import com.scootshare.base.entities.User;
import com.scootshare.base.repositories.UserRepository;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow();
    }

    /**
     * Adds a new RegistrationRequest to the database. Returns true if the new entry was added, and returns false if an
     * entry with the given email or username already exists.
     * @param user New entry
     * @return <code>true</code> if the entry was added, <code>false</code> otherwise
     */
    public User store(User user) {
        user.addAuthority("ROLE_CLIENT");
        return userRepository.save(user);
    }

    public boolean alreadyExists(User user) {
        Optional<User> registrationRequestByEmail =
                userRepository.findByEmail(user.getEmail());
        Optional<User> registrationRequestByNickname =
                userRepository.findUserByNickname(user.getNickname());

        // change to indicate which part combination is already taken
        // HTTP codes?
        if(registrationRequestByEmail.isPresent() && registrationRequestByNickname.isPresent()) {
            return true;
        }
        else if(registrationRequestByEmail.isPresent()) {
            return true;
        }
        else return registrationRequestByNickname.isPresent();
    }
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public void deleteById(long id){
        userRepository.deleteById(id);
    }
    
    public boolean existsUser(long id){
        return userRepository.existsById(id);
    }
    
    @Transactional
	public void deleteByEmail(String email) {
		userRepository.deleteByEmail(email);
	}
}
