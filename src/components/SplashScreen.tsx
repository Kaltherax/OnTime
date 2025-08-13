import React, an
import React, { useEffect, useRef } from 'react';

const SplashScreen = () => {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { offsetWidth, offsetHeight } = scene;
      const x = (clientX - offsetWidth / 2) / (offsetWidth / 2);
      const y = (clientY - offsetHeight / 2) / (offsetHeight / 2);

      const layers = scene.querySelectorAll('[data-depth]') as NodeListOf<HTMLElement>;
      layers.forEach(layer => {
        const depth = parseFloat(layer.dataset.depth || '0');
        const moveX = x * (depth * 100);
        const moveY = y * (depth * 50);
        layer.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="main-section">
      <div id="scene" ref={sceneRef}>
        <div id="background-wrap">
          <div className="x1"><div className="cloud-bg"></div></div>
          <div className="x2"><div className="cloud-bg"></div></div>
          <div className="x3"><div className="cloud-bg"></div></div>
        </div>

        <div className="cloud_3" data-depth="0.2">
          <img src="https://res.cloudinary.com/dyquku6bs/image/upload/v1536209468/ic_cloud-3_ygyuja.svg" alt="Cloud" />
        </div>
        <div className="heading" data-depth="0.1">
          <h1>On Time</h1>
        </div>
        <div className="cloud_1" data-depth="0.6">
          <img src="https://res.cloudinary.com/dyquku6bs/image/upload/v1536209468/ic_cloud-1_y4gj1j.svg" alt="Cloud" />
        </div>
        <div className="cloud_2" data-depth="0.4">
          <img src="https://res.cloudinary.com/dyquku6bs/image/upload/v1536209468/ic_cloud-2_uw3c2v.svg" alt="Cloud" />
        </div>

        <div className="hills-background-wrap">
          <div className="inner slide-right-img"></div>
        </div>

        <div className="rope-line">
          <div className="inner slide-right-rope"></div>
        </div>

        <div className="buildings-bg">
          <div className="inner"></div>
        </div>

        <div className="bus-wrap">
          <div className="inner">
            {/* Bus SVG from your code */}
            <svg width="621px" height="182px" viewBox="0 0 621 182" version="1.1" xmlns="http://www.w3.org/2000/svg">
                {/* SVG content here */}
            </svg>
            <div className="tyres-wrapper">
              <div className="tyres-content">
                <div className="tyres"><div className="rim-section"><div className="rim-dot"></div></div></div>
              </div>
              <div className="tyres-content">
                <div className="tyres"><div className="rim-section"><div className="rim-dot"></div></div></div>
              </div>
            </div>
          </div>
        </div>

        <div className="road-wrap">
          <div className="bar slide-right"></div>
        </div>
      </div>
      <style>{`
        /* All CSS from your code, slightly adapted for React */
        .main-section {
          height: 100vh;
          width: 100vw;
          background: #68cdaf;
          position: fixed;
          top: 0;
          left: 0;
          font-family: "Dancing Script", cursive;
          z-index: 9999;
        }
        #scene {
          height: 100%;
          overflow: hidden;
          position: relative;
        }
        .heading {
          position: absolute;
          top: 10% !important;
          left: 50% !important;
          transform: translateX(-50%);
          font-family: "Dancing Script", cursive;
        }
        .heading h1 {
          font-size: 5vw;
          color: #68b69f;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
        }
        /* ... Rest of the CSS from your example ... */
        .cloud_1, .cloud_2, .cloud_3 { position: absolute; }
        .cloud_1 { top: 60%; left: 10%; width: 200px; }
        .cloud_2 { top: 20%; right: 5%; width: 300px; }
        .cloud_3 { top: 15%; left: 5%; width: 400px; }
        .hills-background-wrap {
            position: absolute;
            bottom: 145px;
            z-index: -1;
            height: 230px;
            left: -50px;
            right: -50px;
        }
        .hills-background-wrap > .inner {
            background: url("https://res.cloudinary.com/dyquku6bs/image/upload/v1537333316/hill-bg_rzukmt.png");
            background-size: 3000px;
            background-repeat: repeat-x;
            height: 100%;
        }
        .rope-line {
            position: absolute;
            bottom: 140px;
            height: 85px;
            left: -50px;
            right: -50px;
            z-index: 2;
        }
        .rope-line > .inner {
            background: url("https://res.cloudinary.com/dyquku6bs/image/upload/v1537333317/rope-line_zd9qwz.png");
            background-size: 1500px;
            background-repeat: repeat-x;
            height: 100%;
        }
        .buildings-bg {
            position: absolute;
            bottom: 145px;
            z-index: 1;
            height: 255px;
            left: -50px;
            right: -50px;
        }
        .buildings-bg > .inner {
            position: absolute;
            left: 0; right: 0; top: 0; bottom: 0;
            height: 100%;
            background: url("https://res.cloudinary.com/dyquku6bs/image/upload/v1537333316/buildings-background_rxiq0u.png") 0% 0% repeat-x;
            animation: move-bg 1000s linear reverse infinite;
            background-size: 3000px;
        }
        .bus-wrap {
            position: absolute;
            bottom: 15px;
            z-index: 3;
            left: 50%;
            transform: translateX(-50%);
            width: 400px;
        }
        .bus-wrap > .inner {
            position: relative;
            animation: bus-bounce 0.75s linear infinite;
        }
        .bus-wrap svg { width: 100%; }
        .tyres-wrapper {
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
        }
        .tyres-content:nth-child(1) { position: absolute; bottom: 36px; left: 80px; }
        .tyres-content:nth-child(2) { position: absolute; bottom: 36px; right: 105px; }
        .tyres {
            position: relative;
            z-index: 1;
            width: 18px;
            height: 18px;
            background: #f4f4f4;
            border-radius: 50%;
            border: 8px solid #333;
        }
        .rim-section {
            position: relative;
            width: 14px;
            height: 14px;
            background: #f3f3f3;
            border-radius: 50%;
            border: 2px solid #f1f1f1;
        }
        .rim-dot {
            position: absolute;
            width: 10px;
            height: 10px;
            border: 2px dashed #4e5066;
            border-radius: 50%;
            animation: rim-dot 2s linear infinite;
        }
        .road-wrap {
            height: 150px;
            background: #4a4953;
            position: absolute;
            left: 0; right: 0; bottom: 0;
        }
        .road-wrap .bar {
            position: absolute;
            background-image: linear-gradient(to right, rgba(255, 255, 255, 0.3) 40%, rgba(255, 255, 255, 0) 0%);
            background-position: bottom;
            background-size: 39px 9px;
            background-repeat: repeat-x;
            height: 4px;
            left: 0;
            width: 100%;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
        }
        .road-wrap:before {
            position: absolute;
            content: "";
            left: 0;
            right: 0;
            top: 10px;
            border-top: 5px solid #e6db69;
        }
        
        @keyframes move-bg { to { background-position-x: 5000%; } }
        @keyframes bus-bounce {
            0%, 40%, 100% { top: 1px; }
            20%, 75% { top: 0px; }
        }
        @keyframes rim-dot {
            0% { transform: rotateZ(0deg); }
            50% { transform: rotateZ(-180deg); }
            100% { transform: rotateZ(-360deg); }
        }
        .slide-right-rope { animation: slide-right-rope 90s linear infinite; }
        @keyframes slide-right-rope { 100% { background-position: 5000px 0; } }
        .slide-right-img { animation: slide-right-img 100s linear infinite; }
        @keyframes slide-right-img { 100% { background-position: 3000px 0; } }
      `}</style>
    </div>
  );
};

export default SplashScreen;
