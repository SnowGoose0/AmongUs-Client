import './App.css';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io.connect('localhost:8080');

// get user's public IP -> emit to server to check other online user's with same IP


const App = () => {

  const [nearby, setNearby] = useState();

  useEffect(() => {
    const connectUser = async () => {
      const res = await axios.get('https://api.ipify.org/?format=json');
      const IP = await res.data.ip;
      const OS = navigator.userAgentData.platform;
    
      await socket.emit('connect-ip', {
        ip: IP,
        os: OS,
      });
    }
    connectUser();
  }, [])

  socket.on('nearby-users', (nearbyUsers) => {
    setNearby(nearbyUsers);
  })

  console.log(nearby);

  return (
    <div className="App">
    </div>
  );
}

export default App;
