import { Group, Stepper } from '@mantine/core';
import { ArticleData } from '@type/data/ArticleData';
import { useState } from 'react';
import { ArticleMakerSteppper } from './Stepper/ArticleMakerStepper';

interface ArticleMakerProps {
  data: ArticleData;
}
export function ArticleMaker({ data }: ArticleMakerProps) {
  const [step, setStep] = useState(0);
  return <ArticleMakerSteppper current={step} setCurrent={setStep} />;
}
