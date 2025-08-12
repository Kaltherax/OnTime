import React from 'react';

const SplashScreen = () => {
  return (
    <div className="loading-overlay">
      <div className="animation-container">
        <div className="scenery">
          <div className="tree tree1"></div>
          <div className="tree tree2"></div>
          <div className="tree tree3"></div>
        </div>
        <div className="road">
          <div className="bus">
            <div className="bus-body">
              <div className="bus-window-front"></div>
              <div className="bus-window-middle"></div>
              <div className="bus-window-back"></div>
              <div className="bus-stripe"></div>
            </div>
            <div className="wheel-front"></div>
            <div className="wheel-back"></div>
          </div>
          <div className="wind-effect wind1"></div>
          <div className="wind-effect wind2"></div>
          <div className="wind-effect wind3"></div>
        </div>
      </div>
      <div className="loading-tagline">
        <p>Forget about guessing where your college bus is now</p>
      </div>

      <style>{`
        .loading-overlay {
          position: fixed;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: rgba(249, 250, 251, 0.9); /* semi-transparent bg-gray-50 */
          z-index: 9999;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }

        .animation-container {
          width: 400px;
          height: 250px;
          background-color: #87CEEB; /* Sky blue */
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          position: relative;
          overflow: hidden;
          border: 2px solid #fff;
        }

        .road {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 25%;
          background: #6B6B6B;
          border-top: 8px solid #4A4A4A;
        }

        .scenery {
          position: absolute;
          bottom: 25%;
          left: 0;
          width: 100%;
          height: 15%;
        }

        .tree {
          position: absolute;
          bottom: 0;
          width: 15px;
          height: 40px;
          background-color: #5D4037; /* Brown for trunk */
          animation: scenery-scroll-contained 3s linear infinite;
        }

        .tree::before {
          content: '';
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          width: 50px;
          height: 50px;
          background-color: #388E3C; /* Green for leaves */
          border-radius: 50%;
        }
        
        .tree::after {
          content: '';
          position: absolute;
          bottom: 45px;
          left: 50%;
          transform: translateX(-50%);
          width: 40px;
          height: 40px;
          background-color: #4CAF50; /* Lighter green */
          border-radius: 50%;
        }

        .tree1 { left: 120%; animation-duration: 4s; }
        .tree2 { left: 150%; animation-duration: 3.5s; animation-delay: 1.5s; }
        .tree3 { left: 180%; animation-duration: 4.2s; animation-delay: 2.5s; }

        .bus {
          position: absolute;
          bottom: 30%;
          left: -150px; /* Start off-screen of container */
          width: 120px;
          height: 60px;
          transform: scale(0.7);
          animation: drive-across-contained 4s ease-in-out infinite;
        }

        .bus-body {
          width: 100%;
          height: 50px;
          background-color: #0277bd; /* A nice blue */
          border-radius: 10px 10px 3px 3px;
          border: 2px solid #01579b;
          position: relative;
        }

        .bus-window-front, .bus-window-middle, .bus-window-back {
          position: absolute;
          top: 8px;
          height: 20px;
          background-color: #B3E5FC;
          border: 2px solid #01579b;
          border-radius: 3px;
        }
        .bus-window-front { left: 10px; width: 25px; }
        .bus-window-middle { left: 40px; width: 40px; }
        .bus-window-back { right: 10px; width: 25px; }
        
        .bus-stripe {
          position: absolute;
          bottom: 10px;
          width: 100%;
          height: 5px;
          background-color: #FFCA28;
        }

        .wheel-front, .wheel-back {
          position: absolute;
          bottom: -10px;
          width: 25px;
          height: 25px;
          background-color: #212121;
          border-radius: 50%;
          border: 3px solid #424242;
          animation: spin 0.5s linear infinite;
        }
        .wheel-front { left: 15px; }
        .wheel-back { right: 15px; }

        .wind-effect {
          position: absolute;
          height: 2px;
          background: linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.5));
          border-radius: 2px;
          animation: wind-streak-contained 0.8s linear infinite;
        }
        .wind1 { top: -40px; left: 110%; width: 60px; animation-duration: 0.6s; }
        .wind2 { top: -20px; left: 130%; width: 90px; animation-duration: 0.8s; animation-delay: 0.2s; }
        .wind3 { top: -50px; left: 120%; width: 50px; animation-duration: 0.5s; animation-delay: 0.5s; }

        .loading-tagline {
          margin-top: 20px;
          text-align: center;
        }

        .loading-tagline p {
          color: #4b5563; /* gray-600 */
          font-size: 1.1rem;
          font-weight: 500;
        }

        @keyframes drive-across-contained {
          0% { transform: translateX(0) scale(0.7); }
          100% { transform: translateX(550px) scale(0.7); } /* 400px container width + buffer */
        }

        @keyframes scenery-scroll-contained {
          0% { transform: translateX(0); }
          100% { transform: translateX(-550px); }
        }

        @keyframes wind-streak-contained {
          0% { transform: translateX(0); }
          100% { transform: translateX(-550px); }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
