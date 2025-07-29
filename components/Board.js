// import React, { useState, useEffect, useRef } from "react";
// import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
// import Cell from "./Cell";

// // Helpers
// function countAdj(board, size, row, col) {
//   let count = 0;
//   for (let dr = -1; dr <= 1; dr++) {
//     for (let dc = -1; dc <= 1; dc++) {
//       if (dr === 0 && dc === 0) continue;
//       let rr = row + dr, cc = col + dc;
//       if (
//         rr >= 0 && rr < size &&
//         cc >= 0 && cc < size &&
//         board[rr][cc].isMine
//       ) {
//         count++;
//       }
//     }
//   }
//   return count;
// }

// function createBoard(size, mines) {
//   // Inicializar celdas
//   let board = [];
//   for (let r = 0; r < size; r++) {
//     let row = [];
//     for (let c = 0; c < size; c++) {
//       row.push({
//         row: r,
//         col: c,
//         isMine: false,
//         isRevealed: false,
//         flagState: 0, // 0: nada, 1: bandera, 2: interrogante
//         neighbourMines: 0,
//         isExploded: false,
//       });
//     }
//     board.push(row);
//   }

//   // Plantar minas
//   let positions = [];
//   for (let i = 0; i < size * size; i++) positions.push(i);
//   let minesPos = [];
//   for (let i = 0; i < mines; i++) {
//     let idx = Math.floor(Math.random() * positions.length);
//     minesPos.push(positions[idx]);
//     positions.splice(idx, 1);
//   }
//   for (let pos of minesPos) {
//     let r = Math.floor(pos / size);
//     let c = pos % size;
//     board[r][c].isMine = true;
//   }
//   // Calcular minas vecinas
//   for (let r = 0; r < size; r++) {
//     for (let c = 0; c < size; c++) {
//       if (!board[r][c].isMine) {
//         board[r][c].neighbourMines = countAdj(board, size, r, c);
//       }
//     }
//   }
//   return board;
// }

// function revealCell(board, row, col, size) {
//   const cell = board[row][col];
//   if (cell.isRevealed || cell.flagState === 1) return;
//   cell.isRevealed = true;
//   cell.flagState = 0;
//   if (cell.neighbourMines === 0 && !cell.isMine) {
//     for (let dr = -1; dr <= 1; dr++)
//       for (let dc = -1; dc <= 1; dc++) {
//         let rr = row + dr, cc = col + dc;
//         if (
//           rr >= 0 && rr < size &&
//           cc >= 0 && cc < size &&
//           !(dr === 0 && dc === 0)
//         ) {
//           revealCell(board, rr, cc, size);
//         }
//       }
//   }
// }

// function showAllMines(board, size, won = false) {
//   for (let r = 0; r < size; r++)
//     for (let c = 0; c < size; c++) {
//       if (board[r][c].isMine) board[r][c].isRevealed = true;
//       if (!board[r][c].isMine && board[r][c].flagState === 1)
//         board[r][c].flagState = 2; // ❌ o ?
//       if (!board[r][c].isMine && board[r][c].flagState === 2)
//         board[r][c].flagState = 0;
//     }
//   return board;
// }

// export default function Board({ difficulty, onRestart }) {
//   const [board, setBoard] = useState([]);
//   const [firstClick, setFirstClick] = useState(true);
//   const [flags, setFlags] = useState(0);
//   const [time, setTime] = useState(0);
//   const [timerOn, setTimerOn] = useState(false);
//   const timerRef = useRef(null);
//   const [gameOver, setGameOver] = useState(false);
//   const [win, setWin] = useState(false);
//   const [showHint, setShowHint] = useState(true);

//   const size = difficulty.size;
//   const mines = difficulty.mines;

//   // Inicialización tablero
//   useEffect(() => {
//     setBoard(createBoard(size, mines));
//     setFirstClick(true);
//     setFlags(0);
//     setTime(0);
//     setTimerOn(false);
//     setGameOver(false);
//     setWin(false);
//   }, [difficulty]);

