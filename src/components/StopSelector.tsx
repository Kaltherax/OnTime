import React, { useState, useEffect } from 'react';

const SplashScreen = () => {
  const [titleVisible, setTitleVisible] = useState(false);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [dotsVisible, setDotsVisible] = useState(false);

  useEffect(() => {
    const sequence = async () => {
      // 1. Show title
      await new Promise(resolve => setTimeout(resolve, 500));
      setTitleVisible(true);

      // 2. Show subtitle
      await new Promise(resolve => setTimeout(resolve, 800));
      setSubtitleVisible(true);
      
      // 3. Show loading dots
      await new Promise(resolve => setTimeout(resolve, 1500));
      setDotsVisible(true);
    };

    sequence();
  }, []);

  return (
    <div className="splash-container-full">
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
          align-items: center;
          justify-content: center;
          background-color: #f9fafb;
          z-index: 9999;
          overflow: hidden;
        }

        .text-content {
          text-align: center;
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
