<template>
  <div>
    <button class="collapsible" @click="collapse">{{ title }}</button>
       <p v-if="active" class="content">{{ body }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {
  @Prop() private body!: string;
  @Prop() private title!: string;

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
  width: 600px;
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
  width: 560px;
  text-align: center;
  overflow: hidden;
  padding: 18px;
  display: 'none';
  background-color: lightyellow;
  border-radius: 10px;
  border: 2px solid black;
  font-size: 18px;
}
</style>
