import React from 'react';

const SplashScreen = () => {
  return (
    <div className="splash-screen">
      <div className="sky"></div>
      <div className="road">
        <div className="bus">
          <div className="bus-top">
            <div className="bus-windows"></div>
          </div>
          <div className="bus-bottom"></div>
        </div>
        
        {/* Scenery Elements */}
        <div className="tree tree1"></div>
        <div className="tree tree2"></div>
        <div className="tree tree3"></div>

        {/* Wind Effects */}
        <div className="wind wind1"></div>
        <div className="wind wind2"></div>
        <div className="wind wind3"></div>

      </div>
      <div className="tagline">
        <h1>On Time</h1>
        <p>Forget about guessing where your college bus is now</p>
      </div>

      <style>{`
        .splash-screen {
          position: fixed;
          inset: 0;
          background-color: #87CEEB; /* Sky Blue */
          overflow: hidden;
          z-index: 9999;
        }

        .road {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 30%;
          background: #6B6B6B;
          border-top: 10px solid #4A4A4A;
        }

        .bus {
          position: absolute;
          bottom: 20%; /* Position bus on the road */
          left: -200px; /* Start off-screen */
          width: 150px;
          height: 80px;
          animation: drive-by 4s ease-in-out forwards;
        }

        .bus-top {
          width: 100%;
          height: 50px;
          background: #FFD700; /* Yellow */
          border-radius: 10px 10px 0 0;
          position: relative;
        }

        .bus-windows {
          width: 90%;
          height: 25px;
          background: #ADD8E6; /* Light Blue */
          position: absolute;
          top: 5px;
          left: 5%;
          border-radius: 5px;
        }

        .bus-bottom {
          width: 100%;
          height: 30px;
          background: #F08080; /* Light Coral Red */
        }
        
        .tree {
            position: absolute;
            bottom: 30%; /* On the road level */
            width: 20px;
            height: 60px;
            background: #228B22; /* Forest Green */
            animation: scenery-scroll 3s linear infinite;
        }
        .tree::before {
            content: '';
            position: absolute;
            bottom: 60px;
            left: -15px;
            width: 50px;
            height: 50px;
            background: #006400; /* Dark Green */
            border-radius: 50%;
        }

        .tree1 { left: 110%; animation-duration: 2s; }
        .tree2 { left: 140%; animation-duration: 2.5s; animation-delay: 0.5s; }
        .tree3 { left: 170%; animation-duration: 2.2s; animation-delay: 1s; }


        .wind {
            position: absolute;
            bottom: 40%;
            width: 50px;
            height: 2px;
            background: white;
            opacity: 0.6;
            animation: wind-blow 0.5s linear infinite;
        }

        .wind1 { left: 120%; animation-delay: 0.1s; }
        .wind2 { left: 150%; bottom: 50%; animation-delay: 0.3s; }
        .wind3 { left: 130%; bottom: 35%; animation-delay: 0.6s; }


        .tagline {
          position: absolute;
          bottom: 10%;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          color: white;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
          opacity: 0;
          animation: fade-in 2s ease-in forwards;
          animation-delay: 1s;
        }

        .tagline h1 {
          font-size: 3rem;
          font-weight: bold;
          margin: 0;
        }

        .tagline p {
          font-size: 1.2rem;
        }

        @keyframes drive-by {
          0% { left: -200px; }
          40% { left: 50%; transform: translateX(-50%) scale(1.2); }
          100% { left: 120%; transform: translateX(-50%) scale(1); }
        }

        @keyframes scenery-scroll {
            from { transform: translateX(0); }
            to { transform: translateX(-150vw); }
        }
        
        @keyframes wind-blow {
            from { transform: translateX(0); }
            to { transform: translateX(-150vw); }
        }

        @keyframes fade-in {
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
