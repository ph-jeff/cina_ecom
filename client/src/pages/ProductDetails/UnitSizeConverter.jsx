import React, { useState, useEffect } from 'react';

// Conversion functions
function usToCm(usSize) {
    return usSize * 2.54; // 1 inch = 2.54 cm
}

function euToCm(euSize) {
    return euSize * 2.54;
}

function ukToCm(ukSize) {
    return ukSize * 2.54;
}

function cmToInches(cmSize) {
    return cmSize / 2.54;
}

function UnitSizeConverter() {
    const [sourceUnit, setSourceUnit] = useState('us');
    const [targetUnit, setTargetUnit] = useState('cm');
    const [size, setSize] = useState('');
    const [convertedSize, setConvertedSize] = useState('');

    useEffect(() => {
        convertSize();
    }, [sourceUnit, targetUnit, size]);

    const handleSizeChange = (e) => {
        const { value } = e.target;
        setSize(value);
    }

    const convertSize = () => {
        let result = null;

        if (sourceUnit === 'us' && targetUnit === 'cm') {
            result = usToCm(size);
        } else if (sourceUnit === 'eu' && targetUnit === 'cm') {
            result = euToCm(size);
        } else if (sourceUnit === 'uk' && targetUnit === 'cm') {
            result = ukToCm(size);
        } else if (sourceUnit === 'cm' && targetUnit === 'inches') {
            result = cmToInches(size);
        }

        setConvertedSize(result);
    }

    return (
        <div>
            <h2>Unit Size Converter</h2>
            <div>
                <label>
                    Source Unit:
                    <select value={sourceUnit} onChange={(e) => setSourceUnit(e.target.value)}>
                        <option value="us">US</option>
                        <option value="eu">EU</option>
                        <option value="uk">UK</option>
                        <option value="cm">CM</option>
                    </select>
                </label>
            </div>
            <div>
                <label>
                    Target Unit:
                    <select value={targetUnit} onChange={(e) => setTargetUnit(e.target.value)}>
                        <option value="cm">CM</option>
                        <option value="inches">Inches</option>
                    </select>
                </label>
            </div>
            <label>
                Size:
                <input type="number" value={size} onChange={handleSizeChange} />
            </label>
            <div>
                <p>Converted Size: {convertedSize !== null ? `${convertedSize} ${targetUnit}` : 'N/A'}</p>
            </div>
        </div>
    );
}

export default UnitSizeConverter;
