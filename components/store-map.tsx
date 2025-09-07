import React, { useState } from "react";

export default function StoreMapLayout() {
  const [zoom, setZoom] = useState(0.7);

  const zoomIn = () => setZoom(z => Math.min(z + 0.1, 2));
  const zoomOut = () => setZoom(z => Math.max(z - 0.1, 0.5));

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-xl shadow-md border my-4">
      <div className="flex justify-center items-center py-2 space-x-4">
        <button onClick={zoomOut} className="rounded bg-gray-200 hover:bg-gray-300 w-8 h-8 text-xl font-bold flex items-center justify-center">−</button>
        <span className="text-sm text-gray-700">Zoom: {(zoom * 100).toFixed(0)}%</span>
        <button onClick={zoomIn} className="rounded bg-gray-200 hover:bg-gray-300 w-8 h-8 text-xl font-bold flex items-center justify-center">+</button>
      </div>
      <div className="flex justify-center items-center aspect-[4/3] w-full overflow-auto">
        <div
          className="transition-transform duration-200 origin-center"
          style={{ transform: `scale(${zoom})` }}
        >
            {/* simple  */}
          <svg
            viewBox="0 0 1200 900"
            width="500"
            height="375"
            className="mx-auto block"
            style={{ display: "block", maxWidth: "100%", height: "100%" }}
          >
          {/* Store outline */}
          <rect x={70} y={50} width={1020} height={700} rx={40} fill="#fafafa" stroke="#333" strokeWidth={6} />
          {/* Counter */}
          <rect x={400} y={650} width={400} height={70} rx={18} fill="#eee" stroke="#666" strokeWidth={2} />
          <text x={602} y={693} textAnchor="middle" fontWeight="bold" fontSize="34" fill="#222" fontFamily="inherit">Counter</text>
          {/* Aisle shelves */}
          <rect x={160} y={160} width={60} height={420} rx={12} fill="#fff" stroke="#222" strokeWidth={2.5} />
          <rect x={310} y={160} width={60} height={420} rx={12} fill="#fff" stroke="#222" strokeWidth={2.5} />
          <rect x={460} y={160} width={60} height={420} rx={12} fill="#fff" stroke="#222" strokeWidth={2.5} />
          <rect x={610} y={160} width={60} height={420} rx={12} fill="#fff" stroke="#222" strokeWidth={2.5} />
          <rect x={760} y={160} width={60} height={420} rx={12} fill="#fff" stroke="#222" strokeWidth={2.5} />
          {/* Aisle labels */}
          <text x={192} y={600} textAnchor="middle" fontSize="22" fill="#222" fontFamily="inherit">Aisle 4</text>
          <text x={342} y={600} textAnchor="middle" fontSize="22" fill="#222" fontFamily="inherit">Aisle 3</text>
          <text x={492} y={600} textAnchor="middle" fontSize="22" fill="#222" fontFamily="inherit">Aisle 2</text>
          <text x={642} y={600} textAnchor="middle" fontSize="22" fill="#222" fontFamily="inherit">Aisle 1</text>
          {/* Side labels */}
          <text x={830} y={215} textAnchor="start" fontSize="20" fill="#222" fontFamily="inherit" transform="rotate(0 850 200)">Shelf 5</text>
          <text x={780} y={600} textAnchor="middle" fontSize="22" fill="#222" fontFamily="inherit">Shelf 5</text>
          {/* Left shelves */}
          <text x={190} y={210} textAnchor="middle" fontSize="20" fill="#222" fontFamily="inherit">Shelf 1</text>
          <text x={345} y={210} textAnchor="middle" fontSize="20" fill="#222" fontFamily="inherit">Shelf 2</text>
          <text x={495} y={210} textAnchor="middle" fontSize="20" fill="#222" fontFamily="inherit">Shelf 3</text>
          <text x={645} y={210} textAnchor="middle" fontSize="20" fill="#222" fontFamily="inherit">Shelf 4</text>
          {/* Zone labels/arrows */}
          <text x={70} y={400} textAnchor="end" fontSize="28" fill="#222" fontFamily="inherit" transform="rotate(-90 70 400)">Home Kitchen Appliances</text>
          <text x={200} y={700} textAnchor="middle" fontSize="16" fill="#666" fontFamily="inherit">House hold essentials</text>
          <text x={352} y={710} textAnchor="middle" fontSize="16" fill="#666" fontFamily="inherit">Home Decor</text>
          <text x={500} y={720} textAnchor="middle" fontSize="16" fill="#666" fontFamily="inherit">Snack & Confectionary</text>
          <text x={650} y={720} textAnchor="middle" fontSize="16" fill="#666" fontFamily="inherit">Baby & Child care</text>
          {/* Add more details, like more text, arrows etc. */}
          <text x={1000} y={100} fontSize="40" fill="#222" fontWeight="bold" fontFamily="inherit">Back store</text>
          <text x={900} y={650} fontSize="34" fill="#222" fontWeight="bold" fontFamily="inherit">Front store</text>
          
          {/* Arrows (simple lines) for illustration */}
          <line x1={320} y1={160} x2={250} y2={70} stroke="#666" strokeWidth={2} markerEnd="url(#arrow)" />
          <text x={220} y={60} fontSize="16" fill="#666" fontFamily="inherit">Stationary/Office supply</text>
          {/* Arrow definitions */}
          <defs>
            <marker id="arrow" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L8,4 L0,8 L2,4 z" fill="#666" />
            </marker>
          </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}
