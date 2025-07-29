// components/Landing.js
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function Landing({ onStart }) {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      <Text style={styles.title}>Minesweeper</Text>
      <Text style={styles.subtitle}>by Nico Sco</Text>
      <TouchableOpacity style={styles.button} onPress={onStart}>
        <Text style={styles.buttonText}>Empezar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3cba54",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    borderRadius: 32,
  },
  title: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#234b26",
    letterSpacing: 2,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: "#24713f",
    marginBottom: 28,
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#66dc8a",
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.09,
    shadowRadius: 5,
    elevation: 2,
  },
  buttonText: {
    color: "#234b26",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 1.2,
  },
});
