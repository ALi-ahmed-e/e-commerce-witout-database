let bi = document.getElementsByClassName("bii")[0]
let sidebar = document.getElementsByClassName("sidebar")[0]

let submit = $(".submit")
let email = $(".email")
let pass = $(".password")

let signed;




bi.onclick = function () {

    sidebar.classList.toggle("out")

}

//sign in & show user data

function signin() {
    $(".signpage").css({
        transform: "translateY(0%)"
    })
}

submit.click(function (e) {
    e.preventDefault();
    if (localStorage.user) {


        JSON.parse(localStorage.user).map((e) => {
            if (email.val() === e.email && pass.val() === e.password) {

                localStorage.setItem("signed", 1)
                localStorage.setItem("signdata", JSON.stringify(e))
                $(".signpage").css({
                    transform: "translateY(-100%)"
                })
                $(".bts").remove()
                $(".sname").html(`${JSON.parse(localStorage.signdata).name}`)
                $(".pho").html(`<img src="${JSON.parse(localStorage.signdata).img}" alt="" width="32" height="32" class="rounded-circle me-2"></div>`)
            }
        })
    }
});

window.onload = function () {



    if (localStorage.signed == 1) {

        signed = 1
        $(".bts").remove()
        $(".sname").html(`${JSON.parse(localStorage.signdata).name}`)
        $(".pho").html(`<img src="${JSON.parse(localStorage.signdata).img}" alt="" width="32" height="32" class="rounded-circle me-2"></div>`)
        $(".cnum").html(JSON.parse(localStorage.signdata).proudctsincart.length + 1)




    }

}

//logout btn

function logout() {
    localStorage.setItem("signed", 0)
    localStorage.removeItem("signdata")
    location.reload()

}

//show proudcts

let tmp;

let all = document.getElementsByClassName("all")[0]

async function getprods() {

    response = await fetch("https://fakestoreapi.com/products")
    let data = await response.json()


    // add2cart(data,'')

    // all.innerHTML = ''
    // console.log(data)
    for (let i = 0; i < data.length; i++) {

        all.innerHTML += `<div  class="card" style="width: 18rem;">
       <img  src="${data[i].image}" class="card-img-top" alt="...">
       <div class="card-body">
         <p class="card-text">${data[i].title}</p>
         <p class="card-text" style='color:green;'>price:${data[i].price}$</p>
          <button onclick="add2cart(${i})" class="btn btn-info">add to cart</button>
       </div>
     </div>`

    }


};
getprods()











//profile page

$(".fa-xmark").click(function (e) {
    e.preventDefault()

    $(".profilepage").css({
        transform: "translateY(-100%)"
    })

});

function prof() {

    $(".profilepage").css({
        transform: "translateY(0%)"
    })
    $(".pimg").attr("src", JSON.parse(localStorage.signdata).img);
    $(".pname").html(JSON.parse(localStorage.signdata).name)
    $(".pemail").html(JSON.parse(localStorage.signdata).email)
    $(".ppass").html(JSON.parse(localStorage.signdata).password)

}


//add to cart
let proarr;
let mdata;
let uarr = JSON.parse(localStorage.user)
if (localStorage.user && localStorage.signdata) {


    if (JSON.parse(localStorage.signdata).proudctsincart != '') {
        proarr = JSON.parse(localStorage.signdata).proudctsincart
    } else { proarr = [] }
}

function add2cart(i) {

    fetch('https://fakestoreapi.com/products').then(res => res.json()).then(data => {

        proarr.push(data[i].id)

        uarr.map((e) => {
            if (JSON.parse(localStorage.signdata).email === e.email) {

                mdata = {
                    name: e.name,
                    img: e.img,
                    email: e.email,
                    password: e.password,
                    proudctsincart: proarr
                }

                localStorage.setItem('signdata', JSON.stringify(mdata))



            }
            if (JSON.parse(localStorage.signdata).email !== e.email) {

                let newarr = [e, JSON.parse(localStorage.signdata)]


                localStorage.setItem('user', JSON.stringify(newarr))

               
                // location.reload()
                
            }
 $(".cnum").html(JSON.parse(localStorage.signdata).proudctsincart.length)
 $(".done").addClass("dnshow");
 setTimeout(() => {
    $(".done").removeClass("dnshow");
 }, 1500);


        })



    })




}
let prods = document.getElementsByClassName("prods")[0]
$(".artbtn").click(function (e) {
    e.preventDefault();

    $(".cartpage").css("transform", "translateX(0%)")
    sidebar.classList.remove("out")

    $(".hmbtn").removeClass("active");
    $(".hmbtn").css("color", "white")
    $(".artbtn").addClass("active");

    fetch('https://fakestoreapi.com/products').then(res => res.json()).then(data => {
        JSON.parse(localStorage.signdata).proudctsincart.map((jsone) => {


            data.map((e, i) => {

                if (e.id === jsone) {
                    console.log(e)
                    prods.innerHTML += `<div  class="card" style="width: 18rem;">
       <img  src="${e.image}" class="card-img-top" alt="...">
       <div class="card-body">
         <p class="card-text">${e.title}</p>
         <p class="card-text" style='color:green;'>price:${e.price}$</p>
       </div>
     </div>`

                }

            })
        })

    })






});
$(".hmbtn").click(function (e) {
    e.preventDefault();
    $(".cartpage").css("transform", "translateX(-100%)")
    sidebar.classList.remove("out")

    $(".artbtn").removeClass("active");
    $(".hmbtn").addClass("active");

    prods.innerHTML = ''
});
