const config = {
  apiKey: "AIzaSyA2WUeu4JNV30qCHDR42hkwoga-lf-3lk0",
  authDomain: "ir-sensor-10514.firebaseapp.com",
  databaseURL: "https://ir-sensor-10514.firebaseio.com",
  projectId: "ir-sensor-10514",
  storageBucket: "ir-sensor-10514.appspot.com",
  messagingSenderId: "929767582255"
};
firebase.initializeApp(config);
const dbRefObject = firebase.database().ref().child("sensor");

var app = new Vue({
  el: '#app',
  data () {
    return {
      count: 0,
      imageUrl: '',
      gifySearchTag: 'star-trek'
    }
  },
  mounted() {
    this.randomGif();
    this.randomBackColor();
  },
  created() {
    dbRefObject.on("value", snap => {
      this.count = snap.val().clicks;
    });
  },
  watch: {
    count: function(val) {
      if(val) {
        this.randomGif();
        this.randomBackColor();
      }
    },
    gifySearchTag: function(val) {
      this.randomGif();
    }
  },
  methods: {
    resetCounter: function(event) {
      if(event) {
        dbRefObject.update({
          "clicks": 0
        });
        this.randomGif();
      }
    },
    randomGif: function() {
      axios.get(`http://api.giphy.com/v1/gifs/random?tag=${this.gifySearchTag}&api_key=S2yXMMc8VI8qHZNdR2PWH086Ff8fI52w&limit=1`).then(response => {
        this.imageUrl = response.data.data.images.original.url
      });
    },
    randomBackColor: function(event) {
      var color = '#';
      var colors = ['f3a683','f8a5c2','63cdda','ffdd59','#0be881','f53b57','3c40c6'];
      color += colors[Math.floor(Math.random() * colors.length)];
      document.body.style.background = color;
    },
    checkEnter: function(val) {
      let string = val.target.value;
      this.gifySearchTag = string.replace(" ", "-");
    }
  }
});
