<template>
  <div class="hello">

    <!-- Aquí va a ir todo lo del LOG IN-->
    <div class="login">
      <div v-if="!authenticated" class="fadeInDown rounded" style=" border:none;">
        <div id="formContent" style= "background-color: #4172fd;">
          <div class="fadeIn first">
            <img src="../../public/logowordie.jpg" id="icon" alt="User Icon" />
          </div>

          <form id= "formCss">
            <input type="text" id="login" class="fadeIn second" name="login" placeholder="login">
            <input type="text" id="password" class="fadeIn third" name="login" placeholder="password">
            <input type="submit" class="fadeIn fourth" value="Log In">
          </form>
          <div class="fadeIn fifth" style= "padding-bottom: 15px;">
            <table>
          		<td style="padding-left: 20px;">
          			<button v-if="!authenticated" @click="signup"  type="button" class="btn btn-light" id= "loginButton" style="  width:180px; height:45px; border-radius:3%;"> <img src="https://img.icons8.com/color/16/000000/google-logo.png">             Create an account with Google</button>
          		</td>
          		<td>
            		<button v-if="!authenticated" @click="login"  type="button" class="btn btn-light" id="loginButton" style="  width:180px; height:45px; border-radius:3%;" > <img src="https://img.icons8.com/color/16/000000/google-logo.png" >             Login with Google</button>
        		  </td>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div v-if="authenticated">
      <div id="bar" class="bg-primary p-4">
          <div class="row align-items-center">
            <div class="col-lg-8 col-md-5">
              <a href="HelloWorld.vue">
                <h5 class="text-white">DailyWord</h5>
              </a>
            </div>
            <div class="col-lg-2 col-md-3">
              <h5 class="text-white">Mis Palabras</h5>
            </div>
            <div class="col">
            <!-- botón de LOGOUT-->
              <button @click="logout" type="button" class="btn btn-outline-light">Logout</button>
            </div>
          </div>
        </div>
        <div id="landing-text" class="">
          <div class="">
              <img src="https://i.ibb.co/6n7sm0x/nick-fithen-Y125-COCWeu-Q-unsplash.jpg" alt="" id="landingimg"/>
            </div>
          <div class="row">
            <p class="col-8 offset-2 fs-1 fw-bold">Hola, {{ firstName }}</p>
            <p class="col-lg-6 col-6 text-muted offset-2 fs-4">
              Bienvenido, tu palabra del día es la siguiente:
            </p>
            <br>
            <!-- aqui imprimo la palabra-->
            <p class="col-8 offset-2 fs-4">Palabra: {{ palabra }}</p>
            <!-- aqui imprimo la definición-->
            <p class="col-8 offset-2 fs-4">Definición: {{ def }}</p>
            <button @click="createWord(palabra,def,user.data.displayName)" type="button" class="btn btn-primary col-md-2 col-8 offset-md-3 offset-1" style="position: relative; top:30px; left: 50px"> Guardar Palabra</button>
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
#landingimg{
  width: 45%; 
  position:fixed; 
  bottom: -90%; 
  left:90%;
}

@media screen and (max-width: 1700px) {
  #landingimg{
    width: 30%;
    left: 80%;
    bottom: -50%;
  }
}
@media screen and (max-width: 1400px) {
  #landingimg{
    width: 30%;
    left: 70%;
    bottom: -50%;
  }
}
@media screen and (max-width: 1200px) {
  #landingimg{
    width: 30%;
    left: 60%;
    bottom: -50%;
  }
}
@media screen and (max-width: 1200px) {
  #landingimg{
    left: 0%;
    display: none;
  }
}

#bar{
  position: fixed;
  width: 100%;
}

#landing-text {
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  animation: fadeIn 5s;
  -webkit-animation: fadeIn 5s;
  -moz-animation: fadeIn 5s;
  -o-animation: fadeIn 5s;
  -ms-animation: fadeIn 5s;
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



.login {
  display: flex;
  align-items: center;
  flex-direction: column; 
  justify-content: center;
  width: 100%;
  min-height: 100%;
}

