import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';

export async function getServerSideProps({ locale, query }: GetServerSidePropsContext) {
  return {
    props: {},
  };
}

function SearchPage({ props }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <></>;
}

export default SearchPage;
