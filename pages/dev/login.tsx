import { Button, Center } from '@mantine/core';
import { Locale } from '@type/Locale';
import { GetStaticProps } from 'next';
import { signIn, signOut, useSession } from 'next-auth/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

function login(props: GetStaticProps) {
  console.log(props);
  const { data: session } = useSession();
  if (session) {
    return (
      <Center
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '20%',
        }}
      >
        <p>
          {Object.keys(session).map((v) => (
            <p>{`${v} : ${JSON.stringify(session[v])}`}</p>
          ))}
        </p>
        <Button
          onClick={() => {
            signOut();
          }}
        >
          log out
        </Button>
      </Center>
    );
  }
  return (
    <Center
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '20%',
      }}
    >
      <p>no loged in</p>
      <Button
        onClick={() => {
          signIn();
        }}
      >
        log in
      </Button>
    </Center>
  );
}

export const getStaticProps = async ({ locale }: { locale: Locale }) => ({
  props: {
    ...(await serverSideTranslations(locale)),
  },
});

export default login;
