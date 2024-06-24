import React, { useState } from 'react';
import { romanToChord } from '../utilities/romanToChord';

function ProgressionScreen({ progression, onBack }) {
    const [key, setKey] = useState('C');

    const chords = progression.chords.map(chord => {
        const transposedChord = romanToChord(chord, key);
        console.log(`Transposing ${chord} in key ${key} gives ${transposedChord}`);
        return transposedChord;
    });

    return (
        <div>
            <h1>{progression.name}</h1>
            <div>
                <label>
                    Key:
                    <select value={key} onChange={e => setKey(e.target.value)}>
                        <option value="C">C</option>
                        <option value="C#">C#</option>
                        <option value="D">D</option>
                        <option value="D#">D#</option>
                        <option value="E">E</option>
                        <option value="F">F</option>
                        <option value="F#">F#</option>
                        <option value="G">G</option>
                        <option value="G#">G#</option>
                        <option value="A">A</option>
                        <option value="A#">A#</option>
                        <option value="B">B</option>
                    </select>
                </label>
            </div>
            <div>
                {chords.map((chord, index) => (
                    <span key={index}>{chord} </span>
                ))}
            </div>
            <button onClick={onBack}>Back</button>
        </div>
    );
}

export default ProgressionScreen;
