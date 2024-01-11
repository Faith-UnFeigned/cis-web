import {
  Text,
  Button,
  Container,
  FileButton,
  Code,
  Input,
  Grid,
} from '@mantine/core';
import { useState, ChangeEvent } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

interface Props {
  handleFileUpload: (payload: File | null) => void;
  error: string | null;
  handleFetchData:(url: string) =>  void;
  loading: boolean;
}



const FileUploadArea = ({
  handleFileUpload,
  error,
  handleFetchData,
  loading,
}: Props) => {
  const [url, setUrl] = useState<string>('');
  return (
    <>

    <Container size="md" style={{ height: '120vh' }}>
      <div
        style={{
          height:'100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <FileButton onChange={handleFileUpload} accept=".json">
          {(props) => <Button {...props}>Upload JSON File</Button>}
        </FileButton>
        <br />
        <Text align="center">OR</Text>
        <br />
        <Grid >
          <Grid.Col md={11} sm={10}>
            <Input
              placeholder="Enter JSON URL"
              value={url}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setUrl(event?.target.value)
              }

            />
          </Grid.Col>
          <Grid.Col md={1} sm={2}>
            <Button variant="outline" onClick={() => handleFetchData(url)} loading={loading} disabled={!url}>
              Fetch Data
            </Button>
          </Grid.Col>
        </Grid>
        <br />
        <Code>{url}</Code>
        <br />
        <Text align="center">
          Upload or type url to a hymnal json file to get started. The content of the json
          should be an array of objects with a title,content and number property like
          the example shown below or you can check examples of other files here <a href="https://github.com/TinasheMzondiwa/cis-hymnals">https://github.com/TinasheMzondiwa/cis-hymnals</a>
        </Text>
        <br />
        <ReactMarkdown>
        {
          `
          [
            {
              "title": "3 Face To Face",
              "number": 3,
              "content": "<h1>some html here, content can also in markdown</h1>"
            }
          ]
          `
        }
        </ReactMarkdown>
        <br />
        <Text >
        We also support this format markdown key, so you can have
        <code>"markdown": "## Some markdown here" instead of content.</code>
        </Text>
        <br />
        <Text align="center" color="red">
          {error &&
            `${error}, make sure the file is JSON and the content of the file matches the format above`}
        </Text>
      </div>
    </Container>
    </>
  );
};

export default FileUploadArea;
