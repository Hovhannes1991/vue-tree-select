<template>
  <div class="countries-states-page container">
    <div class="countries-section">
      <label for="countries-treeselect">Countries</label>
      <treeselect
        id="countries-treeselect"
        v-model="selected_country"
        :options="countries"
        :load-options="loadCountries"
        :normalizer="normalizer"
        :disable-fuzzy-matching="true"
        @select="cities = null"
      />
    </div>

    <div class="cityes-section">
      <label for="cities-treeselect">Cities</label>
      <treeselect
        id="cities-treeselect"
        v-model="selected_city"
        :options="cities"
        :load-options="loadCities"
        :auto-load-root-options="false"
        :disabled="!selected_country"
        :normalizer="normalizerForCity"
        :disable-fuzzy-matching="true"
      />
    </div>
  </div>
</template>

<script>
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
// import { LOAD_ROOT_OPTIONS } from "@riophae/vue-treeselect";
import CountriesService from "@/services/countriesService";

export default {
  name: "CountriesCities",
  components: { Treeselect },

  data() {
    return {
      CountriesService: new CountriesService(),
      selected_country: null,
      selected_city: null,
      countries: null,
      cities: null,
      normalizer(node) {
        return {
          id: node.country + "-unique-" + node.cities[0],
          label: node.country,
        };
      },

      normalizerForCity(node) {
        return {
          id: node,
          label: node,
        };
      },
    };
  },

  computed: {
    selectedCountryName() {
      if (!this.selected_country) return "";
      return this.selected_country.split("-unique-")[0];
    },
  },

  created() {
    console.clear();
  },

  methods: {
    delay(calback, time = 1000) {
      setTimeout(() => {
        calback();
      }, time);
    },

    //{ action, parentNode, callback }
    loadCountries({ callback }) {
      this.delay(() => {
        this.CountriesService.getCountries().then((data) => {
          this.countries = data.data.data;
          callback();
        });
      });
    },

    loadCities({ callback }) {
      this.delay(() => {
        this.CountriesService.getCities(this.selectedCountryName).then(
          (data) => {
            this.cities = data.data.data;
            callback();
          }
        );
      });
    },
  },
};
</script>

<style>
.countries-states-page {
  display: flex;
  flex-direction: column;
  gap: 150px;
}
</style>
