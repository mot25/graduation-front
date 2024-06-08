import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown as RNDropdown } from 'react-native-element-dropdown';
import { OptionType } from '../DropDownTypes';

interface Props {
  list: OptionType[];
  onChange: (id: OptionType['value']) => void;
  value?: OptionType['value'];
  title?: string;
  placeholder?: string;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8
  },
  icon: {
    marginRight: 5
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14
  },
  placeholderStyle: {
    fontSize: 16
  },
  selectedTextStyle: {
    fontSize: 16
  },
  iconStyle: {
    width: 20,
    height: 20
  }
});
export const DropDown = ({
  list,
  value,
  onChange,
  title,
  placeholder
}: Props) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View>
      {title && <Text>{title}</Text>}
      <RNDropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={list}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          onChange(item.value);
          setIsFocus(false);
        }}
      />
    </View>
  );
};
