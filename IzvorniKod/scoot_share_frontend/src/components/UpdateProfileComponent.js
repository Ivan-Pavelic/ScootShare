import React, { useEffect, useState } from 'react';
import { BsFillPersonFill, BsCreditCard2BackFill } from "react-icons/bs";
import {AiOutlineMail, AiOutlineIdcard, AiFillFileText} from "react-icons/ai";
import {RiLockPasswordLine} from "react-icons/ri"

const UpdateProfileComponent = (props) => {
    const {email, jwt} = {...props};
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch(`api/users/${email}`, {
            headers: {
                "Content-Type" : "application/json",
                "Authorization": `Bearer ${jwt}`
            },
            method: "GET"
        })
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
        })
        .then((user) => {
            user["password"] = "";
            user["repeat_password"] = "";
            setUser(user);
        })
    }, []);

    function handleInputChange(attribute, value) {
        let newUser = {...user};
        if (attribute === "repeat_password" || attribute === "password") {
            const errorPassword = document.querySelector(".repeat-password-error");
            if (value !== user.password) {
                errorPassword.classList.remove("hidden");
                errorPassword.classList.add("flex");
            }
            else {
                errorPassword.classList.add("hidden");
                errorPassword.classList.remove("flex");
            }
        }
        newUser[attribute] = value;
        setUser(newUser);
    }

    function updateUser(event) {
        event.preventDefault();
        let hasError = false;
        if (user.firstName === "") {
            hasError = true;
            const error = document.querySelector(".first-name-error");
            error.classList.remove("hidden");
            error.classList.add("flex");
        }
        else {
            const error = document.querySelector(".first-name-error");
            error.classList.add("hidden");
            error.classList.remove("flex");
        }
        if (user.lastName === "") {
            hasError = true;
            const error = document.querySelector(".last-name-error");
            error.classList.remove("hidden");
            error.classList.add("flex");
        }
        else {
            const error = document.querySelector(".last-name-error");
            error.classList.add("hidden");
            error.classList.remove("flex");
        }
        if (user.nickname === "") {
            hasError = true;
            const error = document.querySelector(".nickname-error");
            error.classList.remove("hidden");
            error.classList.add("flex");
        }
        else {
            const error = document.querySelector(".nickname-error");
            error.classList.add("hidden");
            error.classList.remove("flex");
        }
        if (!isValidCreditCardNumber(user.cardNumber)) {
            hasError = true;
            const error = document.querySelector(".card-error");
            error.classList.remove("hidden");
            error.classList.add("flex");
        }
        else {
            const error = document.querySelector(".card-error");
            error.classList.add("hidden");
            error.classList.remove("flex");
        }
        if (user.password == null || (user.password.length < 8 && !user.password.length == 0)) {
            hasError = true;
            const error = document.querySelector(".password-error");
            error.classList.remove("hidden");
            error.classList.add("flex");
        }
        else {
            const error = document.querySelector(".password-error");
            error.classList.add("hidden");
            error.classList.remove("flex");
        }
        if (user.password !== user.repeat_password) {
            hasError = true;
            const error = document.querySelector(".repeat-password-error");
            error.classList.remove("hidden");
            error.classList.add("flex");
        }
        else {
            const error = document.querySelector(".repeat-password-error");
            error.classList.add("hidden");
            error.classList.remove("flex");
        }

        if (!hasError) {
            const {firstName, lastName, nickname, cardNumber, email, password} = {...user};
            const newUser = {firstName, lastName, nickname, cardNumber, email, password};
            fetch(`/api/users/${email}`, {
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization": `Bearer ${jwt}`
                },
                method: "PUT",
                body: JSON.stringify(newUser)
            });
        }
    }

    function isValidCreditCardNumber(cardNumber) {
        // Remove spaces and non-digit characters
        cardNumber = cardNumber.replace(/\s/g, '').replace(/\D/g, '');
      
        // Check if the card number is a numeric string with 13 to 19 digits
        if (/^\d{13,19}$/.test(cardNumber)) {
          // Perform Luhn algorithm (mod 10) validation
          let sum = 0;
          let isEven = false;
      
          for (let i = cardNumber.length - 1; i >= 0; i--) {
            let digit = parseInt(cardNumber[i], 10);
      
            if (isEven) {
              digit *= 2;
              if (digit > 9) {
                digit -= 9;
              }
            }
      
            sum += digit;
            isEven = !isEven;
          }
      
          return sum % 10 === 0;
        }
      
        return false;
      }

    return (
        user && 
        <>
            <div className='flex-row mx-auto justify-center w-2/5 my-20 rounded-lg shadow-lg'>
                <div className='bg-blue-500 h-2 rounded-lg'></div>
                <div className='mb-10 flex justify-center align-center mt-8'>
                    <p className='font-monoy text-4xl font-semibold'>Podatci dostupni za ažuriranje</p>
                </div>
                <form className='flex-row px-20'>
                    <div className='flex rounded-sm shadow-md mb-10'>
                        <div className='flex justfiy-center align-middle bg-gray-200 p-2'>
                            <BsFillPersonFill size={35} />
                        </div>
                        <div className='w-full'>
                            <input className='w-full h-full pl-4 focus:outline-none text-xl'
                                placeholder='Ime'
                                type="text"
                                value={user.firstName}
                                onChange={(event) => handleInputChange("firstName", event.target.value)}/>
                        </div>
                        
                    </div>
                    <div className='justify-end -mt-8 mb-8 hidden first-name-error'>
                        <p className='text-md text-red-500'>Molimo unesite ispravno ime.</p>
                    </div>
                    <div className='flex rounded-sm shadow-md mb-10'>
                        <div className='flex justfiy-center align-middle bg-gray-200 p-2'>
                            <BsFillPersonFill size={35} />
                        </div>
                        <div className='w-full'>
                            <input className='w-full h-full pl-4 focus:outline-none text-xl'
                                placeholder='Prezime'
                                type="text"
                                value={user.lastName}
                                onChange={(event) => handleInputChange("lastName", event.target.value)}/>
                        </div>
                    </div>
                    <div className='justify-end -mt-8 mb-8 hidden last-name-error'>
                        <p className='text-md text-red-500'>Molimo unesite ispravno prezime.</p>
                    </div>
                    <div className='flex rounded-sm shadow-md mb-10 relative'>
                        <div className='flex justfiy-center align-middle bg-gray-200 p-2'>
                            <BsFillPersonFill size={35} />
                        </div>
                        <div className='w-full'>
                            <input className='w-full h-full pl-4 focus:outline-none text-xl'
                                placeholder='Nadimak'
                                type="text"
                                value={user.nickname}
                                onChange={(event) => handleInputChange("nickname", event.target.value)}/>
                        </div>
                    </div>
                    <div className='justify-end -mt-8 mb-8 hidden nickname-error'>
                        <p className='text-md text-red-500'>Molimo unesite ispravan nadimak.</p>
                    </div>
                    <div className='flex rounded-sm shadow-md mb-10'>
                        <div className='flex justfiy-center align-middle bg-gray-200 p-2'>
                            <AiOutlineMail size={35} />
                        </div>
                        <div className='w-full'>
                            <input className='w-full h-full pl-4 focus:outline-none text-xl'
                                disabled
                                placeholder='Email'
                                type="email"
                                value={user.email}
                                onChange={(event) => handleInputChange("email", event.target.value)}/>
                        </div>
                    </div>
                    <div className='flex rounded-sm shadow-md mb-10 relative'>
                        <div className='flex justfiy-center align-middle bg-gray-200 p-2'>
                            <RiLockPasswordLine size={35} />
                        </div>
                        <div className='w-full'>
                            <input className='w-full h-full pl-4 focus:outline-none text-xl'
                                placeholder='Lozinka'
                                type="password"
                                value={user.password}
                                onChange={(event) => handleInputChange("password", event.target.value)}/>
                        </div>
                    </div>
                    <div className='justify-end -mt-8 mb-8 hidden password-error'>
                        <p className='text-md text-red-500'>Lozinka mora imati barem 8 znakova.</p>
                    </div>
                    <div className='flex rounded-sm shadow-md mb-10 relative'>
                        <div className='flex justfiy-center align-middle bg-gray-200 p-2'>
                            <RiLockPasswordLine size={35} />
                        </div>
                        <div className='w-full'>
                            <input className='w-full h-full pl-4 focus:outline-none text-xl'
                                placeholder='Potvrdi lozinku'
                                type="password"
                                value={user.repeat_password}
                                onChange={(event) => handleInputChange("repeat_password", event.target.value)}/>
                        </div>
                    </div>
                    <div className='justify-end -mt-8 mb-8 hidden repeat-password-error'>
                        <p className='text-md text-red-500'>Lozinke se ne podudaraju.</p>
                    </div>
                    <div className='flex rounded-sm shadow-md mb-10'>
                        <div className='flex justfiy-center align-middle bg-gray-200 p-2'>
                            <BsCreditCard2BackFill size={35} />
                        </div>
                        <div className='w-full'>
                            <input className='w-full h-full pl-4 focus:outline-none text-xl'
                                placeholder='Broj kartice'
                                type="text"
                                value={user.cardNumber}
                                onChange={(event) => handleInputChange("cardNumber", event.target.value)}/>
                        </div>
                    </div>
                    <div className='justify-end -mt-8 mb-8 hidden card-error'>
                        <p className='text-md text-red-500'>Molimo unesite ispravan broj kartice.</p>
                    </div>
                    <div className='flex justify-center px-10 py-8'>
                        <button type='button' className='text-xl font-semibold px-8 py-3 bg-blue-500 text-white rounded-xl' onClick={updateUser} >Potvrdi</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default UpdateProfileComponent;