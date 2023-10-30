import React from 'react';

const NavigationComponent = () => {
    return (
        <div className='flex justify-between items-center bg-slate-800 py-6 px-28'>
            <div className=''>
                <p className='text-4xl text-white font-bold'>ScootShare</p>
            </div>
            <div>
                <button className='text-white bg-cyan-600 rounded-3xl py-3 px-8'>Registracija</button>
            </div>
        </div>
    );
};

export default NavigationComponent;