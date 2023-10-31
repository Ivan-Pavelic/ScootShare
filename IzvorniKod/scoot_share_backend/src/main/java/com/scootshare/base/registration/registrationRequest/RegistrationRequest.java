package com.scootshare.base.registration.registrationRequest;


import jakarta.persistence.*;

@Entity
@Table
public class RegistrationRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String firstName;
    private String lastName;
    private String nickname;
    private String password;
    private Long cardNumber;
    private String email;

    // add files!

    protected RegistrationRequest() {}


    // update constructors for files!
    private RegistrationRequest(String firstName, String lastName, String nickname, String password, Long cardNumber, String email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.nickname = nickname;
        this.password = password;
        this.cardNumber = cardNumber;
        this.email = email;
    }

    public static RegistrationRequest of(String firstName, String lastName, String nickname, String password, Long cardNumber, String email) {
        return new RegistrationRequest(firstName, lastName, nickname, password, cardNumber, email); // update to add files
    }

    public Long getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getNickname() {
        return nickname;
    }

    public String getPassword() {
        return password;
    }

    public Long getCardNumber() {
        return cardNumber;
    }

    public String getEmail() {
        return email;
    }

    // add file getters!
}
