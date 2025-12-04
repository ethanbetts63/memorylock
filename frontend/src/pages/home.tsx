import heroImage from '../assets/hero.webp';
import { ProductCarousel } from '../components/ProductCarousel';
import Pricing from '../components/Pricing';
import { Faq } from '../components/Faq';
import { Letter } from '../components/Letter';
import { CtaCard } from '../components/CtaCard';

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
      <section className="bg-gray-50 mb-16">
        <ProductCarousel />
      </section>

      {/* --- Main Content & Sticky Sidebar --- */}
      <div className="container mx-auto px-4 lg:grid lg:grid-cols-3 lg:gap-8">
        
        {/* Main Content Column (2/3 width) */}
        <div className="lg:col-span-2">
          <Letter />
          <section className="bg-gray-50 py-8">
            <Pricing />
          </section>
          <section className="bg-gray-50 py-16">
            <div className="container mx-auto px-4">
              <Faq 
                title="Frequently Asked Questions"
                page="home"
                imageSrc={heroImage}
                imageAlt="Abstract representation of questions"
              />
            </div>
          </section>
        </div>

        {/* Sticky Sidebar Column (1/3 width) */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <CtaCard />
          </div>
        </aside>

      </div>
    </main>
  );
};

export default HomePage;