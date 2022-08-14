import { useListState } from '@mantine/hooks';
import { ArticleData } from '@type/data/ArticleData';
import { useState } from 'react';
import Phase1 from './Phase/Phase1/Phase1';

import PhaseViewPort from './Phase/PhaseViewPort/PhaseViewPort';
import { ArticleMakerSteppper } from './Stepper/ArticleMakerStepper';

interface ArticleMakerProps {
  data: ArticleData;
}
export function ArticleMaker({ data }: ArticleMakerProps) {
  const [errorMessages, errorMessageHander] = useListState<string>([]);
  console.log(errorMessages);
  const [step, setStep] = useState(0);
  const [inc, setInc] = useState(true);
  return (
    <ArticleMakerSteppper
      errorMessages={errorMessages}
      current={step}
      setCurrent={setStep}
      setIncreasing={setInc}
    >
      <PhaseViewPort>
        <Phase1
          current={step}
          increasing={inc}
          errorMessages={errorMessages}
          errorMessageHandler={errorMessageHander}
        />
      </PhaseViewPort>
    </ArticleMakerSteppper>
  );
}
