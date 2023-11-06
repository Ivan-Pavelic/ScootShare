package com.scootshare.base.entities;


import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

@Entity(name="users")
@Table
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String firstName;
    private String lastName;
    private String nickname;
    private String password;
    private String cardNumber;
    @Column(unique = true)
    private String email;

    private byte[] card;
    private byte[] certificateOfNoCriminalRecord;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "user", cascade = CascadeType.ALL)
    private Set<Authority> authorities = new HashSet<>();

    protected User() {}

    public User(String firstName, String lastName, String nickname, String password, String cardNumber,
                String email, byte[] card, byte[] criminalRecord) {
        super();
        this.firstName = firstName;
        this.lastName = lastName;
        this.nickname = nickname;
        this.password = password;
        this.cardNumber = cardNumber;
        this.email = email;
        this.card = card;
        this.certificateOfNoCriminalRecord = criminalRecord;
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

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public String getEmail() {
        return email;
    }

    public byte[] getCard() {
        return card;
    }

    public byte[] getCertificateOfNoCriminalRecord() {
        return certificateOfNoCriminalRecord;
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

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setCard(byte[] idCard) {
        this.card = idCard;
    }

    public void setCertificateOfNoCriminalRecord(byte[] certificateOfNoCriminalRecord) {
        this.certificateOfNoCriminalRecord = certificateOfNoCriminalRecord;
    }

    public void addAuthority(String authority) {
        Authority newAuthority = new Authority();
        newAuthority.setAuthority(authority);
        newAuthority.setUser(this);
        authorities.add(newAuthority);
    }
}
