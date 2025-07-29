// import React from "react";
// import { TouchableOpacity, Text, StyleSheet, View, Dimensions } from "react-native";

// // Obtener el ancho disponible de la pantalla (sin SafeArea)
// const screenWidth = Dimensions.get("window").width;
// const screenHeight = Dimensions.get("window").height;

// const numberColors = {
//   1: "#1976D2",
//   2: "#388E3C",
//   3: "#D32F2F",
//   4: "#512DA8",
//   5: "#C62828",
//   6: "#008B8B",
//   7: "#333",
//   8: "#888",
// };

// export default function Cell({
//   cell,
//   onPress,
//   onLongPress,
//   boardSize
// }) {
//   // Usar el menor entre width y height (dejando lugar para status y botones)
//   const maxBoardWidth = Math.min(screenWidth, screenHeight * 0.8) - 16;
//   const cellSize = Math.floor(maxBoardWidth / boardSize);
//   const fontSize = Math.max(14, cellSize * 0.6); // Relativo al cellSize

//   let content = "";
//   let cellStyle = [styles.cell, { width: cellSize, height: cellSize }];

//   if (cell.isRevealed) {
//     cellStyle.push(styles.revealed);
//     if (cell.isMine) {
//       content = "💣";
//       cellStyle.push({ backgroundColor: cell.isExploded ? "#ff7878" : "#f2f29d" });
//     } else if (cell.neighbourMines > 0) {
//       content = cell.neighbourMines;
//       cellStyle.push({ color: numberColors[cell.neighbourMines] });
//     }
//   } else if (cell.flagState === 1) {
//     content = "🚩";
//     cellStyle.push({ color: "red" });
//   } else if (cell.flagState === 2) {
//     content = "?";
//     cellStyle.push({ color: "blue" });
//   }

//   return (
//     <TouchableOpacity
//       style={cellStyle}
//       activeOpacity={0.7}
//       onPress={onPress}
//       onLongPress={onLongPress}
//       disabled={cell.isRevealed}
//     >
//       <Text style={[
//         styles.text,
//         { fontSize },
//         cell.isRevealed && cell.neighbourMines > 0
//           ? { color: numberColors[cell.neighbourMines] }
//           : {}
//       ]}>{content}</Text>
//     </TouchableOpacity>
//   );
// }

// const styles = StyleSheet.create({
//   cell: {
//     backgroundColor: "#c0c0c0",
//     borderWidth: 1,
//     borderColor: "#888",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   revealed: {
//     backgroundColor: "#f2f29d",
//   },
//   text: {
//     fontWeight: "bold",
//     // fontSize ajustado arriba dinámicamente
//   }
// });

import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const numberColors = {
  1: "#1976D2",
  2: "#388E3C",
  3: "#D32F2F",
  4: "#512DA8",
  5: "#C62828",
  6: "#008B8B",
  7: "#333",
  8: "#888",
};

export default function Cell({ cell, onPress, onLongPress, boardSize }) {
  // Calculá el tamaño de la celda según la cantidad de columnas
  const gridMaxWidth = 320; // ancho máximo permitido al tablero (en px)
  const cellSize = Math.floor(gridMaxWidth / boardSize);

  let content = "";
  let cellStyle = [
    styles.cell,
    {
      width: cellSize,
      height: cellSize,
    },
  ];

  if (cell.isRevealed) {
    cellStyle.push(styles.revealed);
    if (cell.isMine) {
      content = "💣";
      cellStyle.push({ backgroundColor: cell.isExploded ? "#ff7878" : "#f2f29d" });
    } else if (cell.neighbourMines > 0) {
      content = cell.neighbourMines;
    }
  } else if (cell.flagState === 1) {
    content = "🚩";
  } else if (cell.flagState === 2) {
    content = "?";
  }

  // Ajustá el tamaño de fuente según el tamaño de la celda
  const fontSize = Math.floor(cellSize * 0.7);

  return (
    <TouchableOpacity
      style={cellStyle}
      activeOpacity={0.7}
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={cell.isRevealed}
    >
      <Text
        style={[
          styles.text,
          { fontSize },
          cell.isRevealed && cell.neighbourMines > 0
            ? { color: numberColors[cell.neighbourMines] }
            : {},
          cell.flagState === 1 ? { color: "red" } : {},
          cell.flagState === 2 ? { color: "blue" } : {},
        ]}
      >
        {content}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cell: {
    backgroundColor: "#c0c0c0",
    borderWidth: 1,
    borderColor: "#888",
    alignItems: "center",
    justifyContent: "center",
  },
  revealed: {
    backgroundColor: "#f2f29d",
  },
  text: {
    fontWeight: "bold",
    textAlign: "center",
    includeFontPadding: false,
    textAlignVertical: "center",
  },
});
