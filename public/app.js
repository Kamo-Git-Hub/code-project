

//sidenav
$(document).ready(function(){
    $('.sidenav').sidenav()
})

//dropdown
$(document).ready(function(){
    $('.dropdown-trigger').dropdown();
})

//tabs autorization
M.Tabs.init(document.querySelectorAll('.tabs'))


//add page
$(document).ready(function() {
    $('input#input_text').characterCounter();
  })




  function checkSex(){
     
    let male = document.querySelector("#male")
    let female = document.querySelector("#female")
    if(male.checked){
        female.disabled = true
    }else{
        female.disabled = false
    }
    if(female.checked){
        male.disabled = true
    }else{
        male.disabled = false
    }
  }


  


  $(function(){ 
    
    // commentForm = $('.comment').clone(true, true);
    
    $('form.comment .send').on('click', function(e) {
        e.preventDefault();
        const data = {
         
            post:$('.comment').attr("id"),
            body: $('form textarea').val()
        };
       
      let text =  $('form textarea').val('')
   
       $.ajax({
          type: 'POST',
          data: JSON.stringify(data),
          contentType: 'application/json',
          url: '/comment/add',

        }).done(function(user, owner) {
            $('.tbody-comment').append(`
            <div class="content-post-coment">
                     <p class="autor">Автор:
                         <a href="/users/user-profile/${owner}">${user.name}</a>
                     </p>
                     <p>
                        ${data.body}
                     </p>
                 </div>`)
           });

      });
     
})

function undisabled(){
    let val = document.getElementById("cometn-value").value
  if(val.length>0){
      document.querySelector(".send").disabled = false
  }else{
    document.querySelector(".send").disabled = true
  }
}

 





