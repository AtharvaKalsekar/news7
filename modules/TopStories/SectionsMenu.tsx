import { Badge, HStack } from '@components';
import { Section } from '@models';
import { Box } from 'native-base';
import { useCallback, useState } from 'react';
import { Pressable, ScrollView, StyleSheet } from 'react-native';

type Props = {
  selectedSection: Section;
  onSelectSection: (section: Section) => void;
};

export const SectionsMenu = ({ selectedSection, onSelectSection }: Props) => {
  return (
    <Box
      style={style.scrollView}
      _light={{ backgroundColor: "white" }}
      _dark={{ backgroundColor: "black" }}
    >
      <ScrollView horizontal>
        <HStack style={style.container} space={3}>
          {Object.entries(Section).map(([key, value]) => {
            return (
              <Pressable onPress={() => onSelectSection(value)} key={key}>
                <Badge
                  colorScheme={"orange"}
                  variant={selectedSection === value ? "solid" : "outline"}
                  _text={style.menuItemText}
                  borderRadius={"lg"}
                  padding={2}
                  borderColor={"orange.700"}
                >
                  {`${value} `}
                </Badge>
              </Pressable>
            );
          })}
        </HStack>
      </ScrollView>
    </Box>
  );
};

const style = StyleSheet.create({
  scrollView: {
    height: 50,
    paddingVertical: 3,
  },
  container: {
    height: 40,
    paddingHorizontal: 5,
  },
  menuItemText: {
    textTransform: "capitalize",
  },
});
