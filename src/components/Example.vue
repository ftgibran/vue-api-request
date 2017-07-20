<template>
  <div>
    <section id="home">

      <div class="container">
        <api-request
          :resource="$api.fakeRequest"
          :params="{time: 2000}"
          :trigger.sync="e1.trigger"
          effect="zoomIn"
          spinner="DotLoader"
          :spinner-scale="2"
          spinner-padding="62px"
        >
          <img src="../assets/v-api@256.png">
          <h1>API Request</h1>

          <a href="//ftgibran.github.io/#/vue-api-request">Docs & Demo</a>
        </api-request>

        <p>
          <button @click="e1.trigger=true">Reload</button>
        </p>
      </div>

    </section>

    <section>
      <h2>Basic Example</h2>
      <api-request
        :resource="$api.giphyRandom"
        v-model="e2.resp"
        :trigger.sync="e2.trigger"
        resp="data"
        effect="lightSpeedIn"
      >
        <img v-if="e2.resp" :src="e2.resp.data.image_url"/>
      </api-request>
      <p>
        <button @click="e2.trigger=true">Reload</button>
      </p>
    </section>

    <hr/>

    <section>
      <h2>Example trigger.sync</h2>

      <button @click="e3.trigger=true" class="btn">

        <api-request
          :resource="$api.fakeRequest"
          :params="{time: 1000, response: !e3.liked}"
          v-model="e3.liked"
          :trigger.sync="e3.trigger"
          effect="zoomIn"
          :spinner-scale="0.55"
          :spinner-padding="0"
        >
          <span slot="waiting">
              {{e3.liked ? 'You liked' : 'Like'}}
          </span>
        </api-request>

      </button>

    </section>

    <hr/>

    <section>
      <h2>Example sync & trigger.sync</h2>
      <div>
        <api-request
          :resource="$api.giphySearch"
          :params="{q: e4.q, offset: e4.offset, limit: 3}"
          v-model="e4.resp"
          :trigger.sync="e4.trigger"
          :sync="e4.offset"
          resp="data"
          effect="zoomIn"
        >
          <form slot="waiting" @submit.prevent="e4.trigger=true">
            <div class="form-group">
              <input type="text" placeholder="Type something" v-model="e4.q"/>
            </div>
            <div class="form-group">
              <button>Search</button>
            </div>
          </form>

          <div slot="success">

            <div v-if="e4.resp">
              <div v-for="item in e4.resp.data">
                <img :src="item.images.fixed_width.url"/>
              </div>
            </div>

          </div>
        </api-request>

        <div v-if="e4.resp">
          <span>
            <button @click="e4.offset -= e4.offset == 0 ? 0:3">Previous</button>
          </span>
          <span>
            {{e4.offset / 3 + 1}}
          </span>
          <span>
            <button @click="e4.offset += 3">Next</button>
          </span>
        </div>

      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'Example',
    data () {
      return {
        e1: {
          trigger: false,
          resp: null
        },
        e2: {
          trigger: false,
          resp: null
        },
        e3: {
          trigger: false,
          liked: false
        },
        e4: {
          trigger: false,
          q: null,
          offset: 0,
          resp: null
        }
      }
    },
    mounted () {
    },
    methods: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  hr {
    position: relative;
    border: none;
  }

  hr::after {
    content: " ";
    background: #FC6194;
    width: 80px;
    height: 8px;
    position: absolute;
    top: 0;
    left: calc(50% - 40px);
  }

  .btn {
    font-size: 24px;
    padding: .5em 1em;
  }

  section {
    padding: 3em 0;
  }

  #home {
    height: 100vh;
    background: linear-gradient(to bottom right, #E0FEB4, #F9C7D7);
    padding: 0;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

</style>
