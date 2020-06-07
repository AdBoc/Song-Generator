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
      if (error.message === 'Request failed with status code 401') {
        localStorage.clear();
        window.location.reload(true);
      }
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

  register(login, email, password) {
    return axios.post('http://localhost:2137/user/register', {
      login,
      email,
      password
    }).then(resposne => {
      console.log('user registered');
      return resposne;
    }).catch(error => {
      if (error.message === 'Request failed with status code 403')
        return 'Email or Username already exists';
      return error;
    });
  }

  updateUser(token, login, email, newPassword, confirmNewPassword) {
    return axios.put('http://localhost:2137/user/update', {
      ...(email ? { email } : {}),
      ...(login ? { login } : {}),
      ...(newPassword ? { newPassword } : {}),
      ...(confirmNewPassword ? { confirmNewPassword } : {})
    }, {
      headers: {
        'Authorization': "Bearer " + token
      }
    }).then(response => {
      console.log(response);
      return response;
    }).catch(error => {
      console.log(error);
      if (error.message === 'Request failed with status code 403')
        return 'Email or Username already exists';
      return error;
    })
  }

  login(email, password) {
    return axios.post('http://localhost:2137/user/login', {
      email,
      password
    })
      .then(response => {
        const token = response.data.token
        return token;
      })
      .catch(error => {
        console.log(error);
        return null;
      });
  }
}

const apiService = new ApiService();
export default apiService;