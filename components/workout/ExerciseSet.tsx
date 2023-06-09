import { useContext, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";

import { WorkoutContext } from "../../hooks/useWorkout";
import { ISet, IExercise } from "../../pages/workout/Workout";
import DeleteSwipe from "../shared/DeleteSwipe";
import { COLORS } from "../../constants/theme";

interface IProps {
  i: number;
  j: number;
  prevSet: ISet;
  prevExercise: IExercise;
}

function ExerciseSet({ i, j, prevSet, prevExercise }: IProps) {
  const { setCurrentWorkout, setSettings } = useContext(WorkoutContext);
  const [weight, setWeight] = useState<string>("");
  const [reps, setReps] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  return (
    <Swipeable
      renderRightActions={(_progress, dragX) => <DeleteSwipe dragX={dragX} variable="set" i={i} j={j} />}
      overshootFriction={8}
    >
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.3}
          onPress={() => setSettings((prevSetting) => ({ ...prevSetting, showType: true, i: i, j: j }))}
        >
          <Text style={styles.set}>
            {prevSet.type === "N"
              ? prevExercise.sets.slice(0, j + 1).filter((set: ISet) => set.type === "N").length
              : prevSet.type}
          </Text>
        </TouchableOpacity>
        <TextInput
          value={weight}
          placeholder={prevSet.weight.toString() || "-"}
          placeholderTextColor={COLORS.darkGray}
          keyboardType="numeric"
          maxLength={5}
          keyboardAppearance="dark"
          style={styles.weight}
          onChangeText={setWeight}
          onBlur={() =>
            setCurrentWorkout((prevCurrentWorkout) => ({
              ...prevCurrentWorkout,
              exercises: [
                ...prevCurrentWorkout.exercises.map((exercise: IExercise, k: number) =>
                  k === i
                    ? {
                        ...exercise,
                        sets: [
                          ...prevCurrentWorkout.exercises[k].sets.map((set: ISet, l: number) =>
                            l === j ? { ...set, weight: weight === "" ? ("" as const) : Number(weight) } : set
                          ),
                        ],
                      }
                    : exercise
                ),
              ],
            }))
          }
        />
        <TextInput
          value={reps}
          placeholder={prevSet.reps.toString() || "-"}
          placeholderTextColor={COLORS.darkGray}
          keyboardType="numeric"
          maxLength={4}
          keyboardAppearance="dark"
          style={styles.reps}
          onChangeText={setReps}
          onBlur={() =>
            setCurrentWorkout((prevCurrentWorkout) => ({
              ...prevCurrentWorkout,
              exercises: [
                ...prevCurrentWorkout.exercises.map((exercise: IExercise, k: number) =>
                  k === i
                    ? {
                        ...exercise,
                        sets: [
                          ...prevCurrentWorkout.exercises[k].sets.map((set: ISet, l: number) =>
                            l === j ? { ...set, reps: reps === "" ? ("" as const) : Number(reps) } : set
                          ),
                        ],
                      }
                    : exercise
                ),
              ],
            }))
          }
        />
        <TextInput
          value={notes}
          placeholder={prevSet.notes || "-"}
          placeholderTextColor={COLORS.darkGray}
          numberOfLines={1}
          keyboardAppearance="dark"
          style={styles.notes}
          onChangeText={setNotes}
          onBlur={() =>
            setCurrentWorkout((prevCurrentWorkout) => ({
              ...prevCurrentWorkout,
              exercises: [
                ...prevCurrentWorkout.exercises.map((exercise: IExercise, k: number) =>
                  k === i
                    ? {
                        ...exercise,
                        sets: [
                          ...prevCurrentWorkout.exercises[k].sets.map((set: ISet, l: number) =>
                            l === j ? { ...set, notes } : set
                          ),
                        ],
                      }
                    : exercise
                ),
              ],
            }))
          }
        />
      </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 4,
    backgroundColor: COLORS.blackOne,
  },
  set: {
    width: 27,
    color: COLORS.white,
    textAlign: "center",
    fontSize: 16,
  },
  weight: {
    width: 55,
    color: COLORS.white,
    textAlign: "center",
    fontSize: 16,
  },
  reps: {
    width: 40,
    color: COLORS.white,
    textAlign: "center",
    fontSize: 16,
  },
  notes: {
    flex: 1,
    paddingLeft: 19,
    color: COLORS.white,
    fontSize: 16,
  },
});

export default ExerciseSet;
