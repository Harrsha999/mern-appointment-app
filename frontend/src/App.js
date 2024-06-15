// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
// frontend/src/App.js

import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        email: '',
        date: '',
        time: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/appointments', formData);
            alert(response.data);
        } catch (error) {
            console.error('There was an error booking the appointment!', error);
        }
    };

    return (
        <div>
            <h1>Book an Appointment</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div>
                    <label>Age:</label>
                    <input type="number" name="age" value={formData.age} onChange={handleChange} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label>Date:</label>
                    <input type="date" name="date" value={formData.date} onChange={handleChange} required />
                </div>
                <div>
                    <label>Time:</label>
                    <input type="time" name="time" value={formData.time} onChange={handleChange} required />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default App;
