import React, { useState } from 'react';
import { useConfig } from '../../context/ConfigContext';
import { ToolsModalWrapper } from './ToolsModalWrapper';
import { ArrowRightLeft } from 'lucide-react';

type UnitCategory = 'length' | 'mass' | 'temperature';

const CATEGORIES: Record<UnitCategory, string[]> = {
  length: ['m', 'km', 'cm', 'mm', 'in', 'ft', 'yd', 'mi'],
  mass: ['kg', 'g', 'mg', 'lb', 'oz'],
  temperature: ['C', 'F', 'K'],
};

export const UnitConverterModal: React.FC = () => {
  const { isUnitConverterOpen, closeUnitConverter } = useConfig();
  const [category, setCategory] = useState<UnitCategory>('length');
  const [fromUnit, setFromUnit] = useState(CATEGORIES.length[0]);
  const [toUnit, setToUnit] = useState(CATEGORIES.length[1]);
  const [inputValue, setInputValue] = useState<string>('');

  const handleCategoryChange = (newCategory: UnitCategory) => {
    setCategory(newCategory);
    setFromUnit(CATEGORIES[newCategory][0]);
    setToUnit(CATEGORIES[newCategory][1]);
    setInputValue('');
  };

  const convert = (
    value: number,
    from: string,
    to: string,
    type: UnitCategory
  ): number => {
    if (from === to) return value;

    if (type === 'temperature') {
      let celsius = value;
      if (from === 'F') celsius = (value - 32) * (5 / 9);
      if (from === 'K') celsius = value - 273.15;

      if (to === 'C') return celsius;
      if (to === 'F') return celsius * (9 / 5) + 32;
      if (to === 'K') return celsius + 273.15;
    }

    // Simple factor-based conversion for length and mass
    const factors: Record<string, number> = {
      // Length (base: meter)
      m: 1,
      km: 1000,
      cm: 0.01,
      mm: 0.001,
      in: 0.0254,
      ft: 0.3048,
      yd: 0.9144,
      mi: 1609.34,
      // Mass (base: kg)
      kg: 1,
      g: 0.001,
      mg: 0.000001,
      lb: 0.453592,
      oz: 0.0283495,
    };

    const baseValue = value * factors[from];
    return baseValue / factors[to];
  };

  const calculateResult = () => {
    const val = parseFloat(inputValue);
    if (!isNaN(val)) {
      const res = convert(val, fromUnit, toUnit, category);
      return res.toLocaleString(undefined, { maximumFractionDigits: 6 });
    }
    return '';
  };

  const result = calculateResult();

  return (
    <ToolsModalWrapper
      title="Unit Converter"
      isOpen={isUnitConverterOpen}
      onClose={closeUnitConverter}
      width="w-[400px]"
    >
      <div className="flex flex-col gap-4">
        {/* Category Selector */}
        <div className="flex gap-2 p-1 bg-nc-bg-sidebar rounded-lg">
          {(Object.keys(CATEGORIES) as UnitCategory[]).map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`flex-1 py-1 text-sm font-medium rounded capitalize transition-colors ${
                category === cat
                  ? 'bg-indigo-500 text-white'
                  : 'text-nc-text-secondary hover:text-nc-text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Conversion Inputs */}
        <div className="flex items-center gap-4">
          <div className="flex-1 flex flex-col gap-2">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="0"
              className="w-full bg-nc-bg-hover text-nc-text-primary px-3 py-2 rounded border border-nc-separator focus:outline-none focus:border-indigo-500"
            />
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full bg-nc-bg-sidebar text-nc-text-primary px-2 py-1.5 rounded border border-nc-separator focus:outline-none"
            >
              {CATEGORIES[category].map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </div>

          <ArrowRightLeft className="text-nc-text-secondary" />

          <div className="flex-1 flex flex-col gap-2">
            <div className="w-full h-[42px] bg-nc-bg-hover text-nc-text-primary px-3 py-2 rounded border border-nc-separator flex items-center overflow-hidden">
              {result || '-'}
            </div>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full bg-nc-bg-sidebar text-nc-text-primary px-2 py-1.5 rounded border border-nc-separator focus:outline-none"
            >
              {CATEGORIES[category].map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </ToolsModalWrapper>
  );
};
