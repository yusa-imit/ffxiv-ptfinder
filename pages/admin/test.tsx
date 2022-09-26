import confirmAdmin from '@lib/confirmAdmin';
import { InferGetServerSidePropsType } from 'next';

export const getServerSideProps = async (ctx: any) => {
  const adminInfo = await confirmAdmin(ctx.req, ctx.res);
  return {
    props: {
      data: adminInfo,
    },
  };
};

function test({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!data.isAdmin) {
    return <div>{data.message}</div>;
  }
  return <div>welcome admin</div>;
}

export default test;
