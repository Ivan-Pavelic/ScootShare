package com.scootshare.base.entities;


import jakarta.persistence.*;
import org.springframework.web.multipart.MultipartFile;

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

    private String idCardUUID;
    private String certificateOfNoCriminalRecordUUIF;

    protected RegistrationRequest() {}

    public RegistrationRequest(String firstName, String lastName, String nickname, String password, Long cardNumber, String email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.nickname = nickname;
        this.password = password;
        this.cardNumber = cardNumber;
        this.email = email;
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

    public String getIdCardUUID() {
        return idCardUUID;
    }

    public String getCertificateOfNoCriminalRecordUUID() {
        return certificateOfNoCriminalRecordUUIF;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setCardNumber(Long cardNumber) {
        this.cardNumber = cardNumber;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setIdCardUUID(String idCardUUID) {
        this.idCardUUID = idCardUUID;
    }

    public void setCertificateOfNoCriminalRecordUUID(String certificateOfNoCriminalRecordUUID) {
        this.certificateOfNoCriminalRecordUUIF = certificateOfNoCriminalRecordUUID;
    }
}
