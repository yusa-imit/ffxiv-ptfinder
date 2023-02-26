import { RTEDynamicForwarded } from '@components/RTEDynamic';
import { announceTypesValue } from '@constant/announceTypes';
import confirmAdmin from '@lib/confirmAdmin';
import { Button, Group, Input, SegmentedControl, Stack, Title } from '@mantine/core';
import { Editor } from '@mantine/rte';
import { PushArticleReturnType } from '@type/api/article/push';
import { PreDBAnnouceData } from '@type/data/AnnounceData';
import { InferGetServerSidePropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { baseUrl } from '../../src/constant/baseUrl';

export const getServerSideProps = async (ctx: any) => {
  const adminInfo = await confirmAdmin(ctx.req, ctx.res);
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale, ['common', 'data', 'nav', 'admin'])),
      data: adminInfo,
    },
  };
};
function announce({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { t } = useTranslation(['admin']);
  const SEG_VALUE_ADMIN: { label: string; value: string }[] = Array.from(
    announceTypesValue,
    (v, i) => ({
      label: t(`admin_announce_${v}`),
      value: String(i),
    })
  );
  const [type, setType] = useState<typeof announceTypesValue[number]>('maintenance');
  const krRef = useRef<Editor>(null);
  const krTitleRef = useRef<HTMLInputElement>(null);
  const enRef = useRef<Editor>(null);
  const enTitleRef = useRef<HTMLInputElement>(null);
  const jpRef = useRef<Editor>(null);
  const jpTitleRef = useRef<HTMLInputElement>(null);
  const [hasSubmit, setHasSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [link, setLink] = useState('/');
  /**
  useEffect(() => {
    const quill = document.getElementsByClassName('ql-editor')[0];
    if (quill) quill.setAttribute('style', 'min-height: 40vh');
  });
   */
  function fetchAnnounceToServer() {
    const announceData: PreDBAnnouceData = {
      type,
      titles: {
        kr: krTitleRef.current!.value,
        en: enTitleRef.current!.value,
        jp: jpTitleRef.current!.value,
      },
      descriptions: {
        kr: krRef.current!.value as string,
        en: enRef.current!.value as string,
        jp: jpRef.current!.value as string,
      },
    };
    setHasSubmit(true);
    setLoading(true);
    fetch(`${baseUrl}/api/admin/announce`, {
      method: 'POST',
      body: JSON.stringify({ data: announceData }),
    })
      .then(async (res) => {
        const { message, destination }: PushArticleReturnType = await res.json();
        setError(false);
        setLink(`/announce/${destination}`);
      })
      .catch((e) => {
        console.error(e);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  if (!data.isAdmin) {
    return <div>{data.message}</div>;
  }
  return (
    <Stack>
      <Title order={6} weight={500}>
        {t('admin_announce_type')}
      </Title>
      <Group>
        <SegmentedControl
          value={type}
          onChange={(value) => setType(value as typeof announceTypesValue[number])}
          data={SEG_VALUE_ADMIN}
        />
      </Group>
      <Title>KR</Title>
      <Input.Wrapper label="Title">
        <Input ref={krTitleRef} />
      </Input.Wrapper>
      <RTEDynamicForwarded
        forwardedRef={krRef}
        //ref={krRef}
        controls={[
          ['bold', 'strike', 'italic', 'underline'],
          ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
          ['clean'],
          ['unorderedList', 'orderedList'],
          ['link', 'blockquote', 'code', 'codeBlock'],
          ['alignLeft', 'alignCenter', 'alignRight'],
          ['sup', 'sub'],
        ]}
        style={{ width: '100%' }}
      />
      <Title>EN</Title>
      <Input.Wrapper label="Title">
        <Input ref={enTitleRef} />
      </Input.Wrapper>
      <RTEDynamicForwarded
        forwardedRef={enRef}
        controls={[
          ['bold', 'strike', 'italic', 'underline'],
          ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
          ['clean'],
          ['unorderedList', 'orderedList'],
          ['link', 'blockquote', 'code', 'codeBlock'],
          ['alignLeft', 'alignCenter', 'alignRight'],
          ['sup', 'sub'],
        ]}
        style={{ width: '100%' }}
      />
      <Title>JP</Title>
      <Input.Wrapper label="Title">
        <Input ref={jpTitleRef} />
      </Input.Wrapper>
      <RTEDynamicForwarded
        forwardedRef={jpRef}
        controls={[
          ['bold', 'strike', 'italic', 'underline'],
          ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
          ['clean'],
          ['unorderedList', 'orderedList'],
          ['link', 'blockquote', 'code', 'codeBlock'],
          ['alignLeft', 'alignCenter', 'alignRight'],
          ['sup', 'sub'],
        ]}
        style={{ width: '100%' }}
      />
      <Group style={{ marginLeft: 'auto' }}>
        <Button component={Link} href="/" color="red">
          cancel
        </Button>
        {hasSubmit ? (
          error ? (
            <Button color="red" onClick={fetchAnnounceToServer} loading={loading}>
              retry
            </Button>
          ) : (
            <>
              <Button
                onClick={() => {
                  router.reload();
                }}
              >
                make another
              </Button>
              <Button component={Link} href={link} color="green">
                success! go to announce
              </Button>
            </>
          )
        ) : (
          <Button onClick={fetchAnnounceToServer} loading={loading}>
            submit
          </Button>
        )}
      </Group>
    </Stack>
  );
}

export default announce;
