<template>
  <div class="vue-tree-select container">
    <div class="d-flex mb-4">
      <input v-model="limit" class="form-control" />
      <button @click="getData" class="btn btn-success">Click</button>
    </div>

    <treeselect
      v-model="value"
      :alwaysOpen="true"
      :multiple="true"
      :options="options"
      :load-options="loadOptions"
      :normalizer="normalizer"
    />
  </div>
</template>

<script>
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
// import { LOAD_ROOT_OPTIONS } from "@riophae/vue-treeselect";

export default {
  name: "VueTreeSelect",
  components: { Treeselect },

  data() {
    return {
      limit: 5,
      value: null,
      options: null,
      normalizer(node) {
        return {
          id: node.id,
          label: node.title,
        };
      },
      ttt: null,
    };
  },

  // created() {
  //   console.clear();
  // },

  methods: {
    getData() {
      this.options = null;
      this.loadOptions({ callback: this.ttt });
    },

    delay(calback, time = 1000) {
      setTimeout(() => {
        calback();
      }, time);
    },

    //{ action, parentNode, callback }
    loadOptions({ callback }) {
      this.delay(() => {
        fetch("https://jsonplaceholder.typicode.com/todos?_limit=" + this.limit)
          .then((response) => response.json())
          .then((json) => json)
          .then((data) => {
            this.options = data;
            callback();
            this.ttt = callback;
            return;
          });
      });
    },
  },
};
</script>

<style scoped></style>
