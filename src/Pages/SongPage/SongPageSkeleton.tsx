import { AppShell, Group, Skeleton, Stack, Center } from "@mantine/core";

export function SongPageSkeleton() {
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
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
          {Array.from({ length: 35 }).map((_, i) => (
            <Skeleton key={i} height={20} radius="sm" width={`85%`} />
          ))}
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main>
        <Center>
          <div style={{ maxWidth: 600, width: "100%", fontSize: "1.2em" }}>
            <div style={{ marginBottom: "1.5em" }}>
              <Skeleton height={20} width="70%" mb={10} />
              <Skeleton height={20} width="65%" mb={10} />
              <Skeleton height={20} width="60%" mb={10} />
              <Skeleton height={20} width="68%" />
            </div>
            <div style={{ marginBottom: "1.5em" }}>
              <Skeleton height={20} width="62%" mb={10} />
              <Skeleton height={20} width="68%" mb={10} />
              <Skeleton height={20} width="58%" mb={10} />
              <Skeleton height={20} width="64%" />
            </div>
            <div style={{ marginBottom: "1.5em" }}>
              <Skeleton height={20} width="66%" mb={10} />
              <Skeleton height={20} width="72%" mb={10} />
              <Skeleton height={20} width="60%" mb={10} />
              <Skeleton height={20} width="68%" />
            </div>
            <div style={{ marginBottom: "1.5em" }}>
              <Skeleton height={20} width="58%" mb={10} />
              <Skeleton height={20} width="64%" mb={10} />
              <Skeleton height={20} width="70%" mb={10} />
              <Skeleton height={20} width="62%" />
            </div>
          </div>
        </Center>
      </AppShell.Main>
    </AppShell>
  );
}
