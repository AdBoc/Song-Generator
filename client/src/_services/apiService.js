import axios from 'axios';

class ApiService {
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
      return '' //do zmiany raczej
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

  register(username, email, password) {
    axios.post('http://localhost:2137/user/register', {
      username,
      email,
      password
    }).then(resposne => {
      console.log('user registered');
    }).catch(error => {
      console.log(error);
    });
  }

  updateUser(token, username, email, newPassword, confirmNewPassword) {
    axios.put('http://localhost:2137/user/update', {
      ...(email ? { email: email } : {}),
      ...(username ? { username: username } : {}),
      ...(newPassword ? { newPassword: newPassword } : {}),
      ...(confirmNewPassword ? { confirmNewPassword: confirmNewPassword } : {})
    }, {
      headers: {
        'Authorization': "Bearer " + token
      }
    }).then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    })
  }
}

const apiService = new ApiService();
export default apiService;