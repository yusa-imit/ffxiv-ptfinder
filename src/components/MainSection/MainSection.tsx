import { Box, BoxProps, Button, Divider, Group, Title } from '@mantine/core';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { ChevronRight } from 'tabler-icons-react';
import { MainSectionStyle } from './MainSection.style';

interface MainSectionProps extends BoxProps {
  title: string;
  seeMore?: boolean;
  href?: string;
}

export default function MainSection({ title, seeMore, href, children, ...etc }: MainSectionProps) {
  const { classes } = MainSectionStyle();
  const { t } = useTranslation('common');
  return (
    <section className={classes.wrapper}>
      <Group className={classes.titleGroup}>
        <Title order={6} className={classes.title}>
          {title}
        </Title>
        {seeMore && (
          <Link href={href as string} passHref>
            <Button
              component="a"
              compact
              className={classes.seeMore}
              size="xs"
              variant="subtle"
              rightIcon={<ChevronRight size={16} />}
            >
              {t('see_more')}
            </Button>
          </Link>
        )}
      </Group>
      <Divider className={classes.divider} />
      <Box className={classes.main} {...etc}>
        {children}
      </Box>
    </section>
  );
}
