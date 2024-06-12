import React, { useState } from 'react';


function CreateAudience() {
    const [rules, setRules] = useState([]);
    const [currentRule, setCurrentRule] = useState({ field: '', operator: '', value: '' });
    const [audienceSize, setAudienceSize] = useState(null);

    const addRule = () => {
        setRules([...rules, currentRule]);
        setCurrentRule({ field: '', operator: '', value: '' });
    };

    const checkAudienceSize = () => {
        axios.post('http://localhost:3000/api/audience', { rules })
            .then(response => {
                setAudienceSize(response.data.length);
            })
            .catch(error => {
                console.error('There was an error checking the audience size!', error);
            });
    };

    return (
        <div>
            <h2>Create Audience</h2>
            <div>
                <input 
                    type="text" 
                    placeholder="Field" 
                    value={currentRule.field}
                    onChange={e => setCurrentRule({ ...currentRule, field: e.target.value })}
                />
                <input 
                    type="text" 
                    placeholder="Operator" 
                    value={currentRule.operator}
                    onChange={e => setCurrentRule({ ...currentRule, operator: e.target.value })}
                />
                <input 
                    type="text" 
                    placeholder="Value" 
                    value={currentRule.value}
                    onChange={e => setCurrentRule({ ...currentRule, value: e.target.value })}
                />
                <button onClick={addRule}>Add Rule</button>
            </div>
            <button onClick={checkAudienceSize}>Check Audience Size</button>
            {audienceSize !== null && <div>Audience Size: {audienceSize}</div>}
        </div>
    );
}

export default CreateAudience;
