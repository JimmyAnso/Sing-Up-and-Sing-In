// signUp
const singUpAccount = document.getElementById('singup-account');
const singUpPassword = document.getElementById('singup-password');
const singUpPasswordCheck= document.getElementById('singup-password-check');
const singUpSubmit = document.getElementById('singup-submit');

// signIn
const singInAccount = document.getElementById('singin-account');
const singInPassword = document.getElementById('singin-password');
const singInSubmit = document.getElementById('singin-submit');

const tab = document.getElementById('tab');
let isSingUp = true;

let obj = {
  email: '',
  password: ''
};

tab.addEventListener('click',function(e){
  const tabLinks = document.querySelectorAll('.tab__link');
  
  for(let i = 0; i < tabLinks.length ; i++){
    tabLinks[i].classList.remove("tab__link--active");
  }
  e.target.classList.add("tab__link--active");
  console.log(e.target.textContent);

  const tabContentForms = document.querySelectorAll('.tab__content--form');
  for(let i = 0; i < tabContentForms.length ; i++){
    tabContentForms[i].classList.remove("active");
  }
  if(e.target.textContent=="註冊"){
    document.getElementById('singup').classList.add("active");
  }
  else{
    document.getElementById('singin').classList.add("active");
  };
})

singUpSubmit.addEventListener('click', function () {
  let url = 'https://hexschool-tutorial.herokuapp.com/api/signup';
  if(singUpAccount.value == "" || singUpPassword.value == ""){
    alert("請填入正確資訊!!!");
    return;
  }
  else if(singUpPassword.value != singUpPasswordCheck.value){
    alert("請重新確認密碼");
    singUpPassword.value = '';
    singUpPasswordCheck.value = '';
    return;
  }

  obj.email = singUpAccount.value;
  obj.password = singUpPassword.value;
  addLoading();
  singUpOrIn(url,obj);
  singUpAccount.value = '';
  singUpPassword.value = '';
  singUpPasswordCheck.value = '';
});

singInSubmit.addEventListener('click', function () {
  let url = 'https://hexschool-tutorial.herokuapp.com/api/signin';
  if(singInAccount.value == "" || singInPassword.value == ""){
    alert("請填入正確資訊!!!");
    return;
  }

  obj.email = singInAccount.value;
  obj.password = singInPassword.value;
  addLoading();
  singUpOrIn(url,obj);
  singInAccount.value = '';
  singInPassword.value = '';
})

// API來源：https://github.com/hexschool/nodejs_ajax_tutorial

function singUpOrIn(url,obj) {
  axios.post(url, obj)
    .then(function (response) {
      removeLoading();
      console.log(response.data);
      alert(response.data.message);
      // document.getElementById("result").textContent = response.data.message;
    })
    .catch(function (error) {
      console.log(error);
    });
}

function addLoading(){
  document.getElementById("wrap").classList.add("wrap");
  document.getElementById("loader1").classList.add('loader-one');
  document.getElementById("loader2").classList.add('loader-two');
  document.getElementById("shield").classList.add('shield');
}
function removeLoading(){
  document.getElementById("wrap").classList.remove("wrap");
  document.getElementById("loader1").classList.remove('loader-one');
  document.getElementById("loader2").classList.remove('loader-two');
  document.getElementById("shield").classList.remove('shield');
}



