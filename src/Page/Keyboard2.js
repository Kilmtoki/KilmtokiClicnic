import React, { useState, useEffect } from 'react';
import './form.css'; // เพิ่ม import CSS ของคีย์บอร์ด

const defaultKeyboardLayout = [
    ['_', 'ๅ', '/', '-', 'ภ', 'ถ', 'ุ', 'ึ', 'ค', 'ต', 'จ', 'ข', 'ช', 'Backspace'],
    ['Tab', 'ๆ', 'ำ', 'พ', 'ะ', 'ั', 'ี', 'ร', 'น', 'ย', 'บ', 'ล', 'ฃ'],
    ['Caps', 'ฟ', 'ห', 'ก', 'ด', 'เ', '้', '่', 'า', 'ส', 'ว', 'ง', 'Enter'],
    ['Shift', 'ผ', 'ป', 'แ', 'อ', 'ิ', 'ื', 'ท', 'ม', 'ใ', 'ฝ', 'Shift'],
    ['123','.com','Spacebar']
];

const shiftedKeyboardLayout = [
    ['%', '+', '๑', '๒', '๓', '๔', 'ู', '฿', '๕', '๖', '๗', '๘', '๙', 'Backspace'],
    ['Tab', '๐', '"', 'ฑ', 'ธ', 'ํ', '๊', 'ณ', 'ฯ', 'ญ', 'ฐ', ',', 'ฅ'],
    ['Caps', 'ฤ', 'ฆ', 'ฏ', 'โ', 'ฌ', '็', '๋', 'ษ', 'ศ', 'ซ', '.', 'Enter'],
    ['Shift', '(', ')', 'ฉ', 'ฮ', 'ฺ', '์', '?', 'ฒ', 'ฬ', 'ฦ', 'Shift'],
    ['123','.com', 'Spacebar']
];

const Numberlayout = [
    ['7', '8', '9'],
    ['4', '5', '6'],
    ['1', '2', '3'],
    [',','0', '.'],
    ['กขค','Backspace']
];

const Keyboard = ({ handleKeyClick: handleKeyClickProp }) => {
    const [inputText, setInputText] = useState('');
    const [isCaps, setIsCaps] = useState(false);
    const [isShift, setIsShift] = useState(false);
    const [keyboardLayout, setKeyboardLayout] = useState(defaultKeyboardLayout);
    const [keysPressed, setKeysPressed] = useState([]);

    useEffect(() => {
        const text = keysPressed.join('');
        setInputText(text);
    }, [keysPressed]);

    const handleKeyClickInternal = (key) => {
        handleKeyClickProp(key);
    };

    const handleKeyClick = (key) => {
        switch (key) {
            case 'Enter':
                handleEnterKey();
                break;
            case ' ':
                handleSpaceKey();
                break;
            case 'Caps':
                handleCapsLock();
                break;
            case 'Backspace':
                handleDeleteKey();
                break;
            case 'Shift':
                handleShiftKey();
                break;
            case '123':
                setKeyboardLayout(Numberlayout);
                break;
            case 'กขค':
                setKeyboardLayout(defaultKeyboardLayout);
                break;
            default:
                handleRegularKey(key);
                break;
        }
    };
    
    const handleSpaceKey = () => {
        setKeysPressed((prevKeys) => [...prevKeys, ' ']);
        handleKeyClickInternal(' ');
    };

    const handleEnterKey = () => {
        setKeysPressed((prevKeys) => [...prevKeys, '\n']);
        handleKeyClickInternal('\n');
    };

    const handleCapsLock = () => {
        setIsCaps((prevState) => !prevState);
    };

    const handleDeleteKey = () => {
        setKeysPressed((prevKeys) => prevKeys.slice(0, -1));
        handleKeyClickInternal('Backspace');
    };

    const handleShiftKey = () => {
        setIsShift((prevState) => !prevState);
        setKeyboardLayout((prevLayout) => (isShift ? defaultKeyboardLayout : shiftedKeyboardLayout));
    };

    const handleRegularKey = (key) => {
        setKeysPressed((prevKeys) => [...prevKeys, isCaps ? key.toUpperCase() : key]);
        handleKeyClickInternal(key);
    };

    return (
        <div>
            <div className="keyboardcontainer">
                <div className="container">
                    {keyboardLayout.map((row, rowIndex) => (
                        <div key={rowIndex} className="row">
                            {row.map((key, keyIndex) => (
                                <div
                                    key={keyIndex}
                                    className="key"
                                    onClick={() => handleKeyClick(key)}
                                >
                                    {key}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Keyboard;
