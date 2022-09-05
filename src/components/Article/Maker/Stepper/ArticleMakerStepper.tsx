import BigContainer from '@components/base/BigContainer';
import Viewport from '@components/base/GlobalApp/Viewport';
import ErrorIcon from '@components/icons/ErrorIcon';
import { MessageList } from '@components/MessageLists/MessageList';
import { Button, Group, ScrollArea, Stepper, Text, Title, useMantineTheme } from '@mantine/core';
import { closeAllModals, openConfirmModal, openModal } from '@mantine/modals';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import React, { SetStateAction } from 'react';
import { ArticleMakerStepperStyles } from './ArticleMakerStepper.styles';

interface ArticleMakerStepperProps {
  current: number;
  setCurrent: React.Dispatch<SetStateAction<number>>;
  children?: React.ReactNode;
  errorMessages: string[];
  setComplete: () => void;
}
export function ArticleMakerSteppper({
  current,
  setCurrent,
  children,
  errorMessages,
  setComplete,
}: ArticleMakerStepperProps) {
  const theme = useMantineTheme();
  const { classes } = ArticleMakerStepperStyles();
  const { t } = useTranslation('article');
  const nextStep = () =>
    setCurrent((c) => {
      return c >= 4 ? c : c + 1;
    });
  const prevStep = () =>
    setCurrent((c) => {
      return c > 0 ? c - 1 : c;
    });
  const openErrorModal = () => {
    openModal({
      title: <Title order={3}>{t('maker_cannot_clickable_modal_title')}</Title>,
      children: (
        <>
          <Text size="sm">{t('maker_cannot_clickable_modal_desc')}</Text>
          {errorMessages.map((v) => (
            <Text color="red" size="sm">
              {v}
            </Text>
          ))}
          <Group position="right" mt={theme.spacing.lg}>
            <Button
              color="red"
              onClick={() => {
                closeAllModals();
              }}
            >
              {t('maker_cannot_clickable_modal_confirm')}
            </Button>
          </Group>
        </>
      ),
    });
  };
  return (
    <ScrollArea type="hover" classNames={{ root: classes.scrollBase, viewport: classes.viewPort }}>
      <BigContainer className={classes.inner} px={0}>
        <Stepper
          className={classes.stepper}
          active={current}
          onKeyDown={() => {}}
          onStepClick={(stepIndex) => {
            if (errorMessages.length !== 0) {
              openErrorModal();
              return;
            }
            setCurrent(stepIndex);
          }}
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
          <Stepper.Step
            label={t('maker_fifth_step_label')}
            description={t('maker_fifth_step_desc')}
          ></Stepper.Step>
        </Stepper>
        {children}
        <Group position="center" mt="xl" mb="xl" className={classes.bottomButton}>
          <Group>
            <Button variant="default" onClick={prevStep} disabled={current <= 0}>
              {t('maker_button_prev')}
            </Button>
            <Button
              onClick={current === 4 ? setComplete : nextStep}
              disabled={errorMessages.length !== 0}
              color={current === 4 ? 'green' : undefined}
            >
              {current === 4 ? t('maker_button_finish') : t('maker_button_next')}
            </Button>
          </Group>
          <MessageList
            data={errorMessages}
            icon={<ErrorIcon />}
            sx={(th) => ({
              color: th.colors.red[6],
            })}
          />
        </Group>
      </BigContainer>
    </ScrollArea>
  );
}
