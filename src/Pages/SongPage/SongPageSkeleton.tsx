import { AppShell, Center, Group, Skeleton, Stack, Text } from '@mantine/core';

const VERSE_LINES: string[][] = [
  ['70%', '65%', '60%', '68%'],
  ['62%', '68%', '58%', '64%'],
  ['66%', '72%', '60%', '68%'],
  ['58%', '64%', '70%', '62%'],
];

function VerseSkeleton({ number, lines }: { number: number; lines: string[] }) {
  return (
    <div style={{ marginBottom: '2em' }}>
      <Text size="xs" fw={600} c="dimmed" mb={6} style={{ letterSpacing: '0.05em' }}>
        VERSE {number}
      </Text>
      {lines.map((width, i) => (
        <Skeleton key={width} height={20} width={width} mb={i < lines.length - 1 ? 10 : 0} />
      ))}
    </div>
  );
}

export function SongPageSkeleton() {
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: true },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Skeleton width={35} height={35} radius="sm" />
          <Group gap="sm">
            <Skeleton width={35} height={35} radius="sm" />
            <Skeleton width={80} height={35} radius="sm" />
            <Skeleton width={35} height={35} radius="sm" />
          </Group>
          <Skeleton width={35} height={35} radius="sm" />
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Skeleton height={36} radius="sm" mb="md" />
        <Skeleton height={20} width={120} mb="md" />
        <Stack gap="xs">
          {Array.from({ length: 15 }).map((_, i) => (
            // biome-ignore lint: the usage of index here is intentional and not problematic
            <Skeleton key={i} height={20} radius="sm" width="85%" />
          ))}
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main>
        <Center>
          <div style={{ maxWidth: 600, width: '100%', fontSize: '1.2em' }}>
            <div
              style={{
                textAlign: 'center',
                marginBottom: '2em',
                paddingBottom: '1.5em',
                borderBottom: '1px solid var(--mantine-color-gray-2)',
              }}
            >
              <Skeleton height={28} width="60%" mx="auto" />
            </div>
            {VERSE_LINES.map((lines, i) => (
              <VerseSkeleton key={lines[i]} number={i + 1} lines={lines} />
            ))}
          </div>
        </Center>
      </AppShell.Main>
    </AppShell>
  );
}
