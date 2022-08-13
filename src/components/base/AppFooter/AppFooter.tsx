import React from 'react';
import { createStyles, Group, Anchor, Title, Stack, Divider, Text } from '@mantine/core';
import { FooterLinks } from '@type/FooterLinks';
import AppFooterStyles from './AppFooter.styles';
import BigContainer from '../BigContainer';

interface FooterSimpleProps {
  Logo: React.ReactNode;
  title: string;
  links: FooterLinks;
}

export default function AppFooter({ Logo, title, links }: FooterSimpleProps) {
  const { classes } = AppFooterStyles();
  const items = links.map((link) => (
    <Anchor<'a'>
      color="dimmed"
      key={link.label}
      href={link.link}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <footer className={classes.footer}>
      <BigContainer className={classes.inner}>
        <Group align="center" position="center">
          {Logo}
          <Title order={1} align="center">
            {title}
          </Title>
        </Group>
        <Group className={classes.links}>{items}</Group>
      </BigContainer>
      <BigContainer className={classes.afterFooter} size="xl">
        <Stack spacing={0}>
          <Text color="dimmed" size="sm">
            © 2022 DEV_APP_URL All rights reserved.
          </Text>
          <Text color="dimmed" size="sm">
            © 2010 - 2022 SQUARE ENIX CO., LTD. All Rights Reserved.
          </Text>
        </Stack>
      </BigContainer>
    </footer>
  );
}