//   // Temporizador
//   useEffect(() => {
//     if (timerOn) {
//       timerRef.current = setTimeout(() => setTime(t => t + 1), 1000);
//       return () => clearTimeout(timerRef.current);
//     }
//   }, [timerOn, time]);

//   function handleCellPress(row, col) {
//     if (gameOver || win) return;
//     let newBoard = board.map(r => r.map(c => ({ ...c })));

//     if (firstClick) {
//       setFirstClick(false);
//       setTimerOn(true);
//       if (newBoard[row][col].isMine) {
//         // Relocalizar mina
//         newBoard[row][col].isMine = false;
//         let freeCells = [];
//         for (let r = 0; r < size; r++)
//           for (let c = 0; c < size; c++)
//             if (!newBoard[r][c].isMine && !(r === row && c === col)) freeCells.push([r, c]);
//         let [nr, nc] = freeCells[Math.floor(Math.random() * freeCells.length)];
//         newBoard[nr][nc].isMine = true;
//         // Recalcular minas vecinas
//         for (let r = 0; r < size; r++)
//           for (let c = 0; c < size; c++)
//             newBoard[r][c].neighbourMines = countAdj(newBoard, size, r, c);
//       }
//     }

//     if (newBoard[row][col].flagState === 1) return;
//     if (newBoard[row][col].isRevealed) {
//       // Chording
//       if (newBoard[row][col].neighbourMines > 0) {
//         let flagsAround = 0;
//         for (let dr = -1; dr <= 1; dr++)
//           for (let dc = -1; dc <= 1; dc++) {
//             let rr = row + dr, cc = col + dc;
//             if (
//               rr >= 0 && rr < size &&
//               cc >= 0 && cc < size &&
//               newBoard[rr][cc].flagState === 1
//             ) flagsAround++;
//           }
//         if (flagsAround === newBoard[row][col].neighbourMines) {
//           for (let dr = -1; dr <= 1; dr++)
//             for (let dc = -1; dc <= 1; dc++) {
//               let rr = row + dr, cc = col + dc;
//               if (
//                 rr >= 0 && rr < size &&
//                 cc >= 0 && cc < size &&
//                 !newBoard[rr][cc].isRevealed &&
//                 newBoard[rr][cc].flagState !== 1
//               ) {
//                 handleCellPress(rr, cc);
//               }
//             }
//         }
//         return;
//       }
//       return;
//     }

//     if (newBoard[row][col].isMine) {
//       newBoard[row][col].isRevealed = true;
//       newBoard[row][col].isExploded = true;
//       setBoard(showAllMines(newBoard, size));
//       setGameOver(true);
//       setTimerOn(false);
//       Alert.alert("¡Boom!", "Has pisado una mina. Fin del juego.", [{ text: "OK" }]);
//       return;
//     }

//     revealCell(newBoard, row, col, size);
//     setBoard(newBoard);

//     // Win check
//     let cellsToReveal = 0;
//     for (let r = 0; r < size; r++)
//       for (let c = 0; c < size; c++)
//         if (!newBoard[r][c].isMine && !newBoard[r][c].isRevealed) cellsToReveal++;
//     if (cellsToReveal === 0) {
//       setWin(true);
//       setTimerOn(false);
//       setBoard(showAllMines(newBoard, size, true));
//       Alert.alert("¡Victoria!", "¡Felicidades! Has ganado la partida.", [{ text: "OK" }]);
//     }
//   }

//   function handleCellLongPress(row, col) {
//     if (gameOver || win || board[row][col].isRevealed) return;
//     let newBoard = board.map(r => r.map(c => ({ ...c })));
//     let cell = newBoard[row][col];
//     if (cell.flagState === 0) {
//       if (flags < mines) {
//         cell.flagState = 1;
//         setFlags(flags + 1);
//       } else {
//         cell.flagState = 2; // Directo a ?
//       }
//     } else if (cell.flagState === 1) {
//       cell.flagState = 2;
//       setFlags(flags - 1);
//     } else if (cell.flagState === 2) {
//       cell.flagState = 0;
//     }
//     setBoard(newBoard);
//   }

