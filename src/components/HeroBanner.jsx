import React from 'react';

function HeroBanner() {
  return (
    <section className="flex flex-col items-center justify-center h-[80vh] bg-blue-100 text-center p-6">
      <h1 className="text-5xl font-bold mb-4">Welcome to Vantage</h1>
      <p className="text-lg mb-6">The ultimate solution for your needs</p>
      <button className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600">
        Get Started
      </button>
    </section>
  );
}

export default HeroBanner;
