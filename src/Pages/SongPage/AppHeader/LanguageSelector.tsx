import { useState } from "react";
import {
  Tooltip,
  ActionIcon,
  Modal,
  TextInput,
  List,
  NavLink,
  ScrollArea,
  Space,
} from "@mantine/core";
import { IconLanguage } from "@tabler/icons-react";
import { Link, useParams } from "react-router-dom";
import { useDisclosure, useLocalStorage } from "@mantine/hooks";

import { PREFERRED_HYMNAL_STORAGE_KEY } from "../../../data/hymnalsConfig";
import { useHymnalsConfig } from "../../../Context/HymnalsConfig";

export function LanguageSelector({
  selectedItem,
  resetHymnalData,
}: {
  selectedItem: number | null;
  resetHymnalData: () => void;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [filterText, setFilterText] = useState("");
  const [, setPreferredHymnal] = useLocalStorage<string>({
    key: PREFERRED_HYMNAL_STORAGE_KEY,
    defaultValue: "",
  });
  const { key } = useParams();
  const { hymnals, findHymnal } = useHymnalsConfig();
  const selectedHymnalKey = findHymnal(key)?.key;

  const searchRegex = new RegExp(filterText, "i");

  const filteredHymnals =
    filterText.trim() !== ""
      ? hymnals.filter(
          (hymnal) =>
            hymnal.title.match(searchRegex) ||
            hymnal.language.match(searchRegex),
        )
      : hymnals;

  return (
    <>
      <Tooltip label="Change hymnal language">
        <ActionIcon
          aria-label="Change hymnal language"
          size={35}
          variant="default"
          onClick={open}
        >
          <IconLanguage />
        </ActionIcon>
      </Tooltip>

      <Modal
        opened={opened}
        onClose={close}
        title="Choose a hymnal"
        centered
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        style={{ overflow: "hidden" }}
      >
        <TextInput
          type="search"
          placeholder="Search hymnals"
          onInput={(e) => setFilterText((e.target as HTMLInputElement).value)}
          autoFocus
        />
        <Space style={{ height: "0.7em" }} />
        <ScrollArea.Autosize mah="calc(100vh - 220px)" offsetScrollbars>
          <List listStyleType="none">
            {[...filteredHymnals]
              .sort((a, b) => (a.title < b.title ? -1 : 1))
              .map((value) => (
                <Link
                  key={value.key}
                  to={`/songs/${value.fileName}/${selectedItem}`}
                  onClick={() => {
                    setPreferredHymnal(value.key);
                    close();
                    resetHymnalData();
                  }}
                >
                  <NavLink
                    active={value.key === selectedHymnalKey}
                    label={value.title}
                    description={value.language}
                  />
                </Link>
              ))}
          </List>
        </ScrollArea.Autosize>
      </Modal>
    </>
  );
}
