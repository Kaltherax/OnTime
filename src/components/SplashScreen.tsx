import React from 'react';

const SplashScreen = () => {
  return (
    <div className="splash-screen-full">
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
      <div className="splash-tagline">
        <p>Forget about guessing where your college bus is now</p>
      </div>

      <style>{`
        .splash-screen-full {
          position: fixed;
          inset: 0;
          background-color: #87CEEB; /* Sky blue */
          overflow: hidden;
          z-index: 9999;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
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
          animation: scenery-scroll 3s linear infinite;
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
          left: -250px;
          width: 200px;
          height: 100px;
          animation: drive-across 4s ease-in-out forwards;
        }

        .bus-body {
          width: 100%;
          height: 80px;
          background-color: #0277bd; /* A nice blue */
          border-radius: 20px 20px 5px 5px;
          border: 3px solid #01579b;
          position: relative;
        }

        .bus-window-front, .bus-window-middle, .bus-window-back {
          position: absolute;
          top: 10px;
          height: 35px;
          background-color: #B3E5FC;
          border: 2px solid #01579b;
          border-radius: 5px;
        }
        .bus-window-front { left: 15px; width: 40px; }
        .bus-window-middle { left: 65px; width: 60px; }
        .bus-window-back { right: 15px; width: 40px; }
        
        .bus-stripe {
          position: absolute;
          bottom: 15px;
          width: 100%;
          height: 8px;
          background-color: #FFCA28;
        }

        .wheel-front, .wheel-back {
          position: absolute;
          bottom: -15px;
          width: 40px;
          height: 40px;
          background-color: #212121;
          border-radius: 50%;
          border: 5px solid #424242;
          animation: spin 0.5s linear infinite;
        }
        .wheel-front { left: 25px; }
        .wheel-back { right: 25px; }

        .wind-effect {
          position: absolute;
          height: 2px;
          background: linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.5));
          border-radius: 2px;
          animation: wind-streak 0.8s linear infinite;
        }
        .wind1 { top: -40px; left: 110%; width: 100px; animation-duration: 0.6s; }
        .wind2 { top: -20px; left: 130%; width: 150px; animation-duration: 0.8s; animation-delay: 0.2s; }
        .wind3 { top: -50px; left: 120%; width: 80px; animation-duration: 0.5s; animation-delay: 0.5s; }

        .splash-tagline {
          position: absolute;
          bottom: 8%;
          width: 100%;
          text-align: center;
          opacity: 0;
          animation: fade-in-tag 2s ease-out forwards;
          animation-delay: 1s;
        }

        .splash-tagline p {
          color: white;
          font-size: 1.5rem;
          font-weight: 500;
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
        }

        @keyframes drive-across {
          0% { transform: translateX(0); }
          100% { transform: translateX(150vw); }
        }

        @keyframes scenery-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-150vw); }
        }

        @keyframes wind-streak {
          0% { transform: translateX(0); }
          100% { transform: translateX(-150vw); }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes fade-in-tag {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
