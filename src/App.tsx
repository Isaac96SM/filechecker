import React from 'react';
import './App.css';

import Grid from './components/Grid';

const App: React.FC = () => {
    return (
        <div className="App">
            <Grid
                rowData={
                    [
                        {
                            make: "Toyota", model: "Celica", price: 35000
                        },
                        {
                            make: "Ford", model: "Mondeo", price: 32000
                        },
                        {
                            make: "Porsche", model: "Boxter", price: 72000
                        }
                    ]
                }
            />
        </div>
    );
}

export default App;
