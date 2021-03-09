<template>
  <div class="search">
    <button class="submit-button" @click="submit">Submit</button>
    <input class="input" placeholder="Tag" v-model="input"/>
    <br>
    <br>
    <!------- LISTS ALL QUESTIONS FROM RELATED TAG ------->
    <div v-for="question in allQuestions" :key="question.title">
      <p class="header">
        CREATION DATE: {{ convertToDate(question.creation_date) }}
      </p>
      <p class="header">
        VOTES: {{ question.score }}
      </p>    
      <Collapsible :question="question"/>
      <br>
      <br>
      <br>
    </div>
    <!------- END -- LISTS ALL QUESTIONS FROM RELATED TAG ------->
    <p class="response"> Response Time: {{ currentResponseTime }} seconds</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Collapsible from './Collapsible.vue';

@Component({
  components: {
    Collapsible,
  },
})
export default class Search extends Vue {
  data() {
    return {
      input: "",
    }
  }

  get allQuestions() {
    return this.$store.getters.questions;
  }

  get currentResponseTime() {
    return this.$store.getters.responseTime;
  }

  convertToDate(unix: number) {
    return new Date(unix * 1000);
  }

  submit() {
    this.$store.dispatch("ACTION_FETCH_QUESTIONS", { tag: this.$data.input });
  }
}
</script>

<style>
.submit-button {
  width: 150px;
  height: 50px;
  border-radius: 25px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  font-size: 20px;
  font-weight: bold;
  transition: 0.2s linear;
  border: 2px solid black;
  color: black;
  background-color: lightcyan;

}
.submit-button:hover {
  cursor: pointer;
  transform: scale(1.05);
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.input {
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 10px;
  border: 2px solid black;
  margin: 25px;
  width: 400px;
  height: 35px;
  font-size: 20px;
  font-weight: bold;
  transition: 0.2s linear;
  background-color: lavenderblush;
  color: black;
}

.input:hover {
  cursor: pointer;
  transform: scale(1.05);
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.header {
  font-size: 18px;
  font-weight: bold;
  padding: 0;
  margin: 0;
}

.response {
  font-size: 25px;
  font-weight: bold;
}
</style>
