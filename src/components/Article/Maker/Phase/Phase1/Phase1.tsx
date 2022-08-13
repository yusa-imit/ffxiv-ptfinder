import BigContainer from '@components/base/BigContainer';
import { GroupedTransition, TextInput, Transition } from '@mantine/core';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Article } from '../../../../../recoil/Article/index';
import { Phase1Styles } from './Phase1.styles';

export default function Phase1({ current, increasing }: { current: number; increasing: boolean }) {
  const route = useRouter();
  const { classes } = Phase1Styles();
  const { t } = useTranslation('article');
  const [titleCheck, setTitleCheck] = useState(false);
  const [article, changeArticle] = useRecoilState(Article);
  const titleError = () => {
    if (titleCheck) return false;
    return 'phase1_title_necessary';
  };
  const titleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.value !== '') {
      const newArticle = { ...article };
      setTitleCheck(true);
      newArticle.title = event.currentTarget.value;
      changeArticle(newArticle);
    } else {
      setTitleCheck(false);
    }
  };
  useEffect(() => {
    const newArticle = { ...article };
    if (route.locale === 'en' || !route.locale) {
      newArticle.region = 'NA';
    } else if (route.locale === 'jp') {
      newArticle.region === 'JP';
    } else if (route.locale === 'kr') {
      newArticle.region === 'KR';
    } else if (route.locale === 'cn') {
      newArticle.region === 'CN';
    }
    changeArticle(newArticle);
  }, []);
  return (
    <Transition
      transition={increasing ? 'slide-right' : 'slide-left'}
      mounted={current === 0}
      duration={500}
      timingFunction="ease"
    >
      {(styles) => (
        <BigContainer className={classes.inner} style={styles}>
          <TextInput
            className={classes.title}
            placeholder={t('phase1_title_placeholder')}
            label={t('phase1_title_label')}
            required
            onChange={titleOnChange}
            error={titleError()}
          />
          <TextInput
            className={classes.title}
            placeholder={t('phase1_title_placeholder')}
            label={t('phase1_title_label')}
            required
            onChange={titleOnChange}
            error={titleError()}
          />
        </BigContainer>
      )}
    </Transition>
  );
}
