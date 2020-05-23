import React, { useContext, useState } from 'react';
import { authContext } from '../../contexts/authContext';
import axios from 'axios';

const Home = () => {
  const { authStatus } = useContext(authContext);
  const [song, setSong] = useState(null);
  const [textField, setTextField] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    let token = localStorage.getItem('token');
    if (token) token = token.replace(/^"(.*)"$/, '$1');

    axios({
      url: 'http://localhost:2137/song',
      method: 'GET',
      headers: {
        'Authorization': "Bearer " + token
      },
      responseType: 'blob',
    }).then((response) => {
      const mp3 = new Blob([response.data], { type: 'audio/mp3' });
      const url = window.URL.createObjectURL(mp3);
      setSong(url);
    }).catch(error => {
      console.log(error);
    });

    setTextField('');
  }

  const handleDownload = () => {
    let token = localStorage.getItem('token');
    if (token) token = token.replace(/^"(.*)"$/, '$1');

    axios({
      url: 'http://localhost:2137/song',
      method: 'GET',
      headers: {
        'Authorization': "Bearer " + token
      },
      responseType: 'blob',
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'song.mp3');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }).catch(error => {
      console.log(error);
    });
  }

  return (
    <div>
      {
        authStatus.isLogged ? (
          <div>
            <p>Welcome to GoBarbra</p>
            <form onSubmit={handleSubmit}>
              <textarea onChange={(e) => setTextField(e.target.value)} value={textField} required></textarea>
              <input type="submit" value="submit"></input>
            </form>
            <audio controls src={song} type="audio/mp3" />
            <button onClick={handleDownload}>Download song</button>
          </div>
        ) : (
            <div>Go and login</div>
          )
      }
    </div>
  )
}

export default Home;