import { ArticleData } from '@type/data/ArticleData';
import { useState } from 'react';
import Phase1 from './Phase/Phase1/Phase1';
import PhaseViewPort from './Phase/PhaseViewPort/PhaseViewPort';
import { ArticleMakerSteppper } from './Stepper/ArticleMakerStepper';

interface ArticleMakerProps {
  data: ArticleData;
}
export function ArticleMaker({ data }: ArticleMakerProps) {
  const [step, setStep] = useState(0);
  const [inc, setInc] = useState(true);
  const getPhase = () => {
    switch (step) {
      case 0:
        return <Phase1 current={step} increasing={inc} />;
      default:
        break;
    }
    return <></>;
  };
  return (
    <ArticleMakerSteppper
      current={step}
      setCurrent={setStep}
      increasing={inc}
      setIncreasing={setInc}
    >
      <PhaseViewPort>
        <Phase1 current={step} increasing={inc} />
      </PhaseViewPort>
    </ArticleMakerSteppper>
  );
}
