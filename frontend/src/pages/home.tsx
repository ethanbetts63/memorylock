import heroImage from '../assets/hero.webp';
import faqImage from '../assets/faq_image.png';
import { ProductCarousel } from '../components/ProductCarousel';
import Pricing from '../components/Pricing';
import { Faq } from '../components/Faq';
import { Letter } from '../components/Letter';
import { CtaCard } from '../components/CtaCard';

const HomePage = () => {
  return (
    <main>
      {/* --- Hero Section --- */}
      <section className="container mx-auto px-4 pt-8 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src={heroImage} 
              alt="A locked memory box, symbolizing secure reminders" 
              className="rounded-lg object-cover w-full h-full shadow-2xl"
            />
          </div>
          <div className="text-left">
            <h1 className="text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl md:text-6xl">
              Reminders that don't take silence for an answer.
            </h1>
            <p className="mt-6 text-lg leading-8 text-primary-foreground">
              Calanders don't handle critical events in the distant future. We do. When a critical deadline hits, we don't just ping you—we trigger an <span className= "italic font-bold underline">escalating hierarchy of notifications</span> — from emails and texts to emergency contacts.
            </p>
          </div>
        </div>
      </section>
      
      {/* --- Hierarchy Section --- */}
      <section className="bg-primary mb-16">
        <ProductCarousel />
      </section>

      {/* --- Main Content & Sticky Sidebar --- */}
      <div className="container mx-auto px-4 lg:grid lg:grid-cols-3 lg:gap-8">
        
        {/* Main Content Column (2/3 width) */}
        <div className="lg:col-span-2 bg-primary text-primary-foreground rounded-lg p-8 flex flex-col gap-8">
          <Letter />
          <section>
            <Pricing />
          </section>
          <section className="bg-white text-gray-900 rounded-lg">
            <div className="container mx-auto px-4">
              <Faq 
                title="The Fine Print (Plain English)"
                page="home"
                imageSrc={faqImage}
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