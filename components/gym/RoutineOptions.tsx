import { useContext } from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { WorkoutContext } from "../../hooks/useWorkout";
import { COLORS } from "../../constants/theme";
import { TSelectProps } from "../../pages/user/gym/Select";

interface IProps {
  navigate: TSelectProps;
}

function RoutineOptions({ navigate: { navigation } }: IProps) {
  const { settings, setSettings } = useContext(WorkoutContext);

  function handleSharePress() {}

  function handleEditPress() {}

  function handleRemovePress() {}

  return (
    <View style={styles.container}>
      <View style={styles.optionsContainer}>
        <TouchableHighlight underlayColor={COLORS.gray} onPress={() => {}}>
          <View style={styles.optionContainer}>
            <Icon name="reorder-horizontal" size={32} color={COLORS.white} />
            <Text style={styles.option}>Reorder Routines</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight underlayColor={COLORS.gray} onPress={handleSharePress}>
          <View style={styles.optionContainer}>
            <Icon name="share" size={32} color={COLORS.white} />
            <Text style={styles.option}>Share Routine</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight underlayColor={COLORS.gray} onPress={handleEditPress}>
          <View style={styles.optionContainer}>
            <Icon name="find-replace" size={32} color={COLORS.white} />
            <Text style={styles.option}>Edit Routine</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight underlayColor={COLORS.gray} onPress={handleRemovePress}>
          <View style={styles.optionContainer}>
            <Icon name="close" size={32} color={COLORS.primary} />
            <Text style={styles.remove}>Remove Routine</Text>
          </View>
        </TouchableHighlight>
      </View>
      <View style={styles.optionsContainer}>
        <TouchableHighlight
          underlayColor={COLORS.gray}
          onPress={() => setSettings((prevSettings) => ({ ...prevSettings, showOptions: false }))}
        >
          <View style={styles.optionContainer}>
            <Text style={styles.cancel}>Cancel</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 2,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#111111ee",
  },
  optionsContainer: {
    marginVertical: 8,
    width: "100%",
    borderRadius: 16,
    overflow: "hidden",
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: COLORS.blackOne,
  },
  option: {
    marginLeft: 8,
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "500",
  },
  remove: {
    marginLeft: 8,
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: "500",
  },
  cancel: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "500",
  },
});

export default RoutineOptions;
