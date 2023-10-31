import React, { useState } from 'react';

const RentalComponent = () => {
    const [location, setLocation] = useState('');
    const [returnLocation, setReturnLocation] = useState('');
    const [returnTime, setReturnTime] = useState('');
    const [pricePerKilometer, setPrice] = useState('');
    const [lateReturnFee, setFee] = useState('');
    const [images, setImages] = useState([]);

    const handleImageUpload = (event) => {
        // Implementirajte logiku za otpremanje slika ovdje
      };
    
      const handlePublish = () => {
        // Implementirajte logiku za objavljivanje ponude za iznajmljivanje ovdje
      };

      const setPricePerKilometer = () => {
        // Implementirajte logiku za objavljivanje ponude za iznajmljivanje ovdje
      };
      const setLateReturnFee = () => {
        // Implementirajte logiku za objavljivanje ponude za iznajmljivanje ovdje
      };

    return (
      <>
      <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-semibold mb-4">Postavite svoj romobil za iznajmljivanje</h1>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">Lokacija romobila:</label>
          <input
            type="text"
            className="w-full py-2 px-3 focus:outline-none rounded-md border"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">Lokacija povratka romobila:</label>
          <input
            type="text"
            className="w-full py-2 px-3 focus:outline-none rounded-md border"
            value={returnLocation}
            onChange={(e) => setReturnLocation(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">Vrijeme povratka:</label>
          <input
            type="text"
            className="w-full py-2 px-3 focus:outline-none rounded-md border"
            value={returnTime}
            onChange={(e) => setReturnTime(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">Cijena po prijeđenom kilometru:</label>
          <input
            type="text"
            className="w-full py-2 px-3 focus:outline-none rounded-md border"
            value={pricePerKilometer}
            onChange={(e) => setPricePerKilometer(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">Iznos novčane kazne za kašnjenje:</label>
          <input
            type="text"
            className="w-full py-2 px-3 focus:outline-none rounded-md border"
            value={lateReturnFee}
            onChange={(e) => setLateReturnFee(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">Slike romobila:</label>
          <input
            type="file"
            multiple
            className="w-full py-2 px-3 focus:outline-none rounded-md border"
            onChange={handleImageUpload}
          />
        </div>

        <div className="mb-4">
          <button
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={handlePublish}
          >
            Objavi ponudu za iznajmljivanje
          </button>
        </div>
      </div>
    </div>
      </>
    );
};


export default RentalComponent;