import { createStyles, rem } from "@mantine/core";



export interface ItemProps {
    title: string;
    content: string;
    number: number;
    markdown?: string;
}


export const useDropZoneStyles = createStyles((theme) => ({
    wrapper: {
      position: 'relative',
      marginBottom: rem(30),
    },

    dropzone: {
      borderWidth: rem(1),
      paddingBottom: rem(50),
    },

    icon: {
      color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
    },

    control: {
      position: 'absolute',
      width: rem(250),
      left: `calc(50% - ${rem(125)})`,
      bottom: rem(-20),
    },
  }));