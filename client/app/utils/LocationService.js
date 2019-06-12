import axios from 'axios';
import { keys } from '../config/privatekeys';

const API_PREFIX = "https://eu1.locationiq.com/v1/"

export const forwardGeocoding = (address) => {
  // TODO: use LocationIQ to get coorsinates from adress
  return new Promise((resolve, reject) => {
    axios.get(`${API_PREFIX}/search.php?key=${keys.LOCATIONIQ_ACCESS_TOKEN}&q=${address}&namedetails=1&format=json`)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}

export const reverseGeocoding = (coordinates) => {
  // TODO: use LocationIq to get Adress from coordinates
  return new Promise((resolve, reject) => {
    axios.get(`${API_PREFIX}/reverse.php?key=${keys.LOCATIONIQ_ACCESS_TOKEN}&lat=${coordinates.lattitude}&lon=${coordinates.longitude}&format=json`)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}
