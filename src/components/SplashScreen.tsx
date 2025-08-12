import React from 'react';

const SplashScreen = () => {
  return (
    <div className="splash-container">
      <div className="splash-content">
        <div className="bus-animation">
          <div className="bus-body">
            <div className="bus-window"></div>
          </div>
          <div className="wheel-container">
            <div className="wheel"></div>
            <div className="wheel"></div>
          </div>
        </div>
        <p className="tagline-text">
          Forget about guessing where your college bus is now
        </p>
      </div>

      <style>{`
        .splash-container {
          display: flex;
          align-items: center;
          justify-content: center;
          position: fixed;
          inset: 0;
          background-color: #f9fafb; /* bg-gray-50 */
          z-index: 9999;
        }

        .splash-content {
          text-align: center;
          animation: fade-in 0.5s ease-in-out;
        }

        .bus-animation {
          width: 100px;
          height: 60px;
          margin: 0 auto 20px auto;
          position: relative;
          animation: bus-jiggle 0.8s infinite ease-in-out;
        }

        .bus-body {
          width: 100%;
          height: 50px;
          background-color: #3b82f6; /* blue-500 */
          border-radius: 10px 10px 4px 4px;
          position: absolute;
          bottom: 10px;
          border: 2px solid #1e40af; /* darker blue */
        }

        .bus-window {
          width: 80%;
          height: 20px;
          background-color: #bfdbfe; /* blue-200 */
          margin: 5px auto;
          border-radius: 4px;
        }

        .wheel-container {
          position: absolute;
          bottom: 0;
          width: 100%;
          display: flex;
          justify-content: space-between;
          padding: 0 10px;
        }

        .wheel {
          width: 20px;
          height: 20px;
          background-color: #1f2937; /* gray-800 */
          border-radius: 50%;
          border: 2px solid #4b5563; /* gray-600 */
          animation: spin 1s linear infinite;
        }

        .tagline-text {
          color: #4b5563; /* gray-600 */
          font-size: 1rem;
        }

        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes bus-jiggle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
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
