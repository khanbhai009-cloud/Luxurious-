// pages/index.js
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';

export default function FashionEmpire() {
  const [savedItems, setSavedItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [theme, setTheme] = useState('default');
  const [glitterMode, setGlitterMode] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const emojiContainerRef = useRef(null);
  
  const products = [
    // Updated with new affiliate links
    {
      id: 1,
      title: "Vintage Band Tees",
      description: "Rock the retro vibes with authentic distressed band tees that scream attitude!",
      price: "$3.99",
      image: "https://envs.sh/nf.jpg/IMG2025080223.jpg",
      link: "https://bitli.in/1S4kh1u"
    },
    {
      id: 2,
      title: "Faux Leather Pants",
      description: "Edgy and eco-friendly - slay the night without harming animals!",
      price: "$4.99",
      image: "https://envs.sh/nO.jpg/IMG20250802322.jpg",
      link: "https://bitli.in/2SCvOYj"
    },
    {
      id: 3,
      title: "Y2K Graphic Tees",
      description: "Bring back the 2000s with nostalgic graphics and oversized fits!",
      price: "$2.99",
      image: "https://envs.sh/ny.jpg/IMG20250802322.jpg",
      link: "https://bitli.in/Goq5eTD"
    },
    {
      id: 4,
      title: "Oversized Blazer",
      description: "Power dressing made cool - perfect for meetings or memes!",
      price: "$4.49",
      image: "https://envs.sh/nH.jpg/IMG20250802456.jpg",
      link: "https://bitli.in/4cmL4uw"
    },
    {
      id: 5,
      title: "Biker Shorts",
      description: "From gym to brunch - the ultimate versatile staple!",
      price: "$1.99",
      image: "https://envs.sh/ng.jpg/IMG20250802640.jpg",
      link: "https://bitli.in/mF3KwXK"
    },
    {
      id: 6,
      title: "Chunky Dad Sneakers",
      description: "Comfort meets style - walk all day in these hype beasts!",
      price: "$4.99",
      image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80",
      link: "https://bitli.in/xxJwRYC"
    },
    {
      id: 7,
      title: "Oversized Graphics Hoodies",
      description: "Snuggle up in style - perfect for cozy days and colder nights!",
      price: "$3.99",
      image: "https://envs.sh/na.jpg/IMG20250802250.jpg",
      link: "https://bitli.in/wZioAac"
    },
    {
      id: 8,
      title: "Sequined Mini Dress",
      description: "Sparkle like a star - guaranteed to turn heads at any event!",
      price: "$4.99",
      image: "https://envs.sh/nm.jpg/IMG2025080295.jpg",
      link: "https://bitli.in/oSls67D"
    },
    {
      id: 9,
      title: "Knee High Boots",
      description: "Legs for days - the ultimate confidence boosters!",
      price: "$5.00",
      image: "https://envs.sh/nM.jpg/IMG20250802941.jpg",
      link: "https://bitli.in/bxvT2ce"
    },
    {
      id: 10,
      title: "Fabric Paints",
      description: "DIY your drip - customize your clothes like a pro!",
      price: "$1.49",
      image: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80",
      link: "https://bitli.in/c3anXUi"
    },
    {
      id: 11,
      title: "Distressed Jeans",
      description: "Effortlessly cool - ripped and ready for adventures!",
      price: "$3.49",
      image: "https://envs.sh/nN.jpg/IMG20250802339.jpg",
      link: "https://bitli.in/iYVtQyi"
    },
    {
      id: 12,
      title: "Curl Defining Cream",
      description: "Lock in perfect spirals - frizz-free definition that lasts all day!",
      price: "$4.99",
      image: "https://envs.sh/n-.jpg/IMG2025080216.jpg",
      link: "https://bitli.in/5z3NLoZ"
    },
    {
      id: 13,
      title: "Shine Spray",
      description: "Instant gloss boost - get that red carpet glow in seconds!",
      price: "$2.49",
      image: "https://envs.sh/nX.jpg/IMG20250802339.jpg",
      link: "https://bitli.in/HoXbKv0"
    },
    {
      id: 14,
      title: "Hair Plastic Bands",
      description: "No-snag ties - keep your style tight without breakage!",
      price: "$1.29",
      image: "https://envs.sh/nV.jpg/IMG20250802478.jpg",
      link: "https://bitli.in/Y4cbxN2"
    },
    {
      id: 15,
      title: "Detangling Spray",
      description: "Brush through knots like butter - pain-free styling starts here!",
      price: "$3.99",
      image: "https://envs.sh/n6.jpg/IMG20250802538.jpg",
      link: "https://bitli.in/z2fmw1i"
    },
    {
      id: 16,
      title: "Light Hold Hair Gel",
      description: "Flexible control - shape without stiffness or crunch!",
      price: "$2.99",
      image: "https://envs.sh/nv.jpg/IMG20250802186.jpg",
      link: "https://bitli.in/F6NotdR"
    },
    {
      id: 17,
      title: "Hair Glitter Spray",
      description: "Sparkle on demand - festival-ready shine in seconds!",
      price: "$4.49",
      image: "https://envs.sh/nx.jpg/IMG20250802827.jpg",
      link: "https://bitli.in/ZHsyKvV"
    }
  ];

  // Initialize saved items from localStorage
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('savedOutfits')) || [];
    setSavedItems(storedItems);
    
    // Initialize countdown timer
    updateCountdown();
    const timerId = setInterval(updateCountdown, 1000);
    return () => clearInterval(timerId);
  }, []);

  // Save to localStorage whenever savedItems changes
  useEffect(() => {
    localStorage.setItem('savedOutfits', JSON.stringify(savedItems));
  }, [savedItems]);

  // Update saved items
  const toggleSaveItem = (id) => {
    const product = products.find(p => p.id === id);
    const isSaved = savedItems.some(item => item.id === id);
    
    if (isSaved) {
      setSavedItems(savedItems.filter(item => item.id !== id));
    } else {
      setSavedItems([...savedItems, product]);
    }
  };

  // Countdown timer logic
  const updateCountdown = () => {
    const now = new Date();
    const endTime = new Date(now);
    endTime.setHours(now.getHours() + 12); // 12-hour flash sale
    
    const distance = endTime - now;
    
    if (distance <= 0) {
      return;
    }
    
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);
    
    setTimeLeft({ hours, minutes, seconds });
  };

  // Generate original price for strikethrough
  const getOriginalPrice = (currentPrice) => {
    const priceNum = parseFloat(currentPrice.replace('$', ''));
    const originalPrice = (priceNum * (3 + Math.random() * 2)).toFixed(2);
    return `$${originalPrice}`;
  };

  // Affiliate link click handler
  const handleAffiliateClick = (e, link) => {
    e.preventDefault();
    
    // Trigger glitter mode
    setGlitterMode(true);
    setTimeout(() => setGlitterMode(false), 1000);
    
    // Create fire animation
    createEmojiAnimation('🔥', e.clientX, e.clientY);
    
    // Open link after animation
    setTimeout(() => {
      window.open(link, '_blank');
    }, 800);
  };

  // Create emoji animation at click position
  const createEmojiAnimation = (emoji, x, y) => {
    const emojiElement = document.createElement('div');
    emojiElement.className = 'emoji-animation';
    emojiElement.textContent = emoji;
    emojiElement.style.left = `${x}px`;
    emojiElement.style.top = `${y}px`;
    document.body.appendChild(emojiElement);
    
    setTimeout(() => {
      emojiElement.remove();
    }, 2000);
  };

  // Theme classes
  const getThemeClass = () => {
    switch(theme) {
      case 'dark': return 'dark-mode';
      case 'y2k': return 'y2k-mode';
      case 'grunge': return 'grunge-mode';
      default: return '';
    }
  };

  return (
    <div className={`min-h-screen ${getThemeClass()}`}>
      <Head>
        <title>FASHION EMPIRE | Express Your Style</title>
        <meta name="description" content="Premium fashion items at unbeatable prices" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </Head>
      
      {/* Glitter Overlay */}
      {glitterMode && (
        <div className="glitter-overlay"></div>
      )}
      
      {/* Header */}
      <header className="header-gradient py-16 text-center relative overflow-hidden">
        <div className="floating-items">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i} 
              className="floating-item" 
              style={{
                width: `${[50, 30, 40, 60, 20][i]}px`,
                height: `${[50, 30, 40, 60, 20][i]}px`,
                left: `${[10, 25, 50, 70, 85][i]}%`,
                animationDelay: `${[0,2,4,1,3][i]}s`,
                animationDuration: `${[15,12,15,18,10][i]}s`
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto relative z-10 px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">🔥 FASHION EMPIRE 🔥</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Where Style Meets Attitude - Shop the Vibe!
          </p>
          
          <div className="flex justify-center space-x-6">
            <a href="https://t.me/imFINISHER" target="_blank" className="social-link">
              <i className="fab fa-telegram"></i>
            </a>
            <a href="https://pin.it/3jHxrZPrn" target="_blank" className="social-link">
              <i className="fab fa-pinterest"></i>
            </a>
            <a href="https://www.instagram.com/smile_issunaah?igsh=MWR5aWxoejh1NzAxNA==" target="_blank" className="social-link">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto py-12 px-4">
        {/* VIP Deal */}
        <div className="vip-deal rounded-xl mb-12">
          <div className="text-xl font-bold mb-2">🔥 VIP FLASH DEAL! 🔥</div>
          <div className="mb-4">All items $1-$5 - LIMITED TIME ONLY!</div>
          
          <div className="countdown">
            <div className="countdown-item">
              <span>{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="countdown-label">HOURS</span>
            </div>
            <div className="countdown-item">
              <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="countdown-label">MIN</span>
            </div>
            <div className="countdown-item">
              <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
              <span className="countdown-label">SEC</span>
            </div>
          </div>
        </div>
        
        {/* Intro */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">🔥 TRENDING NOW 🔥</h2>
          <p className="text-lg max-w-3xl mx-auto">
            From vintage vibes to futuristic fashion, we've curated the coolest outfits 
            and accessories that are rocking right now. Click to shop your favorites!
          </p>
        </div>
        
        {/* Product Grid */}
        <div className="products-grid">
          {products.map((product, index) => {
            const isSaved = savedItems.some(item => item.id === product.id);
            const originalPrice = getOriginalPrice(product.price);
            
            return (
              <div key={product.id} className="product-card">
                {index < 3 && (
                  <div className="trending-badge">TRENDING 🔥</div>
                )}
                
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="product-image"
                />
                
                <div className="product-info">
                  <h3 className="product-title">{product.title}</h3>
                  <p className="product-description">{product.description}</p>
                  <p className="product-price">
                    {product.price} 
                    <span className="original-price">{originalPrice}</span>
                  </p>
                  
                  <a 
                    href={product.link} 
                    className="btn"
                    onClick={(e) => handleAffiliateClick(e, product.link)}
                  >
                    GRAB IT NOW!
                  </a>
                </div>
                
                <button 
                  className={`save-btn ${isSaved ? 'saved' : ''}`}
                  onClick={() => toggleSaveItem(product.id)}
                >
                  <i className="fas fa-heart"></i>
                </button>
              </div>
            );
          })}
        </div>
      </main>
      
      {/* Floating Saved Items Button */}
      <button 
        className="saved-items-btn"
        onClick={() => setShowModal(true)}
      >
        <i className="fas fa-heart"></i>
        {savedItems.length > 0 && (
          <span className="saved-count">{savedItems.length}</span>
        )}
      </button>
      
      {/* Theme Toggle */}
      <div 
        className="theme-toggle"
        onClick={() => {
          const themes = ['default', 'dark', 'y2k', 'grunge'];
          const currentIndex = themes.indexOf(theme);
          setTheme(themes[(currentIndex + 1) % themes.length]);
        }}
      >
        <i className="fas fa-palette"></i>
      </div>
      
      {/* Saved Items Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Your Saved Items</h2>
              <span className="close-modal" onClick={() => setShowModal(false)}>×</span>
            </div>
            
            <div className="saved-items-container">
              {savedItems.length === 0 ? (
                <div className="empty-saved">
                  <p>You haven't saved any items yet.</p>
                </div>
              ) : (
                <div className="saved-items-grid">
                  {savedItems.map(product => {
                    const originalPrice = getOriginalPrice(product.price);
                    
                    return (
                      <div key={product.id} className="product-card">
                        <img 
                          src={product.image} 
                          alt={product.title} 
                          className="product-image"
                        />
                        
                        <div className="product-info">
                          <h3 className="product-title">{product.title}</h3>
                          <p className="product-description">{product.description}</p>
                          <p className="product-price">
                            {product.price} 
                            <span className="original-price">{originalPrice}</span>
                          </p>
                          
                          <a 
                            href={product.link} 
                            className="btn"
                            onClick={(e) => handleAffiliateClick(e, product.link)}
                          >
                            GRAB YOURS NOW!
                          </a>
                        </div>
                        
                        <button 
                          className="save-btn saved"
                          onClick={() => toggleSaveItem(product.id)}
                        >
                          <i className="fas fa-heart"></i>
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Footer */}
      <footer className="py-12 text-center">
        <p>© 2023 Fashion Empire - Express Yourself!</p>
        
        <div className="footer-links mt-6">
          <a href="https://t.me/imFINISHER" target="_blank">Contact</a>
          <a href="https://pin.it/3jHxrZPrn" target="_blank">Pinterest</a>
          <a href="https://www.instagram.com/smile_issunaah?igsh=MWR5aWxoejh1NzAxNA==" target="_blank">Instagram</a>
        </div>
      </footer>
      
      <style jsx global>{`
        :root {
          --primary: #ff4d89;
          --secondary: #6e45e2;
          --dark: #1a1a2e;
          --light: #f8f9fa;
          --accent: #00ff88;
          --text: #333;
          --card-bg: #fff;
          --header-gradient: linear-gradient(135deg, var(--primary), var(--secondary));
          --glitter: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="none"/><path fill="gold" d="M20,20 L30,10 L40,20 L30,30 Z" opacity="0.8"/><path fill="pink" d="M60,60 L70,50 L80,60 L70,70 Z" opacity="0.6"/></svg>');
        }

        /* Dark mode */
        .dark-mode {
          --light: #1a1a2e;
          --dark: #f8f9fa;
          --text: #f0f0f0;
          --card-bg: #252540;
          --header-gradient: linear-gradient(135deg, #8a2387, #e94057, #f27121);
        }

        /* Y2K mode */
        .y2k-mode {
          --primary: #ff00ff;
          --secondary: #00ffff;
          --accent: #ffff00;
          --header-gradient: linear-gradient(135deg, #ff00ff, #00ffff);
        }

        /* Grunge mode */
        .grunge-mode {
          --primary: #8b4513;
          --secondary: #556b2f;
          --accent: #d2691e;
          --header-gradient: linear-gradient(135deg, #5d4037, #795548);
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Poppins', sans-serif;
        }
        
        body {
          background-color: var(--light);
          color: var(--text);
          overflow-x: hidden;
          transition: background 0.5s ease;
        }
        
        .header-gradient {
          background: var(--header-gradient);
          color: white;
          padding: 2rem 0;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        
        .floating-items {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          overflow: hidden;
        }
        
        .floating-item {
          position: absolute;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          animation: float 15s infinite linear;
        }
        
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-1000px) rotate(720deg);
            opacity: 0;
          }
        }
        
        .social-link {
          color: white;
          font-size: 1.5rem;
          transition: transform 0.3s, color 0.3s;
          display: inline-block;
        }
        
        .social-link:hover {
          transform: translateY(-5px);
          color: var(--accent);
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }
        
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }
        
        .product-card {
          background: var(--card-bg);
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
          transition: all 0.5s ease;
          position: relative;
          animation: cardAppear 0.5s ease-out forwards;
          opacity: 0;
          perspective: 1000px;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        
        @keyframes cardAppear {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .product-card:hover {
          transform: translateY(-10px) rotateY(5deg);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
        }
        
        .product-image {
          height: 250px;
          width: 100%;
          object-fit: cover;
          transition: transform 0.5s;
        }
        
        .product-card:hover .product-image {
          transform: scale(1.05) rotateZ(1deg);
        }
        
        .product-info {
          padding: 1.5rem;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }
        
        .product-title {
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
          color: var(--text);
          font-weight: 600;
        }
        
        .product-description {
          font-size: 0.9rem;
          margin-bottom: 1rem;
          color: #666;
          flex-grow: 1;
        }
        
        .product-price {
          color: var(--primary);
          font-weight: bold;
          margin-bottom: 1rem;
          font-size: 1.1rem;
        }
        
        .original-price {
          text-decoration: line-through;
          color: #999;
          font-size: 0.9rem;
          margin-left: 8px;
        }
        
        .btn {
          display: inline-block;
          padding: 0.8rem 1.5rem;
          background: linear-gradient(to right, var(--primary), var(--secondary));
          color: white;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          text-decoration: none;
          font-weight: bold;
          transition: all 0.3s ease;
          text-align: center;
          width: 100%;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-size: 0.9rem;
          position: relative;
          overflow: hidden;
          margin-top: auto;
        }
        
        .btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
          background: linear-gradient(to right, var(--primary), var(--secondary));
        }
        
        .btn::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: rgba(255, 255, 255, 0.1);
          transform: rotate(30deg);
          transition: all 0.6s ease;
        }
        
        .btn:hover::after {
          transform: rotate(30deg) translate(0, 100%);
        }
        
        .save-btn {
          position: absolute;
          top: 15px;
          right: 15px;
          background: rgba(255, 255, 255, 0.9);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s;
          border: none;
          color: var(--dark);
          z-index: 2;
        }
        
        .save-btn.saved {
          color: var(--primary);
        }
        
        .save-btn:hover {
          background: white;
          transform: scale(1.1);
        }
        
        .saved-items-btn {
          position: fixed;
          bottom: 30px;
          right: 30px;
          background: linear-gradient(to right, var(--primary), var(--secondary));
          color: white;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
          z-index: 100;
          transition: all 0.3s;
        }
        
        .saved-items-btn:hover {
          transform: scale(1.1);
        }
        
        .saved-count {
          position: absolute;
          top: -5px;
          right: -5px;
          background: var(--accent);
          color: var(--dark);
          width: 25px;
          height: 25px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: bold;
        }
        
        .modal {
          display: flex;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.7);
          z-index: 1000;
          overflow-y: auto;
          justify-content: center;
          align-items: center;
        }
        
        .modal-content {
          background: var(--card-bg);
          padding: 2rem;
          border-radius: 15px;
          max-width: 800px;
          width: 90%;
          animation: modalAppear 0.3s ease-out;
          max-height: 90vh;
          overflow-y: auto;
        }
        
        @keyframes modalAppear {
          from { opacity: 0; transform: translateY(-50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        
        .close-modal {
          font-size: 1.5rem;
          cursor: pointer;
          transition: color 0.3s;
        }
        
        .close-modal:hover {
          color: var(--primary);
        }
        
        .saved-items-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1.5rem;
        }
        
        .empty-saved {
          text-align: center;
          padding: 2rem;
          color: #666;
        }
        
        footer {
          background: var(--dark);
          color: white;
          text-align: center;
          padding: 2rem 0;
          margin-top: 3rem;
        }
        
        .footer-links {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin: 1.5rem 0;
        }
        
        .footer-links a {
          color: white;
          text-decoration: none;
          transition: color 0.3s;
        }
        
        .footer-links a:hover {
          color: var(--accent);
        }
        
        .vip-deal {
          background: linear-gradient(to right, var(--primary), var(--secondary));
          color: white;
          text-align: center;
          padding: 1.5rem;
          margin-bottom: 2rem;
          border-radius: 15px;
          animation: pulse 2s infinite;
          position: relative;
          overflow: hidden;
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.02); }
          100% { transform: scale(1); }
        }
        
        .emoji-animation {
          position: fixed;
          pointer-events: none;
          font-size: 2rem;
          z-index: 10000;
          animation: floatUp 2s forwards;
        }
        
        @keyframes floatUp {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) scale(0.5);
            opacity: 0;
          }
        }
        
        .fire-animation {
          position: fixed;
          pointer-events: none;
          font-size: 3rem;
          z-index: 10000;
          animation: fireBurst 1s forwards;
        }
        
        @keyframes fireBurst {
          0% {
            transform: scale(0.5);
            opacity: 1;
          }
          50% {
            transform: scale(1.5);
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }

        /* === NEW STYLES === */
        .glitter-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          background-image: var(--glitter);
          background-size: 200px;
          opacity: 0.3;
          z-index: 9999;
          transition: opacity 0.5s;
        }

        .trending-badge {
          position: absolute;
          top: 15px;
          left: 15px;
          background: linear-gradient(45deg, #ff00cc, #3333ff);
          color: white;
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: bold;
          z-index: 2;
          animation: pulse 1.5s infinite;
          box-shadow: 0 3px 10px rgba(0,0,0,0.2);
        }

        .theme-toggle {
          position: fixed;
          bottom: 100px;
          right: 30px;
          background: var(--dark);
          color: white;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 5px 15px rgba(0,0,0,0.3);
          z-index: 100;
          transition: all 0.3s ease;
        }

        .theme-toggle:hover {
          transform: rotate(20deg) scale(1.1);
        }

        .countdown {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-top: 1rem;
          font-size: 1.5rem;
        }

        .countdown-item {
          background: rgba(0,0,0,0.3);
          padding: 0.5rem 1rem;
          border-radius: 10px;
          min-width: 60px;
        }

        .countdown-label {
          font-size: 0.8rem;
          display: block;
          margin-top: 0.3rem;
        }

        @media (max-width: 900px) {
          .products-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .products-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .theme-toggle {
            bottom: 90px;
            right: 20px;
          }
        }
      `}</style>
    </div>
  );
}
```

