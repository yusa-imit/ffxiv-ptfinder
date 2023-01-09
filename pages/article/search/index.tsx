import SearchPanel from '@components/Article/SearchPanel';
import { Stack } from '@mantine/core';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';

export async function getServerSideProps({ locale, query }: GetServerSidePropsContext) {
  return {
    props: {},
  };
}

function SearchPage({ props }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Stack>
      <SearchPanel />
    </Stack>
  );
}

export default SearchPage;
