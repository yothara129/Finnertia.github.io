import { useState, useMemo } from 'react';
import { Card, Slider } from './ui';
import { calculateLumpsum } from '../lib/calculations';
import { SharedResult } from './SharedResult';
import { Info } from 'lucide-react';

export const LumpsumCalculator = () => {
  const [amount, setAmount] = useState(100000);
  const [years, setYears] = useState(10);
  const [annualRate, setAnnualRate] = useState(12);
  const [inflationRate, setInflationRate] = useState(0);

  const result = useMemo(() => {
    return calculateLumpsum(amount, years, annualRate, inflationRate);
  }, [amount, years, annualRate, inflationRate]);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
      <div className="xl:col-span-5 space-y-8">
        <Card className="p-6 space-y-8">
          <Slider 
            label="One-time Investment" 
            value={amount} 
            min={1000} 
            max={10000000} 
            step={1000} 
            onChange={setAmount} 
            prefix="₹"
          />
          <Slider 
            label="Investment Duration (Years)" 
            value={years} 
            min={1} 
            max={40} 
            onChange={setYears} 
            suffix="Y"
          />
          <Slider 
            label="Expected Return Rate (% p.a)" 
            value={annualRate} 
            min={1} 
            max={30} 
            step={0.5} 
            onChange={setAnnualRate} 
            suffix="%"
          />
          <div className="pt-4 border-t border-slate-100">
            <Slider 
              label="Inflation Adjustment (% p.a)" 
              value={inflationRate} 
              min={0} 
              max={15} 
              step={0.1} 
              onChange={setInflationRate} 
              suffix="%"
            />
          </div>
        </Card>
      </div>

      <div className="xl:col-span-7">
        <SharedResult 
          totalInvested={result.totalInvested} 
          totalReturns={result.totalReturns} 
          maturityValue={result.maturityValue} 
          yearlyData={result.yearlyData}
        />
      </div>
    </div>
  );
};
