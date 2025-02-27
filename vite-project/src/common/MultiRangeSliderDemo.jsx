import { useState } from 'react';
import ReactSlider from 'react-slider';

const MultiRangeSliderDemo = () => {
  const [values, setValues] = useState([20, 80]);
  
  return (
    <div>
      <ReactSlider
        className="h-8 flex items-center"
        thumbClassName="w-6 h-6 bg-white border-2 border-gray-300 rounded-full cursor-grab active:cursor-grabbing shadow-md hover: flex items-center justify-center -mt-1"
        trackClassName="h-2 bg-gray-200 rounded"
        thumbActiveClassName="!bg-white"
        value={values}
        onChange={setValues}
        min={0}
        max={100}
        pearling
        minDistance={5}
        renderTrack={(props, state) => (
          <div
            {...props}
            className={`h-2 rounded ${
              state.index === 1 ? "bg-green-500" : "bg-gray-200"
            }`}
          />
        )}
      />
      
      <div className="w-full flex justify-between">
        <div className="text-gray-700">{values[0]}</div>
        <div className="text-gray-700">{values[1]}</div>
      </div>
    </div>
  );
};

export default MultiRangeSliderDemo;