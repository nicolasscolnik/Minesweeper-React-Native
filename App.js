// import React, { useState } from "react";
// import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
// import Board from "./components/Board";
// import DifficultyModal from "./components/DifficultyModal";

// export default function App() {
//   const [difficulty, setDifficulty] = useState(null);

//   const handleDifficulty = (level) => setDifficulty(level);

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" />
//       {!difficulty && (
//         <DifficultyModal onSelect={handleDifficulty} />
//       )}
//       {difficulty && (
//         <Board difficulty={difficulty} onRestart={() => setDifficulty(null)} />
//       )}
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#e5e5e5",
//     justifyContent: "center",
//   },
// });

import React, { useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import Board from "./components/Board";
import DifficultyModal from "./components/DifficultyModal";
import Landing from "./components/Landing";

export default function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [difficulty, setDifficulty] = useState(null);

  if (showLanding) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Landing onStart={() => setShowLanding(false)} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {!difficulty && <DifficultyModal onSelect={setDifficulty} />}
      {difficulty && <Board difficulty={difficulty} onRestart={() => setDifficulty(null)} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e5f8ec", // Un verde muy claro de fondo
    justifyContent: "center",
  },
});
