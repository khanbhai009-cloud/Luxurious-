import { useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import ReviewCard from '../components/ReviewCard';
import VIPDeal from '../components/VIPDeal';
import Footer from '../components/Footer';
import { AppContext } from '../context/AppContext';

export default function Home() {
  const { products } = useContext(AppContext);

  return (
    <Layout>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <VIPDeal />
        
        <section className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">🔥 TRENDING NOW 🔥</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From vintage vibes to futuristic fashion, we've curated the coolest outfits and accessories that Gen Z is rocking right now.
          </p>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">💖 100% SATISFIED CUSTOMERS 💖</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of happy Gen Z shoppers who found their perfect style
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ReviewCard 
              name="Alexis T." 
              rating={5} 
              comment="The vintage band tee is everything! Perfect fit and amazing quality. Will definitely shop again!" 
            />
            <ReviewCard 
              name="Jordan P." 
              rating={5} 
              comment="These faux leather pants changed my life! So comfy and stylish. The VIP deal was insane!" 
            />
            <ReviewCard 
              name="Taylor M." 
              rating={5} 
              comment="100% satisfied! The outfit lender made my festival look so easy. Shipping was super fast too." 
            />
          </div>
          
          <div className="mt-12 text-center">
            <div className="inline-flex items-center bg-green-100 text-green-800 rounded-full px-6 py-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-bold text-lg">100% Satisfaction Guarantee</span>
            </div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              We stand by the quality of every item we offer. If you're not completely satisfied, we'll make it right!
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </Layout>
  );
}
