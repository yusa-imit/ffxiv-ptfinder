import { Box, Button, Center, Group, Loader, Space, Stack, Text, Title } from '@mantine/core';
import axios from 'axios';
import { useTranslation } from 'next-i18next';
import { useCallback, useEffect, useRef, useState } from 'react';
import ReactCanvasConfetti from 'react-canvas-confetti';
import { CreateTypes } from 'canvas-confetti';
import { useViewportSize } from '@mantine/hooks';
import Link from 'next/link';
import BigContainer from '../../../../base/BigContainer';

export default function Complete() {
  const { t } = useTranslation('article');
  const [loading, setLoading] = useState(false);
  const ref = useRef<CreateTypes | null>(null);
  const { height, width } = useViewportSize();
  const getInstance = useCallback(
    (instance: CreateTypes | null) => {
      ref.current = instance;
    },
    [height, width]
  );
  const makeShot = useCallback(
    (particleRatio: number, opts: object) => {
      ref.current &&
        ref.current({
          ...opts,
          origin: { y: 0.7 },
          particleCount: Math.floor(200 * particleRatio),
        });
    },
    [ref]
  );

  const fire = useCallback(() => {
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    makeShot(0.2, {
      spread: 60,
    });

    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, [makeShot]);
  useEffect(() => {
    setLoading(true);
    // TODO
    // Post alg. here
    //axios.post('/');
    setTimeout(() => setLoading(false), 2500);
  }, []);
  useEffect(() => {
    if (loading === false) {
      setTimeout(fire, 500);
    }
  }, [loading]);
  return (
    <Box
      sx={(theme) => ({
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      })}
    >
      <BigContainer
        sx={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {' '}
        <Stack
          sx={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          {loading ? (
            <>
              <Loader size="xl" variant="bars" />
              <Title>{t('complete_loading_title')}</Title>
              <Title order={6}>{t('complete_loading_desc')}</Title>
            </>
          ) : (
            <>
              <ReactCanvasConfetti
                refConfetti={getInstance}
                style={{
                  position: 'absolute',
                  pointerEvents: 'none',
                  width: '100%',
                  height: '100%',
                  top: 0,
                  left: 0,
                }}
                height={height}
                width={width}
              />
              <Title>{t('complete_congratulation')}</Title>
              <Title order={6}>{t('complete_congratulation_desc')}</Title>
              <Space h="xl" />
              <Group>
                <Link href="/" passHref>
                  <Button variant="outline">{t('complete_go_to_main')}</Button>
                </Link>
                <Link href="/" passHref>
                  <Button>{t('complete_go_to_article')}</Button>
                </Link>
              </Group>
            </>
          )}
        </Stack>
      </BigContainer>
    </Box>
  );
}
