import React, { useEffect, useRef, useState } from 'react';
import {
  Grid,
  List,
  useMantineTheme,
  Container,
  Button,
  Drawer,
  Center,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { ItemProps } from './utils';
import HymnItem from './components/HymnItem';
import HymnPreview from './components/HymnPreview';
import FIleUploadArea from './components/FileUploadArea';

const MarkdownList: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [list, setList] = useState<ItemProps[] | null>(null);
  const theme = useMantineTheme();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedItem]);

  const handleFileUpload = (payload: File | null) => {
    const file = payload;
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const jsonData: ItemProps[] = JSON.parse(e.target?.result as string);
        validateJson(jsonData);
        setList(jsonData);
        setSelectedItem(jsonData[0].content);
        setError(null);
      } catch (error) {
        setError(error as string);
      }
    };

    if (file) {
      reader.readAsText(file);
    }
  };

  const validateJson = (jsonData: ItemProps[]) => {
    if (!Array.isArray(jsonData)) {
      throw new Error(
        'Invalid JSON format. contents of this JSON file must be an array.'
      );
    }
    for (const item of jsonData) {
      if ((item.title && item.content) || item.markdown) {
        if (item.content && typeof item.content !== 'string') {
          throw new Error(
            `Invalid JSON format. "content" property of item with title "${item.title}" must be a string.`
          );
        }

        if (item.markdown && typeof item.markdown !== 'string') {
          throw new Error(
            `Invalid JSON format. "markdown" property of item with title "${item.title}" must be a string.`
          );
        }
      }
    }
  };

  const handleFetchData = async (url: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error fetching data.');
      }
      const jsonData = await response.json();
      validateJson(jsonData);
      setList(jsonData);
      setSelectedItem(jsonData[0].content);
      setError(null);
    } catch (error) {
      console.error('Error fetching JSON data:', error);
      setError(error as string);
    } finally {
      setIsLoading(false);
    }
  };

  const handleItemClick = (content?: string) => {
    setSelectedItem(content as string);
    if (isMobile) {
      setIsDrawerOpen(false);
    }
  };

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  if (!list) {
    return (
      <FIleUploadArea
        handleFileUpload={handleFileUpload}
        error={error}
        loading={isLoading}
        handleFetchData={handleFetchData}
      />
    );
  }

  return (
    <>
      <Container size={isMobile ? 'sm' : 'xl'}>
        <br />
        {isMobile && (
          <Button
            variant="outline"
            onClick={handleOpenDrawer}
            style={{ marginBottom: theme.spacing.sm }}
          >
            Show songs
          </Button>
        )}
        <div ref={scrollRef} />
        {!isMobile && (
          <Grid>
            <Grid.Col span={4}>
              <List listStyleType="none" withPadding>
                {!error &&
                  list?.map((item) => (
                    <HymnItem
                      key={item.number}
                      item={item}
                      selectedItem={selectedItem}
                      handleItemClick={handleItemClick}
                    />
                  ))}
              </List>
            </Grid.Col>
            <Grid.Col span={8}>
              <HymnPreview selectedItem={selectedItem} />
              <Center>
                <Button
                  variant="outline"
                  onClick={() => {
                    setList(null);
                    setSelectedItem(null);
                  }}
                  style={{
                    marginBottom: theme.spacing.sm,
                    margin: 20,
                    bottom: 0,
                    position: 'absolute',
                  }}
                >
                  Upload another file
                </Button>
              </Center>
            </Grid.Col>
          </Grid>
        )}

        {isMobile && (
          <>
            <HymnPreview selectedItem={selectedItem} />
            <Center>
              <Button
                variant="outline"
                onClick={() => {
                  setList(null);
                  setSelectedItem(null);
                }}
                style={{
                  marginBottom: theme.spacing.sm,
                  margin: 20,
                  bottom: 0,
                  position: 'absolute',
                }}
              >
                Upload another file
              </Button>
            </Center>
            <Drawer
              opened={isDrawerOpen}
              onClose={handleCloseDrawer}
              size="md"
              padding="md"
              title="List of Hymns"
              withCloseButton={false}
            >
              <List listStyleType="none" withPadding>
                {!error &&
                  list?.map((item) => (
                    <HymnItem
                      key={item.number}
                      item={item}
                      selectedItem={selectedItem}
                      handleItemClick={handleItemClick}
                    />
                  ))}
              </List>
            </Drawer>
          </>
        )}
      </Container>
    </>
  );
};

export default MarkdownList;
