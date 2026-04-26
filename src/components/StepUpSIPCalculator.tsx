import { useState, useMemo } from 'react';
import { Card, Slider } from './ui';
import { calculateStepUpSIP } from '../lib/calculations';
import { SharedResult } from './SharedResult';

export const StepUpSIPCalculator = () => {
  const [initialMonthly, setInitialMonthly] = useState(10000);
  const [stepUpRate, setStepUpRate] = useState(10);
  const [years, setYears] = useState(10);
  const [annualRate, setAnnualRate] = useState(12);

  const result = useMemo(() => {
    return calculateStepUpSIP(initialMonthly, stepUpRate, years, annualRate);
  }, [initialMonthly, stepUpRate, years, annualRate]);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
      <div className="xl:col-span-5 space-y-8">
        <Card className="p-6 space-y-8">
          <Slider 
            label="Initial Monthly Investment" 
            value={initialMonthly} 
            min={500} 
            max={100000} 
            step={500} 
            onChange={setInitialMonthly} 
            prefix="₹"
          />
          <Slider 
            label="Annual Step-up Rate (%)" 
            value={stepUpRate} 
            min={1} 
            max={50} 
            onChange={setStepUpRate} 
            suffix="%"
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
