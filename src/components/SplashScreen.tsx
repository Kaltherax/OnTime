import React, { useState, useEffect } from 'react';

const SplashScreen = () => {
  const [textVisible, setTextVisible] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    const sequence = async () => {
      // 1. Fade in text
      await new Promise(resolve => setTimeout(resolve, 500));
      setTextVisible(true);

      // 2. Wait for 2 seconds while text is visible
      await new Promise(resolve => setTimeout(resolve, 2000));

      // 3. Start fading out
      setFadingOut(true);
    };

    sequence();
  }, []);

  return (
    <div className={`splash-container-full ${fadingOut ? 'fading-out' : ''}`}>
      <div className="text-content">
        <h1 id="mainTitle" className={textVisible ? 'visible' : ''}>On Time</h1>
        <p id="subtitle" className={textVisible ? 'visible' : ''}>
          Forget about guessing where your college bus is now
        </p>
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
          opacity: 1;
          transition: opacity 1s ease-in-out;
        }

        .splash-container-full.fading-out {
          opacity: 0;
        }

        .text-content {
          text-align: center;
          width: 100%;
          padding: 0 20px;
        }

        #mainTitle, #subtitle {
          opacity: 0;
          transition: opacity 1.5s ease-in-out;
        }

        #mainTitle.visible, #subtitle.visible {
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
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