#icon {
  padding: 8px;
  width:15%;
  display: block;
  margin-left: auto;
  margin-right: auto;
  border-radius: 25px;
}

#loginButton{
  padding: 8px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  border: none;
}
#loginButton:hover {
  filter: brightness(90%);
}

#formContent {
  -webkit-border-radius: 10px 10px 10px 10px;
  border-radius: 10px 10px 10px 10px;
  background: #fff;
  padding: 30px;
  width: 90%;
  max-width: 450px;
  position: relative;
  padding: 0px;
  -webkit-box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);
  box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);
  text-align: center;
}

#formFooter {
  background-color: #f6f6f6;
  border-top: 1px solid #dce8f1;
  padding: 25px;
  text-align: center;
  -webkit-border-radius: 0 0 10px 10px;
  border-radius: 0 0 10px 10px;
}

/* FORM TYPOGRAPHY*/

input[type=button], input[type=submit], input[type=reset]  {
  background-color: #56baed;
  border: none;
  color: white;
  padding: 15px 80px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 13px;
  -webkit-box-shadow: 0 10px 30px 0 rgba(95,186,233,0.4);
  box-shadow: 0 10px 30px 0 rgba(95,186,233,0.4);
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  margin: 5px 20px 40px 20px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

input[type=button]:hover, input[type=submit]:hover, input[type=reset]:hover  {
  background-color: #39ace7;
}

input[type=button]:active, input[type=submit]:active, input[type=reset]:active  {
  -moz-transform: scale(0.95);
  -webkit-transform: scale(0.95);
  -o-transform: scale(0.95);
  -ms-transform: scale(0.95);
  transform: scale(0.95);
}

input[type=text] {
  background-color: #f6f6f6;
  border: none;
  color: #0d0d0d;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 5px;
  width: 85%;
  border: 2px solid #f6f6f6;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
}

input[type=text]:focus {
  background-color: #fff;
  border-bottom: 2px solid #5fbae9;
}

input[type=text]:placeholder {
  color: #cccccc;
}

/* ANIMATIONS */

/* Simple CSS3 Fade-in-down Animation */
.fadeInDown {
  -webkit-animation-name: fadeInDown;
  animation-name: fadeInDown;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

@-webkit-keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

/* Simple CSS3 Fade-in Animation */
@-webkit-keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
@-moz-keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
@keyframes fadeIn { from { opacity:0; } to { opacity:1; } }

.fadeIn {
  opacity:0;
  -webkit-animation:fadeIn ease-in 1;
  -moz-animation:fadeIn ease-in 1;
  animation:fadeIn ease-in 1;

  -webkit-animation-fill-mode:forwards;
  -moz-animation-fill-mode:forwards;
  animation-fill-mode:forwards;

  -webkit-animation-duration:1s;
  -moz-animation-duration:1s;
  animation-duration:1s;
}

.fadeIn.first {
  -webkit-animation-delay: 0.4s;
  -moz-animation-delay: 0.4s;
  animation-delay: 0.4s;
  
}

.fadeIn.second {
  -webkit-animation-delay: 0.6s;
  -moz-animation-delay: 0.6s;
  animation-delay: 0.6s;

}

.fadeIn.third {
  -webkit-animation-delay: 0.8s;
  -moz-animation-delay: 0.8s;
  animation-delay: 0.8s;
}

.fadeIn.fourth {
  -webkit-animation-delay: 1s;
  -moz-animation-delay: 1s;
  animation-delay: 1s;
}

.fadeIn.fifth {
  -webkit-animation-delay: 1.2s;
  -moz-animation-delay: 1.2s;
  animation-delay: 1.2s;
}

/* Simple CSS3 Fade-in Animation */
.underlineHover:after {
  display: block;
  left: 0;
  bottom: -10px;
  width: 0;
  height: 2px;
  background-color: #56baed;
  content: "";
  transition: width 0.2s;
}

.underlineHover:hover {
  color: #0d0d0d;
}

.underlineHover:hover:after{
  width: 100%;
}

/* OTHERS */

*:focus {
    outline: none;
} 
</style>