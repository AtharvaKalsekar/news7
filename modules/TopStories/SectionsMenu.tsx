import { Badge, HStack } from '@components';
import { Section } from '@models';
import { useCallback, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

type Props = {
  selectedSection: Section;
  onSelectSection: (section: Section) => void;
};

export const SectionsMenu = ({ selectedSection, onSelectSection }: Props) => {
  return (
    <View style={style.scrollView}>
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
                >
                  {`${value} `}
                </Badge>
              </Pressable>
            );
          })}
        </HStack>
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  scrollView: {
    height: 40,
  },
  container: {
    height: 40,
    paddingHorizontal: 5,
  },
  menuItemText: {
    textTransform: "capitalize",
  },
});
