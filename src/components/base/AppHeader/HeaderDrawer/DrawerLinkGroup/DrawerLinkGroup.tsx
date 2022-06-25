import { useState, ForwardedRef } from 'react';
import { Group, Box, Collapse, ThemeIcon, Text, UnstyledButton } from '@mantine/core';
import { Icon as TablerIcon, CalendarStats, ChevronLeft, ChevronRight } from 'tabler-icons-react';
import { HeaderLinks } from '@type/HeaderLinks';
import Link from 'next/link';
import drawerLinkGroupStyles from './DrawerLinkGroup.style';

interface DrawerLinkGroupProps {
  icon: TablerIcon;
  label: string;
  initiallyOpened?: boolean;
  link?: string;
  links?: HeaderLinks;
  forceChevron?: boolean;
  onClick?: () => void;
  ref?: ForwardedRef<HTMLButtonElement>;
}

export function DrawerLinkGroup({
  icon: Icon,
  label,
  initiallyOpened,
  link,
  links,
  forceChevron,
  onClick,
  ref,
}: DrawerLinkGroupProps) {
  const { classes, theme } = drawerLinkGroupStyles();
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const ChevronIcon = theme.dir === 'ltr' ? ChevronRight : ChevronLeft;
  const items = (hasLinks ? links : []).map((_link) => {
    if (!_link.link) {
      throw new Error('Nested link must have link property.');
    }
    return (
      <Link href={_link.link} passHref>
        <Text<'a'>
          component="a"
          className={classes.link}
          href={_link.link}
          key={_link.label}
          onClick={(event) => event.preventDefault()}
        >
          {_link.label}
        </Text>
      </Link>
    );
  });
  if (!hasLinks && link !== undefined) {
    return (
      <Link href={link} passHref>
        <UnstyledButton className={classes.control}>
          <Group position="apart" spacing={0}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ThemeIcon variant="light" size={30}>
                <Icon size={18} />
              </ThemeIcon>
              <Box ml="md">{label}</Box>
            </Box>
            {forceChevron && <ChevronIcon className={classes.chevron} size={14} />}
          </Group>
        </UnstyledButton>
      </Link>
    );
  }
  if (!hasLinks && link === undefined) {
    return (
      <UnstyledButton
        ref={ref}
        className={classes.control}
        onClick={() => {
          if (onClick) onClick();
        }}
      >
        <Group position="apart" spacing={0}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ThemeIcon variant="light" size={30}>
              <Icon size={18} />
            </ThemeIcon>
            <Box ml="md">{label}</Box>
          </Box>
          {forceChevron && <ChevronIcon className={classes.chevron} size={14} />}
        </Group>
      </UnstyledButton>
    );
  }

  return (
    <>
      <UnstyledButton
        onClick={() => {
          if (!hasLinks && forceChevron) return;
          setOpened((o) => !o);
        }}
        className={classes.control}
      >
        <Group position="apart" spacing={0}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ThemeIcon variant="light" size={30}>
              <Icon size={18} />
            </ThemeIcon>
            <Box ml="md">{label}</Box>
          </Box>
          {(hasLinks || forceChevron) && (
            <ChevronIcon
              className={classes.chevron}
              size={14}
              style={{
                transform: opened ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)` : 'none',
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}
