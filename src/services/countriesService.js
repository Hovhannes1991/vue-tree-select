import axios from "axios";

const BASE_URL = "https://countriesnow.space/api/v0.1/";

export default class CountriesService {
  getCountries() {
    return axios.get(BASE_URL + "countries");
  }

  getCities(country) {
    const payload = { country };
    return axios.post(BASE_URL + "countries/cities", payload);
  }
}
