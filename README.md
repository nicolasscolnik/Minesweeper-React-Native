# 🟩 MinesweeperNS

**MinesweeperNS** es una versión mobile moderna y minimalista del clásico juego Buscaminas, desarrollada en React Native + Expo.\
Inspirada en la experiencia retro de escritorio, pero adaptada a dispositivos móviles, con mejoras visuales y de usabilidad.

---

## 🚩 Características principales

- Tres niveles de dificultad: Fácil, Intermedio, Difícil
- Tablero adaptable a pantalla
- Paleta de colores en verdes y estilo minimalista
- Interacción mobile: Tap para descubrir, long press para bandera/interrogante
- Contador de tiempo y minas restantes
- Modal de selección de dificultad
- Compatible con dispositivos Android/iOS
- Haptic feedback (vibración al colocar bandera)
- Diseño 100% responsive
- Listo para publicar en Google Play

---

## 🚀 Instalación y uso local

1. **Clona el repositorio**

   ```bash
   git clone https://github.com/tuusuario/minesweeper-nico-sco.git
   cd minesweeper-nico-sco
   ```

2. **Instala dependencias**

   ```bash
   npm install
   ```

3. **Ejecuta en modo desarrollo**

   ```bash
   npx expo start
   ```

4. **Corre en tu teléfono**

   - Instala la app [Expo Go](https://expo.dev/client) en tu móvil.
   - Escanea el QR que aparece en la terminal/web.

---

## 🛠️ Stack tecnológico

- **React Native** (Expo)
- **JavaScript (ES6+)**
- **Expo Haptics** para feedback táctil
- **Visual Studio Code** (recomendado)
- **Play Store ready**: Generación de `.aab` para Android

---

## 📦 Empaquetado y publicación

- Para generar el bundle Android App Bundle (.aab) usa:
  ```bash
  npx eas build -p android --profile production
  ```
- Sigue la [guía de publicación en Google Play](https://docs.expo.dev/distribution/app-stores/).

---

## 👤 Créditos

Desarrollado por **Nico Sco**\
Logo y UI: Inspiración retro-modernizada\
Contacto: [nicolasscolnik@gmail.com](mailto\:nicolasscolnik@gmail.com)

---

## 📝 Licencia

MIT License

Copyright (c) 2025 Nico Sco

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

> *“El clásico Buscaminas, ahora en tu bolsillo, simple, moderno y para todos.”*

