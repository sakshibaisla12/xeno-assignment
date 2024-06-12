import React from 'react';
import CreateAudience from './component/CreateAudience';
import SendCampaign from './component/SendCampaign';
import './App.css';

function App() {
    return (
        <div>
            <h1>Mini CRM Application</h1>
            <CreateAudience />
            <SendCampaign />
        </div>
    );
}

export default App;
