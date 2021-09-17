<template>
  <div class="hello">

    <!-- Aquí va a ir todo lo del LOG IN-->
    <div style="background-color: #0d6efd;">
      <div class="text-center">
        
        <button v-if="!authenticated" @click="login"  type="button" class="btn btn-light" style="  width:200px; height:40px; border-radius:3%;"> <img src="https://img.icons8.com/color/16/000000/google-logo.png">             Login with Google</button>
        <button v-if="!authenticated" @click="signup"  type="button" class="btn btn-light" style="  width:200px; height:40px; border-radius:3%;"> <img src="https://img.icons8.com/color/16/000000/google-logo.png">             Create an account with Google</button>
      </div>

    </div>

    <div v-if="authenticated">
      <div class="container-fluid m-0 p-0">
        <div id="bar" class="bg-primary p-4">
          <div class="row">
            <div class="col-7" id="dailyWord">
              <h5 class="align-text-top text-white">DailyWord</h5>
            </div>
            <div class="col" id="texto">
              <h5 class="align-text-top text-white">Mis Palabras</h5>
            </div>
            
            
            <div class="col">
              <i
                class="bi-person-circle align-text-top"
                style="font-size: 2rem; color: white"
              ></i>
            </div>

             <div class="col">
           <!-- botón de LOGOUT-->
              <button @click="logout" type="button" class="btn btn-outline-light">Logout</button>
            </div>

            

          </div>
        </div>
        
        <div id="landing-text" class="">
          <div class="row">
            <p class="col-8 offset-3 fs-1 fw-bold">Hola, {{ firstName }}</p>
          </div>
          <div>
            <p class="col-8 text-muted offset-3 fs-3">
              You can only fail when you stop trying.
            </p>

            <!-- aqui imprimo la palabra-->
            <p class="col-8 text-muted offset-3 fs-3">{{ palabra }}</p>
            <!-- aqui imprimo la definición-->
            <p class="col-8 text-muted offset-3 fs-3">{{ def }}</p>

           
           <!-- botón de save word-->
              <button @click="createWord(palabra,def,user.data.displayName)" type="button" class="btn btn-primary"> Save word</button>
            

          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>

import Firebase from "../firebase.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from "axios";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
    account: Boolean
  },
  data() {
    return {
      user: {
        loggedIn: false,
        data: {},
      },
      palabra: null,
      def: null,
      word: "",
      defin: "",
      name: "",
      usuario: ""
    };
  },
  computed: {
    authenticated() {
      return this.user.loggedIn;
    },
    firstName() {
      if (this.user.data.displayName) {
        return this.user.data.displayName.split(" ")[0];
      }
      return null;
    },
  },
  methods: {
    login() {
      Firebase.login();
    },
    signup(){
      Firebase.signup();
      this.account = true;
    },
    logout() {
      Firebase.logout();
    },
    createWord(word, defin, usuario) {
      Firebase.createWord(word, defin, usuario);
    }
  },
  mounted: function() {
      const auth = getAuth();
      onAuthStateChanged( auth, user => {
        if (user) {
          this.user.loggedIn = true;
          this.user.data = user;


          const options = {
  method: 'GET',
  url: 'https://wordsapiv1.p.rapidapi.com/words/',
  params: {random: 'true'},
  headers: {
    'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
    'x-rapidapi-key': '97459d675emsh83b437ec412eba5p1ba43bjsn9d7291c09ad7'
  }
};
const self = this;
axios.request(options).then(function (response) {
  console.log(response.data);
  console.log(response.data.word);
  self.palabra = response.data.word;
  console.log(response.data.results[0].definition);
  self.def = response.data.results[0].definition;
}).catch(function (error) {
  console.error(error);
});
          if (this.account){
            console.log("hola");
            Firebase.createUser(this.user.data.displayName);
          }
        }
        else {
          this.user.loggedIn = false;
          this.user.data = {};
        }
      })
    }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#landing-text {
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
#texto {
  text-align: center;
  position: relative;
  top: 50%;
  -ms-transform: translateY(30%);
  -webkit-transform: translateY(30%);
  transform: translateY(30%);
}
#dailyWord {
  position: relative;
  top: 50%;
  -ms-transform: translateY(30%);
  -webkit-transform: translateY(30%);
  transform: translateY(30%);
}
</style>