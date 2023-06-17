import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthContext } from "./useAuth";
import { IExercise, IWorkout, IRoutine } from "../pages/workout/Workout";

interface IProviderChildren {
  children: ReactNode;
}

interface IWorkoutContext {
  currentWorkout: IWorkout;
  setCurrentWorkout: Dispatch<SetStateAction<IWorkout>>;
  exercises: IExercise[];
  setExercises: Dispatch<SetStateAction<IExercise[]>>;
  workouts: IWorkout[];
  setWorkouts: Dispatch<SetStateAction<IWorkout[]>>;
  routines: IRoutine[];
  setRoutines: Dispatch<SetStateAction<IRoutine[]>>;
}

export const WorkoutContext = createContext<IWorkoutContext>({} as IWorkoutContext);

const initWorkout: IWorkout = {
  date: {
    month: "",
    day: "",
  },
  name: "Name",
  time: "",
  weight: 0,
  exercises: [],
};

const initArray: [] = [];

const init: IExercise[] = [];

function WorkoutProvider({ children }: IProviderChildren) {
  const currentUser = useContext(AuthContext);

  const [currentWorkout, setCurrentWorkout] = useState<IWorkout>(initWorkout);
  const [exercises, setExercises] = useState<IExercise[]>(init);
  const [workouts, setWorkouts] = useState<IWorkout[]>(initArray);
  const [routines, setRoutines] = useState<IRoutine[]>(initArray);

  useEffect(() => {
    if (currentWorkout !== initWorkout) {
      AsyncStorage.setItem(`@${currentUser?.id}:currentWorkout`, JSON.stringify(currentWorkout));
    }
  }, [currentWorkout]);

  useEffect(() => {
    if (exercises !== init) {
      AsyncStorage.setItem(`@${currentUser?.id}:exercises`, JSON.stringify(exercises));
      console.log("====");
      console.log(exercises);
      console.log("====");
      console.log(initArray);
      console.log("====");
    }
  }, [exercises]);

  useEffect(() => {
    if (workouts !== initArray) {
      AsyncStorage.setItem(`@${currentUser?.id}:workouts`, JSON.stringify(workouts));
    }
  }, [workouts]);

  useEffect(() => {
    if (routines !== initArray) {
      AsyncStorage.setItem(`@${currentUser?.id}:routines`, JSON.stringify(routines));
    }
  }, [routines]);

  useEffect(() => {
    AsyncStorage.multiGet([
      `@${currentUser?.id}:currentWorkout`,
      `@${currentUser?.id}:exercises`,
      `@${currentUser?.id}:workouts`,
      `@${currentUser?.id}:routines`,
    ]).then((arrayJson) => {
      if (arrayJson[0][1]) {
        setCurrentWorkout(JSON.parse(arrayJson[0][1]));
      }
      if (arrayJson[1][1]) {
        setExercises(JSON.parse(arrayJson[1][1]));
      }
      if (arrayJson[2][1]) {
        setWorkouts(JSON.parse(arrayJson[2][1]));
      }
      if (arrayJson[3][1]) {
        setRoutines(JSON.parse(arrayJson[3][1]));
      }
    });
  }, []);

  return (
    <WorkoutContext.Provider
      value={{
        currentWorkout,
        setCurrentWorkout,
        exercises,
        setExercises,
        workouts,
        setWorkouts,
        routines,
        setRoutines,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

export default WorkoutProvider;
