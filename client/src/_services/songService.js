import axios from 'axios';

class SongService {
  getSong(token) {
    return axios.get('http://localhost:2137/song', {
      headers: {
        'Authorization': "Bearer " + token
      },
      responseType: 'blob'
    }).then((response) => {
      const mp3 = new Blob([response.data], { type: 'audio/mp3' });
      const url = window.URL.createObjectURL(mp3);
      return url
    }).catch(error => {
      console.log(error);
      return {}
    });
  }

  generateNewSong(token, textField, language) {
    return axios.post('http://localhost:2137/song/add', {
      "text": textField,
      "language": language
    }, {
      headers: {
        'Authorization': "Bearer " + token
      },
      responseType: 'blob'
    }).then(response => {
      const mp3 = new Blob([response.data], { type: 'audio/mp3' });
      const url = window.URL.createObjectURL(mp3);
      return url;
    }).catch(error => {
      console.log(error);
      return {}
    })
  }

  downloadSong(url) {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'song.mp3');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

const songService = new SongService();
export default songService;