import { useListState } from '@mantine/hooks';
import { ArticleData } from '@type/data/ArticleData';
import { useState } from 'react';
import Phase1 from './Phase/Phase1/Phase1';
import Phase2 from './Phase/Phase2/Phase2';
import Phase3 from './Phase/Phase3/Phase3';
import Phase4 from './Phase/Phase4/Phase4';
import Phase5 from './Phase/Phase5/Phase5';

import PhaseViewPort from './Phase/PhaseViewPort/PhaseViewPort';
import { ArticleMakerSteppper } from './Stepper/ArticleMakerStepper';

interface ArticleMakerProps {
  data: ArticleData;
}
export function ArticleMaker({ data }: ArticleMakerProps) {
  const [errorMessages, errorMessageHander] = useListState<string>([]);
  const [step, setStep] = useState(0);
  const [inc, setInc] = useState(true);
  console.log(step);
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
        <Phase2
          current={step}
          increasing={inc}
          errorMessages={errorMessages}
          errorMessageHandler={errorMessageHander}
        />
        <Phase3
          current={step}
          increasing={inc}
          errorMessages={errorMessages}
          errorMessageHandler={errorMessageHander}
        />
        <Phase4
          current={step}
          increasing={inc}
          errorMessages={errorMessages}
          errorMessageHandler={errorMessageHander}
        />
        <Phase5
          current={step}
          increasing={inc}
          errorMessages={errorMessages}
          errorMessageHandler={errorMessageHander}
        />
      </PhaseViewPort>
    </ArticleMakerSteppper>
  );
}
