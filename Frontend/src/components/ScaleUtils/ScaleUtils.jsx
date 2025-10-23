// notas cromáticas em ordem
const NOTES = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];

// padrões de intervalos
const INTERVALS = {
  major: [2, 2, 1, 2, 2, 2, 1],
  minor: [2, 1, 2, 2, 1, 2, 2],
};

// modos gregos
const MODES = {
  Ionian: [2, 2, 1, 2, 2, 2, 1],   // maior
  Dorian: [2, 1, 2, 2, 2, 1, 2],
  Phrygian: [1, 2, 2, 2, 1, 2, 2],
  Lydian: [2, 2, 2, 1, 2, 2, 1],
  Mixolydian: [2, 2, 1, 2, 2, 1, 2],
  Aeolian: [2, 1, 2, 2, 1, 2, 2],  // menor natural
  Locrian: [1, 2, 2, 1, 2, 2, 2],
};

// gera escala a partir de tônica e padrão de intervalos
export function generateScale(root, pattern) {
  const startIndex = NOTES.indexOf(root);
  if (startIndex === -1) return [];
  const scale = [root + "4"]; // oitava 4
  let index = startIndex;
  pattern.forEach((step) => {
    index = (index + step) % NOTES.length;
    scale.push(NOTES[index] + "4");
  });
  return scale;
}

// escolhe aleatoriamente tônica e tipo
export function generateSimpleScale() {
  const root = NOTES[Math.floor(Math.random() * NOTES.length)];
  const type = Math.random() < 0.5 ? "major" : "minor";
  const notes = generateScale(root, INTERVALS[type]);
  return { name: `${root} ${type}`, notes };
}

// gera todos os modos de uma tônica
export function generateModes(root) {
  const modes = {};
  for (const [mode, pattern] of Object.entries(MODES)) {
    modes[mode] = generateScale(root, pattern);
  }
  return modes;
}
