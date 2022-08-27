import { Carousel, Embla, useAnimationOffsetEffect } from '@mantine/carousel';
import { useListState } from '@mantine/hooks';
import { createContext, startTransition, useEffect, useState } from 'react';
import RTEDynamic from '@components/RTEDynamic';
import Phase1 from './Phase/Phase1/Phase1';
import Phase2 from './Phase/Phase2/Phase2';
import Phase3 from './Phase/Phase3/Phase3';
import Phase4 from './Phase/Phase4/Phase4';
import Phase5 from './Phase/Phase5/Phase5';
import { PreRender } from './Phase/PreRender';
import { ArticleMakerSteppper } from './Stepper/ArticleMakerStepper';
import { RTELoadingContext } from '../RTELoadingContext';
import LoadingScreen from '../LoadingScreen';

export default function ArticleMaker() {
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
        <Carousel.Slide style={{ width: '100vw' }}>
          <Phase1
            render={step === 0}
            errorMessages={errorMessages}
            errorMessageHandler={errorMessageHander}
          />
        </Carousel.Slide>
        <Carousel.Slide style={{ width: '100vw' }}>
          <Phase2
            render={step === 1}
            errorMessages={errorMessages}
            errorMessageHandler={errorMessageHander}
          />
        </Carousel.Slide>
        <Carousel.Slide style={{ width: '100vw' }}>
          <Phase3
            render={step === 2}
            errorMessages={errorMessages}
            errorMessageHandler={errorMessageHander}
          />
        </Carousel.Slide>
        <Carousel.Slide style={{ width: '100vw' }}>
          <Phase4
            render={step === 3}
            errorMessages={errorMessages}
            errorMessageHandler={errorMessageHander}
          />
        </Carousel.Slide>
        <Carousel.Slide style={{ width: '100vw' }}>
          <Phase5
            render={step === 4}
            errorMessages={errorMessages}
            errorMessageHandler={errorMessageHander}
          />
        </Carousel.Slide>
      </Carousel>
    </ArticleMakerSteppper>
  );
}
