import { Button, Center } from '@mantine/core';
import { Locale } from '@type/Locale';
import { GetServerSideProps, GetStaticProps } from 'next';
import { unstable_getServerSession } from '@auth/next-auth/src';
import { signIn, signOut, useSession } from 'next-auth/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { authOptions } from '../api/auth/[...nextauth]';
import '@extType/ExtendedServerSession';

function login() {
  const { data: session } = useSession();
  /*
  const [session, setSession] = useState({});
  useEffect(() => {
    console.log(data);
    try {
      setSession(superjson.parse(data));
    } catch {
      /* catch {
      console.log(data);
      axios.get('/api/util/user').then((value) => {
        data.user = value.data;
        setSession(data);
      });
    }
  }, [data]);
  //console.log(session);*/
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
        <div>
          {Object.keys(session).map((v, i) => (
            <p key={i}>{`${v} : ${JSON.stringify(session[v])}`}</p>
          ))}
        </div>
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

export const getServerSideProps = async (context: any) => {
  /*
  const { json, meta } = superjson.serialize(
    await unstable_getServerSession(context.req, context.res, authOptions)
  );*/
  console.log('call get serverside props');

  return {
    props: {
      ...(await serverSideTranslations(context.locale as Locale)),
      // @ts-expect-error
      session: await unstable_getServerSession(context.req, context.res, authOptions),
    },
  };
};

export default login;
