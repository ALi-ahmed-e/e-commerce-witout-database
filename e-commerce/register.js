let arr = [];
let newuser;
let uname = $(".name")
let upload = document.getElementById('upload')
let email = $(".email")
let pass = $(".pass")
let exist;
let foto;
let img = document.getElementsByClassName('img')[0]
$("#btn").click(function (e) {
    e.preventDefault();

    

  

    

let file = new FileReader();
file.readAsDataURL(upload.files[0]);
file.onload = function(){
    foto = file.result





    if (uname.val() !== '' && email.val() !== '' && pass.val() !== ''&& foto !== undefined && foto !== '') {

    newuser = {
        name: uname.val(),
        img:foto,
        email: email.val(),
        password: pass.val(),
        proudctsincart:''
    }

    arr.push(newuser)
    if (localStorage.user) {
        exist = JSON.parse(localStorage.user)
        exist.push(newuser)




        localStorage.setItem("user", JSON.stringify(exist))

    }else{
    localStorage.setItem("user", JSON.stringify(arr))
    }

 }


}
    $(".rel").html(`<center>
     <h1>thanks for registering</h1>
     </center>`)
    setTimeout(() => {
        window.open("index.html")
        window.close()
    }, 2000);


    

});






    




