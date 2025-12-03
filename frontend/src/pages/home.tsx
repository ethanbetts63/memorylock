import React from 'react';
import heroImage from '../assets/hero.png';
import { ProductCarousel } from '../components/ProductCarousel';
import Pricing from '../components/Pricing';

const HomePage = () => {
  return (
    <main>
      {/* --- Hero Section --- */}
      <section className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src={heroImage} 
              alt="A locked memory box, symbolizing secure reminders" 
              className="rounded-lg object-cover w-full h-full shadow-2xl"
            />
          </div>
          <div className="text-left">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              Set it once. Never forget it. Ever.
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              For deadlines and events so important they can't be missed, MemoryLock provides a guarantee. We use an escalating hierarchy of notifications — from emails and texts to direct calls and outreach to your designated contacts — to ensure your reminder is acknowledged.
            </p>
          </div>
        </div>
      </section>

      {/* --- Hierarchy Section --- */}
      <section className="bg-gray-50">
        <ProductCarousel />
      </section>

      {/* --- Pricing Section --- */}
      <section>
        <Pricing />
      </section>
    </main>
  );
};

export default HomePage;