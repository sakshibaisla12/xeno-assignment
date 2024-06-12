import React, { useState } from 'react';


function SendCampaign() {
    const [customerId, setCustomerId] = useState('');
    const [message, setMessage] = useState('');

    const sendMessage = () => {
        axios.post('http://localhost:3000/api/send-campaign', { customer_id: customerId, message })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('There was an error sending the message!', error);
            });
    };

    return (
        <div>
            <h2>Send Campaign</h2>
            <div>
                <input 
                    type="text" 
                    placeholder="Customer ID" 
                    value={customerId}
                    onChange={e => setCustomerId(e.target.value)}
                />
                <input 
                    type="text" 
                    placeholder="Message" 
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                />
                <button onClick={sendMessage}>Send Message</button>
            </div>
        </div>
    );
}

export default SendCampaign;
