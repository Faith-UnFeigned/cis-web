import { ActionIcon, Affix } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';
import { useColorMode } from '../../Context/ColorMode';

export function FLoatingColorModeButton() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Affix
      position={{ bottom: 20, right: 20 }}
      display="flex"
      style={{
        flexDirection: 'column-reverse',
      }}
    >
      <ActionIcon size={45} variant="default" style={{ borderRadius: '50%' }} onClick={() => toggleColorMode()}>
        {colorMode === 'dark' ? <IconSun /> : <IconMoon />}
      </ActionIcon>
    </Affix>
  );
}
