import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { supabase } from "../../../supabase";
import { exploreRoutines, initExercises, initPresets } from "../../../constants/init";

function Profile() {
  function handlePress() {
    AsyncStorage.setItem("@exercises", JSON.stringify(initExercises));
    AsyncStorage.setItem("@presets", JSON.stringify(initPresets));
    AsyncStorage.setItem("@routines", JSON.stringify(exploreRoutines));
    AsyncStorage.multiRemove(["@currentWorkout", "@workouts", "@currentMeals", "@meals", "@recipes", "@histories"]);
  }

  return (
    <SafeAreaView edges={["top", "right", "left"]}>
      <TouchableOpacity onPress={() => supabase.auth.signOut()}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={async () => await AsyncStorage.clear()}>
        <Text>Remove Data</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePress}>
        <Text>Set Init Data</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={async () =>
          await AsyncStorage.getItem("@exercises")
            .then((j) => (j ? console.log(JSON.parse(j)[0].sets) : console.log(j)))
            .catch((error) => console.log(error))
        }
      >
        <Text>Check BarbellRow</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={async () =>
          await AsyncStorage.getItem("@routines")
            .then((j) => (j ? console.log(JSON.parse(j)) : console.log(j)))
            .catch((error) => console.log(error))
        }
      >
        <Text>Check Routines</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default Profile;
