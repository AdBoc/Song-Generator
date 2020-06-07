import React, { useContext, useState, useEffect } from 'react';
import { authContext } from '../../contexts/authContext';
import ApiService from '../../_services/apiService';
import './home.scss';

const Home = () => {
  const { authStatus } = useContext(authContext);
  const [song, setSong] = useState(null);
  const [textField, setTextField] = useState('Gernerate new song');
  const [language, setLanguage] = useState('pl');
  const [isLoading, setLoading] = useState(false);

  const [charactersLeft, setCharactersLeft] = useState(32);

  useEffect(() => {
    if (authStatus.token)
      ApiService.getSong(authStatus.token).then(response => { setSong(response) }).catch(error => console.log('spawn SturmTiger'));
  }, [authStatus.token]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (authStatus.token) {
      setLoading(true);
      ApiService.generateNewSong(authStatus.token, textField, language).then(response => { setSong(response); setLoading(false) }).catch(error => console.log('spawn SturmTiger'));
    } //co jesli reponsem jest error w promise
  }

  const handleDownload = () => {
    ApiService.downloadSong(song);
  }

  const isButtonValid = () => {
    return authStatus.isLogged && !isLoading
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

      <audio className="home__audioPlayer" controls src={song} type="audio/mp3" />
      {isLoading && <div>Loading...</div>}
      {song ? <button className="home__form__submit" onClick={handleDownload} disabled={isButtonValid() ? false : true}>Download song</button> : null}
    </div >
  )
}

export default Home;
//pusty request??