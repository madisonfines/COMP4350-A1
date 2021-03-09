<template>
  <div>
    <button class="collapsible" @click="collapse">{{ title }}</button>
      <div v-if="active" class="content">
        <p class="content-header">QUESTION BODY:</p>
        <span v-html="body"></span>
        <p class="content-header">QUESTION COMMENTS:</p>
        <div v-if="question.comment_count != 0" >
          <div class="comments" v-for="comment in question.comments" :key="comment.body">
            <p class="header3">
              Creation Date: {{ convertToDate(comment.creation_date) }} 
            </p>
            <p class="header2">
              Vote: {{ comment.score }}
            </p>
            <span v-html="comment.body"></span>
          </div>
        </div>
        <p v-else>No question comments.</p>
        <p class="content-header">ANSWERS:</p>
        <div v-if="question.answer_count != 0" >
          <div class="answers" v-for="answer in question.answers" :key="answer.body">
            <p class="header3">
              Creation Date: {{ convertToDate(answer.creation_date) }}
            </p>
            <p class="header2">
              Vote: {{ answer.score }}
            </p>
            <span v-html="answer.body"></span>
          </div>
        </div>
        <p v-else>No answers.</p>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {
  @Prop() private body!: any;
  @Prop() private title!: string;
  @Prop() private answer!: any;
  @Prop() private question!: any;

  data() {
    return {
      active: false,
    }
  }

  collapse() {
    if(this.$data.active) {
      this.$data.active = false;
    }
    else {
      this.$data.active = true;
    }  
  }

  convertToDate(unix: number) {
    return new Date(unix * 1000);
  }
}
</script>

<style>
.collapsible {
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border: 2px solid black;
  background-color: white;
  color: black;
  cursor: pointer;
  padding: 18px;
  width: 800px;
  text-align: center;
  outline: none;
  font-size: 18px;
  transition: 0.2s linear;
}

.collapsible:hover {
  cursor: pointer;
  transform: scale(1.05);
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.content {
  margin: auto;
  width: 90%;
  text-align: center;
  overflow: hidden;
  padding: 18px;
  display: 'none';
  background-color: lightyellow;
  border-radius: 10px;
  border: 2px solid black;
  font-size: 18px;
}

.content-header {
  font-weight: bold;
  font-size: 20px;
}

.comments {
  background-color: lightgray;
}

.answers {
  background-color: white;
}

.header2 {
  padding-top: 0;
  margin-top: 0;
  font-weight: bold;
}

.header3 {
  padding-bottom: 0;
  margin-bottom: 0;
  font-weight: bold;
}
</style>
