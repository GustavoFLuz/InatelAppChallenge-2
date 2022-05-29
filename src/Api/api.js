import axios from 'axios'


export const api = axios.create({
  baseURL: 'https://app-challenge-api.herokuapp.com'
})

export const getDados = async(url, setDado) => { 
  const reposta = await api.get(url)
  setDado(reposta.data)
}