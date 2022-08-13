import BigContainer from '@components/base/BigContainer';
import Viewport from '@components/base/GlobalApp/Viewport';
import { Button, Group, ScrollArea, Stepper } from '@mantine/core';
import { useTranslation } from 'next-i18next';
import React, { SetStateAction } from 'react';
import { ArticleMakerStepperStyles } from './ArticleMakerStepper.styles';

interface ArticleMakerStepperProps {
  current: number;
  setCurrent: React.Dispatch<SetStateAction<number>>;
  setIncreasing: React.Dispatch<SetStateAction<boolean>>;
  children?: React.ReactNode;
}
export function ArticleMakerSteppper({
  current,
  setCurrent,
  setIncreasing,
  children,
}: ArticleMakerStepperProps) {
  const { classes } = ArticleMakerStepperStyles();
  const { t } = useTranslation('article');
  const nextStep = () =>
    setCurrent((c) => {
      setIncreasing(true);
      return c < 4 ? c + 1 : c;
    });
  const prevStep = () =>
    setCurrent((c) => {
      setIncreasing(false);
      return c > 0 ? c - 1 : c;
    });
  return (
    <Viewport className={classes.viewPort}>
      <ScrollArea>
        <BigContainer className={classes.inner}>
          <Stepper
            className={classes.stepper}
            active={current}
            onStepClick={setCurrent}
            breakpoint="sm"
          >
            <Stepper.Step
              label={t('maker_first_step_label')}
              description={t('maker_first_step_desc')}
            ></Stepper.Step>
            <Stepper.Step
              label={t('maker_second_step_label')}
              description={t('maker_second_step_desc')}
            ></Stepper.Step>
            <Stepper.Step
              label={t('maker_third_step_label')}
              description={t('maker_third_step_desc')}
            ></Stepper.Step>
            <Stepper.Step
              label={t('maker_fourth_step_label')}
              description={t('maker_fourth_step_desc')}
            ></Stepper.Step>
          </Stepper>
          {children}
          <Group position="center" mt="xl" className={classes.bottomButton}>
            <Button variant="default" onClick={prevStep}>
              {t('maker_button_prev')}
            </Button>
            <Button onClick={nextStep}>{t('maker_button_next')}</Button>
          </Group>
        </BigContainer>
      </ScrollArea>
    </Viewport>
  );
}
