import React, { useContext, useState, useEffect, useRef } from 'react';
import { authContext } from '../../contexts/authContext';
import ApiService from '../../_services/apiService';
import './home.scss';

const Home = () => {
  let _isMounted = useRef(true);
  const { authStatus } = useContext(authContext);
  const [song, setSong] = useState(null);
  const [textField, setTextField] = useState('Gernerate new song');
  const [language, setLanguage] = useState('pl');
  const [isLoading, setLoading] = useState(false);

  const [charactersLeft, setCharactersLeft] = useState(32);

  useEffect(() => {
    async function getSong() {
      if (authStatus.token) {
        const response = await ApiService.getSong(authStatus.token);
        setSong(response)
      }
    }
    getSong();
  }, [authStatus.token]);

  useEffect(() => {
    return () => {
      _isMounted.current = false;
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (authStatus.token) {
      setLoading(true);
      const newSong = await ApiService.generateNewSong(authStatus.token, textField, language, _isMounted.current);
      if (_isMounted.current) {
        setSong(newSong);
        setLoading(false);
      }
    }
  }

  const handleDownload = () => {
    ApiService.downloadSong(song);
  }

  const isButtonValid = () => {
    return authStatus.isLogged && !isLoading;
  }

  const maxTextField = (e) => {
    setTextField(e.target.value);
    setCharactersLeft(50 - e.target.value.length);
  }

  return (
    <div className="home">
      {authStatus.isLogged ? null : <div className="home__isLoggedError">You must be logged in to make api request</div>}

      <p className="home__title">GoBarbra</p>
      <p className="home__subtitle">create song with custom lyrics</p>

      <form className="home__form" onSubmit={handleSubmit}>
        <div>
          <label> Pick language of your song:
            <select className="home__form__select" name="language" value={language} onChange={(e) => { setLanguage(e.target.value) }}>
              <option value="pl">Polish</option>
              <option value="en">English</option>
              <option value="ja">Japanesee</option>
            </select>
          </label>
        </div>
        <textarea className="home__form__textarea" onChange={maxTextField} value={textField} maxLength="50" required></textarea>
        <p className={charactersLeft < 10 ? "home__form__characterLimit--limit" : "home__form__characterLimit"}>Character limit: {charactersLeft}</p>
        <input className="home__form__submit" type="submit" value="Submit" disabled={isButtonValid() ? false : true}></input>
      </form>

      {song ? <audio className="home__audioPlayer" controls src={song} type="audio/mp3" /> : null}
      {isLoading && <div className="home__form--loading">Loading...</div>}
      {song ? <button className="home__form__downloadButton" onClick={handleDownload} disabled={isButtonValid() ? false : true}>Download song</button> : null}
    </div >
  )
}

export default Home;
//pusty request??