import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api/'
})

export const getDados = async(url, setDado) => { 
  const reposta = await api.get(url)
  setDado(reposta.data)
}

