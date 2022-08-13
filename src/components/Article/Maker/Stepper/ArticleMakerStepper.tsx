import BigContainer from '@components/base/BigContainer';
import { Stepper } from '@mantine/core';
import { useTranslation } from 'next-i18next';
import { SetStateAction } from 'react';

interface ArticleMakerStepperProps {
  current: number;
  setCurrent: React.Dispatch<SetStateAction<number>>;
}
export function ArticleMakerSteppper({ current, setCurrent }: ArticleMakerStepperProps) {
  const { t } = useTranslation('article');
  const nextStep = () => setCurrent((c) => (c < 4 ? c + 1 : c));
  const prevStep = () => setCurrent((c) => (c > 0 ? c - 1 : c));
  return (
    <BigContainer>
      <Stepper active={current} onStepClick={setCurrent} breakpoint="sm">
        <Stepper.Step label="🚀"></Stepper.Step>
      </Stepper>
    </BigContainer>
  );
}
