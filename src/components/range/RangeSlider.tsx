import { useState } from "react";

type RangeSliderProps = {
  min?: number;
  max?: number;
  step?: number;
  title?: string;
  descriptions?: string;
  defaultValue?: number;
  label?: string;
  label2?: string;
  onChange?: (value: number) => void;
};

const RangeSlider: React.FC<RangeSliderProps> = ({
  min = 5000,
  max = 350000,
  step = 5000,
  title,
  label,
  label2,
  descriptions,
  defaultValue = 200000,
  onChange,
}) => {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setValue(newValue);
    if (onChange) onChange(newValue);
  };

  return (
    <div className="w-full max-w-md mx-auto text-center">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-500">{descriptions}</p>
      <div className="text-2xl font-bold my-3">
        {label} {value.toLocaleString()} {label2}
      </div>

      <div className="relative w-full">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          className="w-full h-2 rounded-lg appearance-none bg-teal-400 outline-none cursor-pointer"
        />
        <div className="flex justify-between text-xs font-medium mt-2">
          <span>
            {label} {min.toLocaleString()} {label2}
          </span>
          <span>
            {label} {max.toLocaleString()} {label2}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;
