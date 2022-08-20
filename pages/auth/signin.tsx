import { Button, Center, Container, createStyles, Stack, Image } from '@mantine/core';
import { BuiltInProviderType } from 'next-auth/providers';
import {
  ClientSafeProvider,
  getCsrfToken,
  getProviders,
  LiteralUnion,
  signIn,
} from 'next-auth/react';
import { UserConfig, useTranslation } from 'next-i18next';
import { Locale } from '@type/Locale';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface SignInPageServerSideProps {
  csrfToken: string;
  providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null;
  _nextI18Next: {
    initialI18nStore: any;
    initialLocale: string;
    ns: string[];
    userConfig: UserConfig | null;
  };
}

const buttonTheme = createStyles((theme) => ({
  google_root: {
    marginLeft: '8px',
    marginRight: '8px',
    height: '40px',
    color: theme.black,
    boxShadow: '0 -1px 0 rgba(0, 0, 0, .04), 0 1px 1px rgba(0, 0, 0, .25)',
    backgroundColor: '#ffffff',
    ':hover': {
      backgroundColor: theme.white,
      filter: 'brightness(90%)',
    },
    ':active': {
      filter: 'brightness(70%)',
    },
  },
  google_leftIcon: {
    marginRight: '24px',
    width: '18px',
    height: '18px',
  },
  discord_root: {
    marginLeft: '8px',
    marginRight: '8px',
    height: '40px',
    color: theme.colors.white,
    boxShadow: '0 -1px 0 rgba(0, 0, 0, .04), 0 1px 1px rgba(0, 0, 0, .25)',
    backgroundColor: '#5865F2',
    ':hover': {
      backgroundColor: '#5865F2',
      filter: 'brightness(90%)',
    },
    ':active': {
      filter: 'brightness(70%)',
    },
  },
  discord_leftIcon: {
    marginRight: '24px',
    width: '18px',
    height: '18px',
  },
  twitter_root: {
    marginLeft: '8px',
    marginRight: '8px',
    height: '40px',
    color: theme.colors.white,
    boxShadow: '0 -1px 0 rgba(0, 0, 0, .04), 0 1px 1px rgba(0, 0, 0, .25)',
    backgroundColor: '#1DA1F2',
    ':hover': {
      backgroundColor: '#1DA1F2',
      filter: 'brightness(90%)',
    },
    ':active': {
      filter: 'brightness(70%)',
    },
  },
  twitter_leftIcon: {
    marginRight: '24px',
    width: '19px',
    height: '15px',
  },
  kakao_root: {
    marginLeft: '8px',
    marginRight: '8px',
    height: '40px',
    color: theme.black,
    boxShadow: '0 -1px 0 rgba(0, 0, 0, .04), 0 1px 1px rgba(0, 0, 0, .25)',
    backgroundColor: '#FEE500',
    ':hover': {
      backgroundColor: '#FEE500',
      filter: 'brightness(90%)',
    },
    ':active': {
      filter: 'brightness(70%)',
    },
  },
  kakao_leftIcon: {
    marginRight: '24px',
    width: '18px',
    height: '18px',
  },
  line_root: {
    marginLeft: '8px',
    marginRight: '8px',
    height: '40px',
    color: theme.white,
    boxShadow: '0 -1px 0 rgba(0, 0, 0, .04), 0 1px 1px rgba(0, 0, 0, .25)',
    backgroundColor: '#06C755',
    ':hover': {
      backgroundColor: '#06C755',
      filter: 'brightness(90%)',
    },
    ':active': {
      filter: 'brightness(70%)',
    },
  },
  line_leftIcon: {
    marginRight: '24px',
    width: '24px',
    height: '24px',
  },
  naver_root: {
    marginLeft: '8px',
    marginRight: '8px',
    height: '40px',
    color: theme.white,
    boxShadow: '0 -1px 0 rgba(0, 0, 0, .04), 0 1px 1px rgba(0, 0, 0, .25)',
    backgroundColor: '#03C75A',
    ':hover': {
      backgroundColor: '#03C75A',
      filter: 'brightness(90%)',
    },
    ':active': {
      filter: 'brightness(70%)',
    },
  },
  naver_leftIcon: {
    marginRight: '24px',
    width: '28px',
    height: '28px',
  },
}));

function signin({ csrfToken, providers, _nextI18Next }: SignInPageServerSideProps) {
  const { t } = useTranslation('auth');
  const { classes } = buttonTheme();
  console.log(providers);
  return (
    <Center style={{ width: '100%', height: '100%' }}>
      <Container size="xs" p="xl" fluid>
        <Stack>
          {providers &&
            Object.values(providers).map((provider) => (
              <Button
                classNames={{
                  // @ts-ignore
                  root: classes[`${provider.id}_root`],
                  // @ts-ignore
                  leftIcon: classes[`${provider.id}_leftIcon`],
                }}
                onClick={() => {
                  signIn(provider.id);
                }}
                leftIcon={<Image src={`/auth/icons/${provider.id}.png`} />}
              >
                {t(`auth_signin_button_name_${provider.id}`).toUpperCase()}
              </Button>
            ))}
        </Stack>
      </Container>
    </Center>
  );
}

export async function getServerSideProps({ locale }: { locale: Locale }) {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken();
  return {
    props: {
      providers,
      csrfToken,
      ...(await serverSideTranslations(locale)),
    },
  };
}

export default signin;
