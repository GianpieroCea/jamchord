const romanNumeralMap = {
    // Major chords
    'I': 0, 'II': 2, 'III': 4, 'IV': 5, 'V': 7, 'VI': 9, 'VII': 11,
    // Minor chords
    'i': 0, 'ii': 2, 'iii': 4, 'iv': 5, 'v': 7, 'vi': 9, 'vii': 11,
    // Diminished chords
    'i°': 0, 'ii°': 2, 'iii°': 4, 'iv°': 5, 'v°': 7, 'vi°': 9, 'vii°': 11,
    // Augmented chords
    'Iaug': 0, 'iiiaug': 4, 'IVaug': 5, 'Vaug': 7, 'viaug': 9,
    // Dominant seventh chords
    'I7': 0, 'ii7': 2, 'iii7': 4, 'IV7': 5, 'V7': 7, 'vi7': 9, 'vii7': 11,
    // Major seventh chords
    'Imaj7': 0, 'iimaj7': 2, 'iiimaj7': 3, 'IVmaj7': 5, 'Vmaj7': 7, 'vimaj7': 9, 'viimaj7': 10,
    // Minor seventh chords
    'imin7': 0, 'iimin7': 2, 'iiimin7': 3, 'ivmin7': 5, 'vmin7': 7, 'vimin7': 8, 'viimin7': 10,
    // Diminished seventh chords
    'i°7': 0, 'ii°7': 2, 'iii°7': 3, 'iv°7': 5, 'v°7': 6, 'vi°7': 8, 'vii°7': 10,
    // Half-diminished seventh chords
    'iø': 0, 'iiø': 2, 'iiiø': 3, 'ivø': 5, 'vø': 6, 'viø': 8, 'viiø': 10,
    // Borrowed chords
    'bII': 1, 'bIII': 3, 'bVI': 8, 'bVII': 10,
    // Extended dominants
    'V7/ii': 9, 'V7/iii': 11, 'V7/IV': 0, 'V7/V': 2, 'V7/vi': 4,
    // Other extensions
    'I9': 0, 'I13': 0, 'IV9': 5, 'IV13': 5, 'V9': 7, 'V13': 7, 'vi9': 9, 'vi13': 9
};



const transposeMap = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
// 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'
// 0  ,  1  , 2,,, 3   ,  4  , 5, , 6,   7 ,  8,     9,   10, 11
function romanToChord(roman, key) {
    const baseNoteIndex = transposeMap.indexOf(key);
    console.log(`Base note index for key ${key}: ${baseNoteIndex}`);
    if (baseNoteIndex === -1) {
        console.error(`Invalid key: ${key}`);
        return undefined;
    }

    const romanIndex = romanNumeralMap[roman];
    console.log(`Roman numeral index for ${roman}: ${romanIndex}`);
    if (romanIndex === undefined) {
        console.error(`Invalid roman numeral: ${roman}`);
        return undefined;
    }

    const baseNote = transposeMap[(baseNoteIndex + romanIndex) % 12];
    let suffix = '';

    if (roman.includes('7')) suffix = '7';
    else if (roman.includes('maj7')) suffix = 'maj7';
    else if (roman.includes('ø')) suffix = 'm7b5';
    else if (roman.includes('°')) suffix = 'dim';
    else if (roman.includes('aug')) suffix = 'aug';
    else if (roman === roman.toLowerCase() && !roman.includes('°') && !roman.includes('ø')) suffix = 'm';

    return baseNote + suffix;
}

export { romanToChord };
