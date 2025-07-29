import React from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";

const LEVELS = {
  "Fácil": { size: 9, mines: 10 },
  "Intermedio": { size: 12, mines: 30 },
  "Difícil": { size: 14, mines: 45 }
};

export default function DifficultyModal({ onSelect }) {
  return (
    <Modal visible transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Elige un nivel de dificultad:</Text>
          {Object.entries(LEVELS).map(([name, { size, mines }]) => (
            <TouchableOpacity
              key={name}
              style={styles.button}
              onPress={() => onSelect({ ...LEVELS[name], name })}
            >
              <Text style={styles.buttonText}>
                {name} ({size}x{size}, {mines} minas)
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "center", alignItems: "center"
  },
  modal: {
    backgroundColor: "#fff", borderRadius: 14, padding: 24, minWidth: 280, elevation: 6
  },
  title: {
    fontSize: 18, fontWeight: "bold", marginBottom: 16, textAlign: "center"
  },
  button: {
    backgroundColor: "#f0d34e", borderRadius: 8, marginVertical: 8, padding: 14
  },
  buttonText: {
    fontWeight: "bold", color: "#333", fontSize: 16, textAlign: "center"
  }
});
