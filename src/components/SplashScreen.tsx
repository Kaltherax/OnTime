import React, { useState, useEffect } from 'react';

const SplashScreen = () => {
  const [busState, setBusState] = useState('initial'); // 'initial', 'entering', 'exiting'
  const [titleVisible, setTitleVisible] = useState(false);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [dotsVisible, setDotsVisible] = useState(false);

  useEffect(() => {
    const sequence = async () => {
      // 1. Bus enters
      setBusState('entering');
      await new Promise(resolve => setTimeout(resolve, 2500));

      // 2. Show title
      setTitleVisible(true);
      await new Promise(resolve => setTimeout(resolve, 500));

      // 3. Bus waits
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 4. Bus exits and subtitle appears
      setBusState('exiting');
      setSubtitleVisible(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // 5. Show loading dots
      await new Promise(resolve => setTimeout(resolve, 700)); // Adjusted delay
      setDotsVisible(true);
    };

    sequence();
  }, []);

  return (
    <div className="splash-container-full">
      <div className={`bus-icon ${busState}`}>
        {/* Using an SVG for a crisp, scalable bus icon */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-24 h-24 text-blue-500">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.5 5H18v2h-1.5V7zM6 7h1.5v2H6V7zm6 11.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
          <path d="M12 11.5c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" opacity=".3"/>
          <path d="M18.39 6.51l-1.42 1.42c.36.36.66.77.9 1.21L19.3 7.7a8.94 8.94 0 00-1.01-.99zM6.03 7.7l1.42 1.42c.24-.44.54-.85.9-1.21L6.93 6.51a8.94 8.94 0 00-1 .99z"/>
        </svg>
      </div>

      <div className="text-content">
        <h1 id="mainTitle" className={titleVisible ? 'visible' : ''}>On Time</h1>
        <p id="subtitle" className={subtitleVisible ? 'visible' : ''}>
          Forget about guessing where your college bus is now
        </p>
        <div id="loadingDots" className={dotsVisible ? 'visible' : ''}>
          <span>.</span><span>.</span><span>.</span>
        </div>
      </div>

      <style>{`
        .splash-container-full {
          position: fixed;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: #f9fafb;
          z-index: 9999;
          overflow: hidden;
        }

        .bus-icon {
          transform: translateX(-100vw) scale(0.8);
          filter: drop-shadow(0 4px 20px rgba(59, 130, 246, 0.3));
          transition: transform 2.5s cubic-bezier(0.25, 1, 0.5, 1);
          margin-bottom: 2rem; /* Add some space between bus and text */
        }

        .bus-icon.entering {
          transform: translateX(0) scale(1);
        }

        .bus-icon.exiting {
          transition: transform 0.8s cubic-bezier(0.5, 0, 0.75, 0);
          transform: translateX(100vw) scale(0.8);
        }

        .text-content {
          text-align: center;
          /* position: absolute; */ /* 👈 THIS LINE IS REMOVED */
          width: 100%;
          padding: 0 20px;
        }

        #mainTitle, #subtitle, #loadingDots {
          opacity: 0;
          transition: opacity 0.8s ease-in-out;
        }

        #mainTitle.visible, #subtitle.visible, #loadingDots.visible {
          opacity: 1;
        }

        #mainTitle {
          font-size: 3rem;
          font-weight: 800;
          color: #2563eb;
          margin-bottom: 0.5rem;
        }

        #subtitle {
          font-size: 1.125rem;
          color: #4b5563;
          margin-bottom: 2rem;
        }

        #loadingDots span {
          animation: blink 1.4s infinite both;
          font-size: 2rem;
          font-weight: bold;
          color: #9ca3af;
        }

        #loadingDots span:nth-child(2) {
          animation-delay: 0.2s;
        }

        #loadingDots span:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes blink {
          0%, 80%, 100% { opacity: 0; }
          40% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
