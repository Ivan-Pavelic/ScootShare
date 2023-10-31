import React, { useState } from 'react';

const AdComponent = () => {

    return (
<body className="bg-blue-50">
  <div className="container mx-auto py-8">
    <h1 className="text-2xl font-semibold text-blue-600 mb-4">Oglas</h1>
    
    <div className="bg-white rounded-lg shadow-md p-6 flex">
      
      <div className="w-1/2">
        <h3 className="text-lg font-semibold mb-2 text-blue-800">Slike romobila</h3>
        <div className="grid grid-cols-2 gap-4">
          
        </div>
      </div>
      
     
      <div className="w-1/2 pl-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-blue-800">Romobil za iznajmljivanje</h2>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Trenutna lokacija:</label>
          <p className="text-gray-800">Vaša trenutna lokacija</p>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Lokacija povratka:</label>
          <p className="text-gray-800">Lokacija na koju se romobil vraća</p>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Vrijeme povratka:</label>
          <p className="text-gray-800">Vrijeme do kada se romobil treba vratiti</p>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Cijena po kilometru:</label>
          <p className="text-gray-800">$0.15 po kilometru</p>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Iznos kazne za nevraćanje:</label>
          <p className="text-gray-800">$20 u slučaju nevraćanja na vrijeme</p>
        </div>
        <div className="mb-4">
           <a href="" className="text-blue-500"><i className="fas fa-envelope text-base mr-2">Pošalji poruku vlasniku</i></a>
        </div>

        <button className="btn-reserve bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Rezerviraj</button>


      </div>
    </div>
  </div>
</body>

    );
};

export default AdComponent;