import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

function compareVotes(a: any, b: any) {
  if(a.score < b.score) { return 1; }
  else if(a.score > b.score) { return -1; }  
  else { return 0; }
}

function compareDates(a: any, b: any) {
  if(a.creation_date < b.creation_date) { return 1; }
  else if(a.creation_date > b.creation_date) { return -1; }  
  else { return 0; }
}

function getLastWeekDate() {
  const date = new Date();
  const lastWeek = new Date().getDate() - 7;
  date.setDate(lastWeek);
  return Date.parse(date.toUTCString()) / 1000;
}

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    questions: [],
  },
  getters: {
    questions: (state) => {
      return state.questions;
    },
  },
  mutations: {
    MUTATION_SET_QUESTIONS(state, questions) {
      state.questions = questions;
    },
  },
  actions: {
    ACTION_FETCH_QUESTIONS({ commit, getters }, values) {
      const tag = values.tag;
      
      axios
        .get(
          "https://api.stackexchange.com/2.2/search?fromdate="+ encodeURIComponent(getLastWeekDate()) 
          + "&order=desc&sort=creation&tagged=" + encodeURIComponent(tag) 
          + "&site=stackoverflow&filter=!)rTkraPXxg*xgr03n8Uq"
        )
        .then((response) => {
          let questions = response.data.items;

          if(questions.length > 10) {
            // 10 newest questions
            const itemsDate = response.data.items;      
            const mostRecent = [];
            let x;
            for(x = 0; x < 10; x++){
              mostRecent.push(itemsDate[x]);
            }

            // 10 most voted
            const itemsScore = response.data.items;
            itemsScore.sort(compareVotes);
            const highestVote = [];
            let i;
            for(i = 0; i < 10; i++){
              highestVote.push(itemsScore[i]);
            }

            // Merge both lists
            questions = highestVote.concat(mostRecent);
            questions.sort(compareDates);
            let y;
            for(y = 1; y < questions.length; y++) {
              if(questions[y-1] == questions[y]) {
                questions.splice(y, 1);
              }
            }
          }

          commit("MUTATION_SET_QUESTIONS", questions);
          console.log(getters.questions);
        });
    },
  }
})
