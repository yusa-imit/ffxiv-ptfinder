import { useListState } from '@mantine/hooks';
import { ArticleData } from '@type/data/ArticleData';
import { useEffect, useState } from 'react';
import { Carousel, Embla, useAnimationOffsetEffect } from '@mantine/carousel';
import Phase1 from './Phase/Phase1/Phase1';
import PhaseViewPort from './Phase/PhaseViewPort/PhaseViewPort';
import { ArticleMakerSteppper } from './Stepper/ArticleMakerStepper';
import Phase2 from './Phase/Phase2/Phase2';

interface ArticleMakerProps {}
export function ArticleMaker() {
  const [errorMessages, errorMessageHander] = useListState<string>([]);
  const [step, setStep] = useState(0);
  // Get Embla Carousel Instance;
  const [embla, setEmbla] = useState<Embla | null>(null);
  useEffect(() => {
    embla?.scrollTo(step);
  }, [step]);
  useAnimationOffsetEffect(embla as Embla, 150);
  return (
    <ArticleMakerSteppper errorMessages={errorMessages} current={step} setCurrent={setStep}>
      <Carousel
        withControls={false}
        draggable={false}
        getEmblaApi={setEmbla}
        slideGap="xl"
        style={{
          minHeight: '60vh',
          width: '100vw',
          display: 'flex',
          justifyContent: 'space-around',
          flexDirection: 'column',
        }}
      >
        {/** 
        <PhaseViewPort>
          
          <Phase1
            current={step}
            increasing={inc}
            errorMessages={errorMessages}
            errorMessageHandler={errorMessageHander}
          />
        </PhaseViewPort>
*/}
        <Carousel.Slide style={{ width: '100vw' }}>
          <Phase1 errorMessages={errorMessages} errorMessageHandler={errorMessageHander} />
        </Carousel.Slide>
        <Carousel.Slide style={{ width: '100vw' }}>
          <Phase2 errorMessages={errorMessages} errorMessageHandler={errorMessageHander} />
        </Carousel.Slide>
        <Carousel.Slide style={{ width: '100vw' }}>
          <Phase1 errorMessages={errorMessages} errorMessageHandler={errorMessageHander} />
        </Carousel.Slide>
        <Carousel.Slide style={{ width: '100vw' }}>
          <Phase1 errorMessages={errorMessages} errorMessageHandler={errorMessageHander} />
        </Carousel.Slide>
      </Carousel>
    </ArticleMakerSteppper>
  );
}
