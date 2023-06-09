import { useState } from "react";
import { FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { COLORS } from "../../../constants/theme";

interface IStory {
  image: string;
  name: string;
  seen?: boolean;
}

type IStories = IStory[];

interface IContact {
  image: string;
  name: string;
  date: string;
  last: string;
  seen?: boolean;
}

type IContacts = IContact[];

function Connect() {
  const [stories, setStories] = useState<IStories>([
    {
      image: "https://picsum.photos/200/300",
      name: "Arnav Patel",
    },
    {
      image: "https://picsum.photos/200/300",
      name: "Arnav Patel",
      seen: true,
    },
    {
      image: "https://picsum.photos/200/300",
      name: "Arnav Patel",
    },
    {
      image: "https://picsum.photos/200/300",
      name: "Arnav Patel",
    },
    {
      image: "https://picsum.photos/200/300",
      name: "Arnav Patel",
    },
  ]);

  const [contacts, setContacts] = useState<IContacts>([
    {
      image: "https://picsum.photos/400",
      name: "Arnav Patel",
      date: "4:32 PM",
      last: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta amet quasi vero dolorum obcaecati nostrum? Ipsa natus tempore hic debitis dolorem cum ut saepe ullam, nostrum, quia sapiente consequuntur eligendi?",
    },
    {
      image: "https://picsum.photos/200",
      name: "Arnav Patel",
      date: "8:56 AM",
      last: "Lorem ipsum dolor sit",
      seen: true,
    },
    {
      image: "https://picsum.photos/200",
      name: "Arnav Patel",
      date: "Yesterday",
      last: "Lorem ipsum dolor sit",
      seen: true,
    },
    {
      image: "https://picsum.photos/200",
      name: "Arnav Patel",
      date: "Apr 3rd",
      last: "Lorem ipsum dolor sit",
      seen: true,
    },
  ]);

  return (
    <SafeAreaView edges={["top", "right", "left"]} style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.inputContainer}>
          <Icon name="magnify" size={32} color={COLORS.darkGray} />
          <TextInput
            placeholder="Search user"
            placeholderTextColor={COLORS.gray}
            keyboardAppearance="dark"
            style={styles.search}
          />
        </View>
      </View>
      <View>
        <ScrollView style={styles.storiesContainer} horizontal>
          <TouchableOpacity style={styles.story}>
            <View>
              <Icon name="plus" size={48} color={COLORS.darkGray} />
            </View>
            <Text style={styles.storyText}>Add story</Text>
          </TouchableOpacity>
          {stories.map((story: IStory, i: number) => (
            <TouchableOpacity style={styles.story} key={i}>
              <Image source={{ uri: story.image }} style={styles.storyImage} />
              <Text style={styles.storyText}>{story.name}</Text>
              {story.seen && <Icon name="replay" size={48} color="#eee" style={{ position: "absolute" }} />}
            </TouchableOpacity>
          ))}
        </ScrollView>
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.date}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.contact}>
              {item.seen ? (
                <Icon name="circle" size={16} color={COLORS.primary} />
              ) : (
                <Icon name="circle" size={16} color="transparent" />
              )}
              <Image source={{ uri: item.image }} style={styles.contactImage} />
              <View style={styles.contactText}>
                <View style={styles.contactInfo}>
                  <Text style={styles.contactName}>{item.name}</Text>
                  <Text style={styles.contactDate}>{item.date}</Text>
                </View>
                <Text numberOfLines={2} style={styles.contactLast}>
                  {item.last}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          style={styles.contactsContainer}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.blackTwo,
  },
  headerContainer: {
    alignItems: "center",
    padding: 16,
    backgroundColor: COLORS.blackTwo,
  },
  inputContainer: {
    flexDirection: "row",
    width: "80%",
    padding: 8,
    backgroundColor: COLORS.black,
    borderRadius: 18,
  },
  search: {
    fontSize: 16,
    color: COLORS.white,
  },
  storiesContainer: {
    flexDirection: "row",
    paddingTop: 16,
    paddingBottom: 32,
    backgroundColor: COLORS.black,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.darkGray,
  },
  story: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
    height: 88,
    width: 88,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  storyImage: {
    height: 80,
    width: 80,
    borderRadius: 50,
  },
  storyText: {
    position: "absolute",
    top: 92,
    fontSize: 14,
    textAlign: "center",
    color: COLORS.white,
  },
  contactsContainer: {
    backgroundColor: COLORS.black,
  },
  contact: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.darkGray,
  },
  contactImage: {
    margin: 8,
    height: 64,
    width: 64,
    borderRadius: 50,
  },
  contactText: {
    padding: 8,
    flex: 1,
  },
  contactInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  contactName: {
    color: COLORS.white,
    fontSize: 16,
  },
  contactDate: {
    color: COLORS.gray,
    fontSize: 14,
  },
  contactLast: {
    color: COLORS.gray,
    fontSize: 14,
  },
});

export default Connect;
