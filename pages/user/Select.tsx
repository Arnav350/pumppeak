import { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { TCompositeProps } from "../../App";
import { TGymStackParamList } from "../../stacks/UserStack";
import MyRoutine from "../../components/gym/MyRoutine";
import ExploreRoutine from "../../components/gym/ExploreRoutine";
import { COLORS } from "../../constants/theme";

interface IExercise {
  name: string;
  sets: number;
}

interface IRoutine {
  name: String;
  exercises: IExercise[];
}

type TProps = CompositeScreenProps<StackScreenProps<TGymStackParamList, "Select">, TCompositeProps>;

function Select({ navigation }: TProps) {
  const [routines, setRoutines] = useState<IRoutine[]>([
    {
      name: "Push",
      exercises: [
        { name: "Bench Press", sets: 3 },
        { name: "Dips", sets: 3 },
        { name: "Incline Dumbbell Banded Bench Chest Press", sets: 3 },
      ],
    },
    {
      name: "Pull",
      exercises: [
        { name: "T-Bar Row", sets: 3 },
        { name: "Curls", sets: 3 },
        { name: "Lat Pulldown", sets: 3 },
      ],
    },
    {
      name: "Legs",
      exercises: [
        { name: "Squat", sets: 3 },
        { name: "Leg Curls", sets: 3 },
        { name: "Calf Raises", sets: 3 },
      ],
    },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity activeOpacity={0.3} onPress={() => navigation.navigate("Gym")}>
          <Icon name="chevron-left" size={32} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.header}>Select Routine</Text>
        <TouchableOpacity activeOpacity={0.3}>
          <Icon name="plus" size={32} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.selectContainer}>
        <Text style={styles.subheading}>My Routines</Text>
        {routines.map((routine: IRoutine, i: number) => (
          <MyRoutine key={i} routine={routine} />
        ))}
        <Text style={styles.subheading}>Explore Routines</Text>
        <Text style={styles.routine}>Push Pull Legs</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exploresContainer}>
          <ExploreRoutine name="Push" />
          <ExploreRoutine name="Pull" />
          <ExploreRoutine name="Legs" />
        </ScrollView>
        <Text style={styles.routine}>Arnold Split</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exploresContainer}>
          <ExploreRoutine name="Chest & Back" />
          <ExploreRoutine name="Shoulders & Arms" />
          <ExploreRoutine name="Legs" />
        </ScrollView>
        <Text style={styles.routine}>Full Body Split</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exploresContainer}>
          <ExploreRoutine name="Full Body 1" />
          <ExploreRoutine name="Full Body 2" />
          <ExploreRoutine name="Full Body 3" />
        </ScrollView>
        <Text style={styles.routine}>Upper Lower</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exploresContainer}>
          <ExploreRoutine name="Upper 1" />
          <ExploreRoutine name="Lower 1" />
          <ExploreRoutine name="Upper 2" />
          <ExploreRoutine name="Lower 2" />
        </ScrollView>
        <Text style={styles.routine}>Only Dumbbells</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exploresContainer}>
          <ExploreRoutine name="Dumbbell Upper" />
          <ExploreRoutine name="Dumbbell Lower" />
        </ScrollView>
        <Text style={styles.routine}>No Equipment</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exploresContainer}>
          <ExploreRoutine name="Home Upper" />
          <ExploreRoutine name="Home Lower" />
        </ScrollView>
        <Text style={styles.name}></Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.blackTwo,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: COLORS.blackTwo,
  },
  header: {
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 24,
    fontWeight: "500",
    color: COLORS.white,
  },
  selectContainer: {
    padding: 16,
    backgroundColor: COLORS.black,
  },
  subheading: {
    marginVertical: 8,
    color: COLORS.white,
    fontSize: 18,
  },
  name: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "500",
  },
  routine: {
    marginTop: 8,
    color: COLORS.white,
    fontSize: 16,
  },
  exploresContainer: {
    flexDirection: "row",
    marginVertical: 16,
    marginHorizontal: -8,
  },
});

export default Select;
