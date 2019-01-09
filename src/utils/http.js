import axios from 'axios';

export default axios.create({
  baseURL: 'http://127.0.0.1:8080/'
});

export function login(id2, password2) {
  
    axios.post('localhost:8080/login', {
        id: id2,
        password: password2
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

}

export function getComments(postId) {
    return axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
}