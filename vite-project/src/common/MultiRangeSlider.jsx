import { useState } from 'react';

const MultiRangeSlider = () => {
  const [minVal, setMinVal] = useState(0);
  const [maxVal, setMaxVal] = useState(100);

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxVal - 1);
    setMinVal(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minVal + 1);
    setMaxVal(value);
  };

  return (
    <div className="relative w-64">
      <input
        type="range"
        min="0"
        max="100"
        value={minVal}
        onChange={handleMinChange}
        className="absolute w-full h-2 bg-transparent appearance-none pointer-events-none z-10"
        style={{
          WebkitAppearance: 'none',
          appearance: 'none',
          outline: 'none',
          background: `linear-gradient(to right, transparent ${minVal}%, #10B981 ${minVal}%, #10B981 ${maxVal}%, transparent ${maxVal}%)`,
        }}
      />
      <input
        type="range"
        min="0"
        max="100"
        value={maxVal}
        onChange={handleMaxChange}
        className="absolute w-full h-2 bg-transparent appearance-none pointer-events-none z-10"
        style={{
          WebkitAppearance: 'none',
          appearance: 'none',
          outline: 'none',
          background: `linear-gradient(to right, transparent ${minVal}%, #10B981 ${minVal}%, #10B981 ${maxVal}%, transparent ${maxVal}%)`,
        }}
      />
      <div className="relative w-full h-2 bg-gray-200 rounded-full">
        <div
          className="absolute h-2 bg-green-500 rounded-full"
          style={{
            left: `${minVal}%`,
            right: `${100 - maxVal}%`,
          }}
        ></div>
        <div
          className="absolute w-4 h-4 bg-green-600 rounded-full shadow -top-1"
          style={{ left: `${minVal}%`, transform: 'translateX(-50%)' }}
        ></div>
        <div
          className="absolute w-4 h-4 bg-green-600 rounded-full shadow -top-1"
          style={{ left: `${maxVal}%`, transform: 'translateX(-50%)' }}
        ></div>
      </div>
    </div>
  );
};

export default MultiRangeSlider;