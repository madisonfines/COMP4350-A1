import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

// ---------------------------------------------------------------
// FUNCTIONS
// ---------------------------------------------------------------
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
// ---------------------------------------------------------------
// END -- FUNCTIONS
// ---------------------------------------------------------------

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    questions: [],
    responseTime: 0,
  },
  getters: {
    questions: (state) => {
      return state.questions;
    },
    responseTime: (state) => {
      return state.responseTime;
    },
  },
  mutations: {
    MUTATION_SET_QUESTIONS(state, questions) {
      state.questions = questions;
    },
    MUTATION_SET_RESPONSE_TIME(state, time) {
      state.responseTime = time;
    },
  },
  actions: {
    ACTION_FETCH_QUESTIONS({ commit }, values) {
      const t0 = performance.now();
      const tag = values.tag;
      const lastWeek = getLastWeekDate();

      // Call to get most recent questions in the past week
      axios
        .get(
          "https://api.stackexchange.com/2.2/search?fromdate="+ lastWeek
          + "&order=desc&sort=creation&tagged=" + encodeURIComponent(tag) 
          + "&site=stackoverflow&filter=!)rTkraPXxg*xgr03n8Uq"
        )
        .then((response) => {
          let questions = response.data.items;

          // If there are more than 10 questions in the past week
          if(response.data.items.length > 10) {
            questions = [];

            // 10 newest questions
            const itemsDate = response.data.items;      
            let x;
            for(x = 0; x < 10; x++){
              questions.push(itemsDate[x]);
            }
          }

          // Call to get most voted questions in the past week
          axios
            .get(
              "https://api.stackexchange.com/2.2/search?fromdate="+ lastWeek
              + "&order=desc&sort=votes&tagged=" + encodeURIComponent(tag) 
              + "&site=stackoverflow&filter=!)rTkraPXxg*xgr03n8Uq"
            )
            .then((responseVotes) => {
              // If there are more than 10 questions take 10, else take the number of questions provided
              const range = (responseVotes.data.items.length > 10) ? 10 : responseVotes.data.items.length;

              // Add most voted questions to main list
              const itemsVote = responseVotes.data.items;
              let i;
              for(i = 0; i < range; i++){
                questions.push(itemsVote[i]);
              }

              // Sort merged list and remove duplicates
              questions.sort(compareDates);
              let y;
              for(y = 1; y < questions.length; y++) {
                if(questions[y-1].question_id == questions[y].question_id) {
                  questions.splice(y, 1);
                }
              }

              commit("MUTATION_SET_QUESTIONS", questions);

              const t1 = performance.now();
              commit("MUTATION_SET_RESPONSE_TIME", (t1 - t0)/1000);
          });
        });
    },
  }
})
