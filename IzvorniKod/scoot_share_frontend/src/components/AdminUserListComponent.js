import React, { useState } from 'react';

const AdminUserListComponent = () => {

    const [file, setFile] = useState("");

    return (
    <div className='mx-auto w-3/5 mt-16'>    
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className='flex justify-center my-10 text-3xl font-semibold'>
                Pregled svih korisnika
            </div>
            <div className="flex justify-center pb-4 bg-white dark:bg-gray-900">
                <label htmlFor="table-search" className="sr-only">Search</label>
                <div className="relative mt-1">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="text" id="table-search" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Pretraga korisnika"/>
                </div>
            </div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Ime
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Prezime
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Nadimak
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Osobna iskaznica
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Potvrda o nekažnjavanju
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Izrbiši korisnika
                        </th>
                    </tr>
                </thead>
                <tbody>     
                    <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Marko
                        </th>
                        <td className="px-6 py-4">
                            Perić
                        </td>
                        <td className="px-6 py-4">
                            Markec
                        </td>
                        <td className="px-6 py-4">
                            markoperic@gmail.com
                        </td>
                        <td className="px-6 py-4">
                            <label className='focus:outline-none cursor-pointer'>
                                Osobna Iskaznica
                                <input className='hidden'
                                    type="file"
                                    accept='image/*'
                                    defaultValue={file}/>
                            </label>
                        </td>
                        <td className="px-6 py-4">
                            <label className='focus:outline-none cursor-pointer'>
                                Potvrda o nekažnjavanju
                                <input className='hidden'
                                    type="file"
                                    accept='image/*'
                                    defaultValue={file}/>
                            </label>
                        </td>
                        <td className="px-6 py-4">
                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Izbriši</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    );
};

export default AdminUserListComponent;