//   function handleRestart() {
//     setBoard(createBoard(size, mines));
//     setFirstClick(true);
//     setFlags(0);
//     setTime(0);
//     setTimerOn(false);
//     setGameOver(false);
//     setWin(false);
//   }

//   return (
//     <View style={styles.wrapper}>
//       <View style={styles.statusBar}>
//         <Text style={styles.counter}>{String(mines - flags).padStart(3, "0")}</Text>
//         <TouchableOpacity onPress={handleRestart} style={styles.restartBtn}>
//           <Text style={styles.restartText}>{gameOver ? "😵" : win ? "😎" : "🙂"}</Text>
//         </TouchableOpacity>
//         <Text style={styles.counter}>{String(time).padStart(3, "0")}</Text>
//       </View>
//       <View style={styles.board}>
//         {board.map((row, rIdx) => (
//           <View key={rIdx} style={{ flexDirection: "row" }}>
//             {row.map((cell, cIdx) => (
//               <Cell
//                 key={cIdx}
//                 cell={cell}
//                 boardSize={size}
//                 onPress={() => handleCellPress(rIdx, cIdx)}
//                 onLongPress={() => handleCellLongPress(rIdx, cIdx)}
//               />
//             ))}
//           </View>
//         ))}
//       </View>
//       <TouchableOpacity onPress={onRestart} style={styles.menuBtn}>
//         <Text style={{ color: "#444", fontWeight: "bold", fontSize: 16 }}>
//           Cambiar Dificultad
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   wrapper: { flex: 1, alignItems: "center", justifyContent: "center" },
//   statusBar: {
//     flexDirection: "row", alignItems: "center",
//     justifyContent: "center", padding: 10, width: "100%"
//   },
//   counter: { fontSize: 32, fontWeight: "bold", width: 64, textAlign: "center" },
//   restartBtn: {
//     marginHorizontal: 24, backgroundColor: "#faf8d4", padding: 8, borderRadius: 10
//   },
//   restartText: { fontSize: 32 },
//   board: { marginVertical: 12, borderWidth: 2, borderColor: "#aaa", backgroundColor: "#b5b5b5" },
//   menuBtn: {
//     marginTop: 10, padding: 12, backgroundColor: "#ffe87c", borderRadius: 10
//   }
// });


import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity, ToastAndroid, Platform } from "react-native";
import Cell from "./Cell";

function countAdj(board, size, row, col) {
  let count = 0;
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      let rr = row + dr, cc = col + dc;
      if (
        rr >= 0 && rr < size &&
        cc >= 0 && cc < size &&
        board[rr][cc].isMine
      ) {
        count++;
      }
    }
  }
  return count;
}

function createBoard(size, mines) {
  let board = [];
  for (let r = 0; r < size; r++) {
    let row = [];
    for (let c = 0; c < size; c++) {
      row.push({
        row: r,
        col: c,
        isMine: false,
        isRevealed: false,
        flagState: 0,
        neighbourMines: 0,
        isExploded: false,
      });
    }
    board.push(row);
  }
  let positions = [];
  for (let i = 0; i < size * size; i++) positions.push(i);
  let minesPos = [];
  for (let i = 0; i < mines; i++) {
    let idx = Math.floor(Math.random() * positions.length);
    minesPos.push(positions[idx]);
    positions.splice(idx, 1);
  }
  for (let pos of minesPos) {
    let r = Math.floor(pos / size);
    let c = pos % size;
    board[r][c].isMine = true;
  }
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (!board[r][c].isMine) {
        board[r][c].neighbourMines = countAdj(board, size, r, c);
      }
    }
  }
  return board;
}

