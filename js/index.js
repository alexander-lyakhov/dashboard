const { createApp } = Vue;

const app = createApp({
  el: '#app',
  template: `
    <boards :items="boards" />
  `,
  data: () => ({
    boards: boards
  })
});

app.component('boards', {
  template: `
    <div class="boards">
      <board v-for="board in items" :boardData="board" />
    </div>
  `,
  props: {
    items: {
      type: Array,
      default: () => ([])
    }
  }
});

app.component('board', {
  template: `
    <div class="board"
      :style="boardStyles"
      :class="{outlined: boardData.outlineColor}"
    >
      <h1
        class="board-title"
        :style="titleStyles"
      >
        {{ boardData.title }}
      </h1>
      <ul>
        <li v-for="item in boardData.items" @click="open(item.link)">
          <div class="title">{{ item.title }}</div>
          <div class="link">{{ item.link }}</div>
        </li>
      </ul>
    </div>
  `,
  props: {
    boardData: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    boardStyles() {
      return {
        'outline-color': this.boardData.outlineColor
      }
    },
    titleStyles() {
      return {
        'border-color': this.boardData.accentColor || '#808080'
      }
    }
  },
  methods: {
    open(link) {
      window.open(link, '_blank');
    }
  }
});

app.mount('#app');