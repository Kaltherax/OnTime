import React, { useEffect, useRef } from 'react';

const ParallaxAnimation = () => {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { offsetWidth, offsetHeight } = document.body;
      const x = (clientX - offsetWidth / 2) / (offsetWidth / 2);
      const y = (clientY - offsetHeight / 2) / (offsetHeight / 2);

      const layers = scene.querySelectorAll('[data-depth]') as NodeListOf<HTMLElement>;
      layers.forEach(layer => {
        const depth = parseFloat(layer.dataset.depth || '0');
        const moveX = x * (depth * 50);
        const moveY = y * (depth * 25);
        layer.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="animation-section">
      <div id="scene" ref={sceneRef}>
        {/* Clouds */}
        <div className="cloud_3" data-depth="0.2">
          <img src="https://res.cloudinary.com/dyquku6bs/image/upload/v1536209468/ic_cloud-3_ygyuja.svg" alt="Cloud" />
        </div>
        <div className="cloud_1" data-depth="0.6">
          <img src="https://res.cloudinary.com/dyquku6bs/image/upload/v1536209468/ic_cloud-1_y4gj1j.svg" alt="Cloud" />
        </div>
        <div className="cloud_2" data-depth="0.4">
          <img src="https://res.cloudinary.com/dyquku6bs/image/upload/v1536209468/ic_cloud-2_uw3c2v.svg" alt="Cloud" />
        </div>

        {/* Scenery */}
        <div className="hills-background-wrap">
          <div className="inner slide-right-img"></div>
        </div>
        <div className="rope-line">
          <div className="inner slide-right-rope"></div>
        </div>
        <div className="buildings-bg">
          <div className="inner"></div>
        </div>

        {/* Bus */}
        <div className="bus-wrap">
          <div className="inner">
            <svg width="621px" height="182px" viewBox="0 0 621 182" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <defs>
                    <path d="M594.470881,148.950741 L591.294014,151.571433 C587.638852,154.588205 580.922868,157 576.180772,157 L13.4417459,157 C8.30740914,157 3.75203894,152.860525 3.26480368,147.750913 L0.165709314,115.206205 C-0.267398067,110.664229 0.177608079,103.392385 1.16124897,98.94008 L21.0361416,8.928585 C22.1292344,3.98086207 27.0866126,0 32.1558247,0 L596.577702,0 C601.7631,0 606,4.23362221 606,9.4167241 L606,90.7248068 C606,95.193892 605.602422,102.451447 605.114202,106.886198 L602.037339,134.938957 C601.517669,139.686671 598.157724,145.907821 594.470881,148.950741 Z" id="bus-path-full"></path>
                </defs>
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g transform="translate(0, 0)">
                        <g transform="translate(14.000000, 4.000000)">
                            <use fill="#6871FF" fillRule="nonzero" xlinkHref="#bus-path-full"></use>
                            <use stroke="#2D2754" strokeWidth="2" xlinkHref="#bus-path-full"></use>
                        </g>
                        <rect fill="#E85442" x="581" y="4" width="18" height="9" rx="4"></rect>
                        <rect fill="#FFFFFF" x="56" y="4" width="18" height="9" rx="4"></rect>
                        <path d="M11.16124897,102.94008 L31.0361416,12.928585 C31.5362725,10.6648164 37.0782373,11.7824808 37.0782373,13.4167241 L17.3174529,101.378459 C17.1123656,102.29137 16.3017522,102.94008 15.3660881,102.94008 L11.16124897,102.94008 Z" fill="#A6C3FF"></path>
                        <rect fill="#FAEE5A" x="112" y="132" width="7" height="4" rx="2"></rect>
                        <rect fill="#FAEE5A" x="324" y="132" width="7" height="4" rx="2"></rect>
                        <rect fill="#FAEE5A" x="217" y="132" width="7" height="4" rx="2"></rect>
                        <rect fill="#FAEE5A" x="465" y="132" width="7" height="4" rx="2"></rect>
                        <rect fill="#FAEE5A" x="570" y="132" width="7" height="4" rx="2"></rect>
                        <rect fill="#E3E4F6" x="27" y="107" width="581" height="9"></rect>
                        <rect fill="#FAEE5A" x="27" y="119" width="581" height="3"></rect>
                        <g transform="translate(46, 30)" fill="#4E54AA">
                            <path d="M2,0 L55,0 C56.1045695,0 57,0.8954305 57,2 L57,131 L0,131 L0,2 C0,0.8954305 0.8954305,0 2,0 Z"></path>
                        </g>
                        <g transform="translate(485, 30)" fill="#4E54AA">
                            <path d="M2,0 L55,0 C56.1045695,0 57,0.8954305 57,2 L57,131 L0,131 L0,2 C0,0.8954305 0.8954305,0 2,0 Z"></path>
                        </g>
                        <g transform="translate(113, 42)" fill="#373064">
                            <rect x="0" y="0" width="54" height="43" rx="2.42"></rect>
                        </g>
                        <g transform="translate(171, 42)" fill="#373064">
                            <rect x="0" y="0" width="54" height="43" rx="2.42"></rect>
                        </g>
                        <g transform="translate(237, 42)" fill="#373064">
                            <rect x="0" y="0" width="54" height="43" rx="2.42"></rect>
                        </g>
                        <g transform="translate(361, 42)" fill="#373064">
                            <rect x="0" y="0" width="54" height="43" rx="2.42"></rect>
                        </g>
                        <g transform="translate(554, 42)" fill="#373064">
                            <rect x="0" y="0" width="54" height="43" rx="2.42"></rect>
                        </g>
                        <g transform="translate(295, 42)" fill="#373064">
                            <rect x="0" y="0" width="54" height="43" rx="2.42"></rect>
                        </g>
                        <g transform="translate(419, 42)" fill="#373064">
                            <rect x="0" y="0" width="54" height="43" rx="2.42"></rect>
                        </g>
                    </g>
                </g>
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

        {/* Road */}
        <div className="road-wrap">
          <div className="bar slide-right"></div>
        </div>
      </div>
      <style>{`
        .animation-section {
          height: 300px; /* Adjust height as needed */
          width: 100%;
          background: #68cdaf;
          position: relative;
          overflow: hidden;
        }
        #scene {
          height: 100%;
          position: relative;
        }
        .cloud_1, .cloud_2, .cloud_3 { position: absolute; transition: transform 0.3s ease-out; }
        .cloud_1 { top: 60%; left: 10%; width: 200px; }
        .cloud_2 { top: 20%; right: 5%; width: 300px; }
        .cloud_3 { top: 15%; left: 5%; width: 400px; animation: animateCloud3 15s linear infinite alternate both; }
        
        .hills-background-wrap {
            position: absolute;
            bottom: 145px;
            height: 230px;
            left: 0; right: 0;
        }
        .hills-background-wrap > .inner {
            background: url("https://res.cloudinary.com/dyquku6bs/image/upload/v1537333316/hill-bg_rzukmt.png") repeat-x;
            background-size: 1500px;
            height: 100%;
            width: 3000px; /* Ensure it's wide enough to scroll */
            animation: slide-right-img 100s linear infinite;
        }
        .rope-line {
            position: absolute;
            bottom: 140px;
            height: 85px;
            left: 0; right: 0;
            z-index: 2;
        }
        .rope-line > .inner {
            background: url("https://res.cloudinary.com/dyquku6bs/image/upload/v1537333317/rope-line_zd9qwz.png") repeat-x;
            background-size: 1500px;
            height: 100%;
            width: 3000px;
            animation: slide-right-rope 90s linear infinite;
        }
        .buildings-bg {
            position: absolute;
            bottom: 145px;
            z-index: 1;
            height: 255px;
            left: 0; right: 0;
        }
        .buildings-bg > .inner {
            position: absolute;
            left: 0; right: 0; top: 0; bottom: 0;
            height: 100%;
            width: 6000px;
            background: url("https://res.cloudinary.com/dyquku6bs/image/upload/v1537333316/buildings-background_rxiq0u.png") repeat-x;
            animation: move-bg 200s linear infinite;
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
            width: 200%;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            animation: slide-right 30s linear infinite;
        }
        .road-wrap:before {
            position: absolute;
            content: "";
            left: 0;
            right: 0;
            top: 10px;
            border-top: 5px solid #e6db69;
        }
        
        @keyframes animateCloud3 { 0% { margin-left: 0; } 100% { margin-left: 100px; } }
        @keyframes move-bg { from { transform: translateX(0); } to { transform: translateX(-3000px); } }
        @keyframes bus-bounce { 0%, 40%, 100% { top: 1px; } 20%, 75% { top: 0px; } }
        @keyframes rim-dot { from { transform: rotateZ(0deg); } to { transform: rotateZ(-360deg); } }
        @keyframes slide-right { from { transform: translateX(0); } to { transform: translateX(-1500px); } }
        @keyframes slide-right-rope { from { background-position: 0 0; } to { background-position: -3000px 0; } }
        @keyframes slide-right-img { from { background-position: 0 0; } to { background-position: -1500px 0; } }
      `}</style>
    </div>
  );
};

export default ParallaxAnimation;