function revealCell(board, row, col, size) {
  const cell = board[row][col];
  if (cell.isRevealed || cell.flagState === 1) return;
  cell.isRevealed = true;
  cell.flagState = 0;
  if (cell.neighbourMines === 0 && !cell.isMine) {
    for (let dr = -1; dr <= 1; dr++)
      for (let dc = -1; dc <= 1; dc++) {
        let rr = row + dr, cc = col + dc;
        if (
          rr >= 0 && rr < size &&
          cc >= 0 && cc < size &&
          !(dr === 0 && dc === 0)
        ) {
          revealCell(board, rr, cc, size);
        }
      }
  }
}

function showAllMines(board, size, won = false) {
  for (let r = 0; r < size; r++)
    for (let c = 0; c < size; c++) {
      if (board[r][c].isMine) board[r][c].isRevealed = true;
      if (!board[r][c].isMine && board[r][c].flagState === 1)
        board[r][c].flagState = 2;
      if (!board[r][c].isMine && board[r][c].flagState === 2)
        board[r][c].flagState = 0;
    }
  return board;
}

export default function Board({ difficulty, onRestart }) {
  const [board, setBoard] = useState([]);
  const [firstClick, setFirstClick] = useState(true);
  const [flags, setFlags] = useState(0);
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const timerRef = useRef(null);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [showHint, setShowHint] = useState(true); // ← Nuevo estado

  const size = difficulty.size;
  const mines = difficulty.mines;

  useEffect(() => {
    setBoard(createBoard(size, mines));
    setFirstClick(true);
    setFlags(0);
    setTime(0);
    setTimerOn(false);
    setGameOver(false);
    setWin(false);
    setShowHint(true); // ← Mostrar hint en cada nuevo juego
  }, [difficulty]);

  useEffect(() => {
    if (timerOn) {
      timerRef.current = setTimeout(() => setTime(t => t + 1), 1000);
      return () => clearTimeout(timerRef.current);
    }
  }, [timerOn, time]);

  function handleCellPress(row, col) {
    if (gameOver || win) return;
    let newBoard = board.map(r => r.map(c => ({ ...c })));

    if (firstClick) {
      setFirstClick(false);
      setTimerOn(true);
      if (newBoard[row][col].isMine) {
        newBoard[row][col].isMine = false;
        let freeCells = [];
        for (let r = 0; r < size; r++)
          for (let c = 0; c < size; c++)
            if (!newBoard[r][c].isMine && !(r === row && c === col)) freeCells.push([r, c]);
        let [nr, nc] = freeCells[Math.floor(Math.random() * freeCells.length)];
        newBoard[nr][nc].isMine = true;
        for (let r = 0; r < size; r++)
          for (let c = 0; c < size; c++)
            newBoard[r][c].neighbourMines = countAdj(newBoard, size, r, c);
      }
    }

    if (newBoard[row][col].flagState === 1) return;
    if (newBoard[row][col].isRevealed) {
      if (newBoard[row][col].neighbourMines > 0) {
        let flagsAround = 0;
        for (let dr = -1; dr <= 1; dr++)
          for (let dc = -1; dc <= 1; dc++) {
            let rr = row + dr, cc = col + dc;
            if (
              rr >= 0 && rr < size &&
              cc >= 0 && cc < size &&
              newBoard[rr][cc].flagState === 1
            ) flagsAround++;
          }
        if (flagsAround === newBoard[row][col].neighbourMines) {
          for (let dr = -1; dr <= 1; dr++)
            for (let dc = -1; dc <= 1; dc++) {
              let rr = row + dr, cc = col + dc;
              if (
                rr >= 0 && rr < size &&
                cc >= 0 && cc < size &&
                !newBoard[rr][cc].isRevealed &&
                newBoard[rr][cc].flagState !== 1
              ) {
                handleCellPress(rr, cc);
              }
            }
        }
        return;
      }
      return;
    }

    if (newBoard[row][col].isMine) {
      newBoard[row][col].isRevealed = true;
      newBoard[row][col].isExploded = true;
      setBoard(showAllMines(newBoard, size));
      setGameOver(true);
      setTimerOn(false);
      Alert.alert("¡Boom!", "Has pisado una mina. Fin del juego.", [{ text: "OK" }]);
      return;
    }

    revealCell(newBoard, row, col, size);
    setBoard(newBoard);

    let cellsToReveal = 0;
    for (let r = 0; r < size; r++)
      for (let c = 0; c < size; c++)
        if (!newBoard[r][c].isMine && !newBoard[r][c].isRevealed) cellsToReveal++;
    if (cellsToReveal === 0) {
      setWin(true);
      setTimerOn(false);
      setBoard(showAllMines(newBoard, size, true));
      Alert.alert("¡Victoria!", "¡Felicidades! Has ganado la partida.", [{ text: "OK" }]);
    }
  }

  function handleCellLongPress(row, col) {
    // MOSTRAR TOOLTIP LA PRIMERA VEZ
    if (showHint) {
      setShowHint(false);
      if (Platform.OS === 'android') {
        ToastAndroid.show('¡Mantené pulsado para poner/sacar bandera!', ToastAndroid.SHORT);
      } else {
        Alert.alert('Tip', 'Mantené pulsado para poner/sacar bandera');
      }
    }
    if (gameOver || win || board[row][col].isRevealed) return;
    let newBoard = board.map(r => r.map(c => ({ ...c })));
    let cell = newBoard[row][col];
    if (cell.flagState === 0) {
      if (flags < mines) {
        cell.flagState = 1;
        setFlags(flags + 1);
      } else {
        cell.flagState = 2;
      }
    } else if (cell.flagState === 1) {
      cell.flagState = 2;
      setFlags(flags - 1);
    } else if (cell.flagState === 2) {
      cell.flagState = 0;
    }
    setBoard(newBoard);
  }

  function handleRestart() {
    setBoard(createBoard(size, mines));
    setFirstClick(true);
    setFlags(0);
    setTime(0);
    setTimerOn(false);
    setGameOver(false);
    setWin(false);
    setShowHint(true); // ← Mostrar hint en cada nuevo juego
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.statusBar}>
        <Text style={styles.counter}>{String(mines - flags).padStart(3, "0")}</Text>
        <TouchableOpacity onPress={handleRestart} style={styles.restartBtn}>
          <Text style={styles.restartText}>{gameOver ? "😵" : win ? "😎" : "🙂"}</Text>
        </TouchableOpacity>
        <Text style={styles.counter}>{String(time).padStart(3, "0")}</Text>
      </View>
      <View style={styles.board}>
        {board.map((row, rIdx) => (
          <View key={rIdx} style={{ flexDirection: "row" }}>
            {row.map((cell, cIdx) => (
              <Cell
                key={cIdx}
                cell={cell}
                boardSize={size}
                onPress={() => handleCellPress(rIdx, cIdx)}
                onLongPress={() => handleCellLongPress(rIdx, cIdx)}
              />
            ))}
          </View>
        ))}
      </View>
      <TouchableOpacity onPress={onRestart} style={styles.menuBtn}>
        <Text style={{ color: "#444", fontWeight: "bold", fontSize: 16 }}>
          Cambiar Dificultad
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, alignItems: "center", justifyContent: "center" },
  statusBar: {
    flexDirection: "row", alignItems: "center",
    justifyContent: "center", padding: 10, width: "100%"
  },
  counter: { fontSize: 32, fontWeight: "bold", width: 64, textAlign: "center" },
  restartBtn: {
    marginHorizontal: 24, backgroundColor: "#faf8d4", padding: 8, borderRadius: 10
  },
  restartText: { fontSize: 32 },
  board: { marginVertical: 12, borderWidth: 2, borderColor: "#aaa", backgroundColor: "#b5b5b5" },
  menuBtn: {
    marginTop: 10, padding: 12, backgroundColor: "#ffe87c", borderRadius: 10
  }
});
