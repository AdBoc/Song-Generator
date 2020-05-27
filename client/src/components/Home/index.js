import React, { useContext, useState, useEffect } from 'react';
import { authContext } from '../../contexts/authContext';
import ApiService from '../../_services/apiService';

const Home = () => {
  const { authStatus } = useContext(authContext);
  const [song, setSong] = useState({});
  const [textField, setTextField] = useState('wchodzę do kuchni matka stoi, stary zaraz w łeb jej przypierdoli');
  const [language, setLanguage] = useState('pl');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (authStatus.token)
      ApiService.getSong(authStatus.token).then(response => { setSong(response) }).catch(error => console.log(error));
  }, [authStatus.token]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (authStatus.token) {
      setLoading(true);
      ApiService.generateNewSong(authStatus.token, textField, language).then(response => { setSong(response); setLoading(false) }).catch(error => console.log(error));
    } //co jesli reponsem jest error w promise
  }

  const handleDownload = () => {
    ApiService.downloadSong(song);
  }

  const isButtonValid = () => {
    return authStatus.isLogged && !isLoading
  }

  return (
    <div>
      {authStatus.isLogged ? null : <div style={{ color: "red" }}>You must be logged in to make api request</div>}

      <p>Welcome to GoBarbra</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <select name="language" value={language} onChange={(e) => { setLanguage(e.target.value) }}>
              <option value="pl">Polish</option>
              <option value="en">English</option>
            </select>
          </label>
        </div>
        <textarea onChange={(e) => setTextField(e.target.value)} value={textField} required></textarea>
        <input type="submit" value="submit" disabled={isButtonValid() ? false : true}></input>
      </form>

      <audio controls src={song} type="audio/mp3" />
      {isLoading && <div>Loading...</div>}
      {song ? <button onClick={handleDownload} disabled={isButtonValid() ? false : true}>Download song</button> : null}
    </div >
  )
}

export default Home;