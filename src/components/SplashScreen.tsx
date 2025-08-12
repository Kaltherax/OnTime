import React from 'react';

const SplashScreen = () => {
  return (
    <div className="loading-overlay">
      <div className="animation-container">
        {/* Background Elements */}
        <div className="mountain mountain1"></div>
        <div className="mountain mountain2"></div>
        
        {/* Scenery Elements */}
        <div className="scenery">
          <div className="tree tree1"></div>
          <div className="tree tree2"></div>
          <div className="tree tree3"></div>
        </div>

        {/* Road and Bus */}
        <div className="road">
          <div className="bus">
            <div className="bus-top-body">
              <div className="bus-window"></div>
              <div className="bus-window"></div>
              <div className="bus-window"></div>
              <div className="bus-window"></div>
              <div className="bus-window"></div>
            </div>
            <div className="bus-middle-body">
              <div className="stop-sign-base">
                <div className="stop-sign-arm"></div>
              </div>
            </div>
            <div className="wheel-front"></div>
            <div className="wheel-back"></div>
          </div>
        </div>
        
        {/* Wind Effects */}
        <div className="wind-container">
            <div className="wind-line"></div>
            <div className="wind-line"></div>
            <div className="wind-line"></div>
        </div>
        <div className="wind-container wind-container2">
            <div className="wind-line"></div>
            <div className="wind-line"></div>
            <div className="wind-line"></div>
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
          background-color: rgba(249, 250, 251, 0.9);
          z-index: 9999;
        }

        .animation-container {
          width: 500px;
          height: 300px;
          background-color: #f0f0f0;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          position: relative;
          overflow: hidden;
          border: 2px solid #ddd;
        }

        .mountain {
            position: absolute;
            bottom: 20%;
            width: 0;
            height: 0;
            border-left: 150px solid transparent;
            border-right: 150px solid transparent;
            border-bottom: 200px solid #a9a9a9;
        }
        .mountain1 { left: 0; }
        .mountain2 { right: 0; }

        .road {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 20%;
          background: #444;
        }

        .scenery {
          position: absolute;
          bottom: 20%;
          left: 0;
          width: 100%;
          height: 10%;
        }

        .tree {
          position: absolute;
          bottom: 0;
          width: 10px;
          height: 20px;
          background-color: #8B4513;
          animation: scenery-scroll-contained 5s linear infinite;
        }
        .tree::before {
          content: '';
          position: absolute;
          bottom: 15px;
          left: 50%;
          transform: translateX(-50%);
          width: 30px;
          height: 30px;
          background-color: #2E8B57;
          border-radius: 50%;
        }
        .tree1 { left: 110%; animation-duration: 4s; }
        .tree2 { left: 140%; animation-duration: 3.5s; animation-delay: 2s; }
        .tree3 { left: 170%; animation-duration: 4.5s; animation-delay: 3s; }

        .bus {
          position: absolute;
          bottom: 25%;
          left: 50%;
          transform: translateX(-50%);
          width: 150px;
          height: 70px;
          animation: bus-jiggle 0.5s infinite ease-in-out;
        }

        .bus-top-body {
          width: 100%;
          height: 45px;
          background-color: #FFD700;
          border-radius: 10px 10px 0 0;
          border: 2px solid #DAA520;
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding: 0 5px;
        }
        
        .bus-window {
            width: 15%;
            height: 25px;
            background: #E0FFFF;
            border: 1px solid #87CEEB;
        }

        .bus-middle-body {
            width: 100%;
            height: 25px;
            background-color: #FFD700;
            border-left: 2px solid #DAA520;
            border-right: 2px solid #DAA520;
            border-bottom: 2px solid #DAA520;
            position: relative;
        }
        
        .stop-sign-base {
            position: absolute;
            left: 5px;
            top: 50%;
            transform: translateY(-50%);
            width: 20px;
            height: 20px;
            background: red;
            border-radius: 50%;
            border: 2px solid white;
        }
        .stop-sign-arm {
            position: absolute;
            left: -10px;
            top: 50%;
            transform: translateY(-50%);
            width: 10px;
            height: 4px;
            background: #444;
        }

        .wheel-front, .wheel-back {
          position: absolute;
          bottom: -15px;
          width: 30px;
          height: 30px;
          background-color: #333;
          border-radius: 50%;
          border: 4px solid #555;
          animation: spin 0.4s linear infinite;
        }
        .wheel-front { left: 15px; }
        .wheel-back { right: 15px; }
        
        .wind-container {
            position: absolute;
            left: 50%;
            top: 55%;
            transform: translateX(-50%);
            display: flex;
            flex-direction: column;
            gap: 4px;
            animation: wind-move 5s linear infinite;
        }
        .wind-container2 {
            left: -50%;
            animation-delay: 2.5s;
        }
        .wind-line {
            width: 30px;
            height: 2px;
            background: #555;
            border-radius: 2px;
        }
        .wind-line:nth-child(2) {
            margin-left: 10px;
        }

        .loading-tagline {
          margin-top: 20px;
          text-align: center;
        }

        .loading-tagline p {
          color: #4b5563;
          font-size: 1.1rem;
          font-weight: 500;
        }

        @keyframes scenery-scroll-contained {
          from { transform: translateX(250px); }
          to { transform: translateX(-250px); }
        }
        
        @keyframes wind-move {
            from { transform: translateX(250px); }
            to { transform: translateX(-250px); }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes bus-jiggle {
            0%, 100% { transform: translate(-50%, 0); }
            50% { transform: translate(-50%, -2px); }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
