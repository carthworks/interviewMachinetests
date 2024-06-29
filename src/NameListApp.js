import React, { useState } from 'react';

const NameListApp = () => {
    const [names, setNames] = useState([]);
    const [nameInput, setNameInput] = useState('');
    const [undoStack, setUndoStack] = useState([]);
    const [redoStack, setRedoStack] = useState([]);

    const handleAdd = () => {
        if (nameInput.trim() !== '') {
            setUndoStack([...undoStack, names]);
            setNames([...names, nameInput.trim()]);
            setNameInput('');
            setRedoStack([]);
        }
    };

    const handleUndo = () => {
        if (undoStack.length > 0) {
            setRedoStack([...redoStack, names]);
            setNames(undoStack[undoStack.length - 1]);
            setUndoStack(undoStack.slice(0, -1));
        }
    };

    const handleRedo = () => {
        if (redoStack.length > 0) {
            setUndoStack([...undoStack, names]);
            setNames(redoStack[redoStack.length - 1]);
            setRedoStack(redoStack.slice(0, -1));
        }
    };

    return (
        <div>
            <h1> List</h1>
            <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Enter a name"
            />
            <button onClick={handleAdd}>Add</button>
            <button onClick={handleUndo} disabled={undoStack.length === 0}>
                Undo
            </button>
            <button onClick={handleRedo} disabled={redoStack.length === 0}>
                Redo
            </button>
            <ul>
                {names.map((name, index) => (
                    <li key={index}>{name}</li>
                ))}
            </ul>
        </div>
    );
};

export default NameListApp;
