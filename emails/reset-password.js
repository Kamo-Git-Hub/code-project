const config = require("../keys/keys")
module.exports = function(email, token){
    return{
to:email,
from:config.EMAIL_FROM,
subject:"Восстановление доступа",
html:`
<div>

<h1>Забыли пароль?</h1>
<hr/>
<div>
<b>
Если вы не отправляли заявку на восстановление пароля,
<br/>
то проигнорируйте данное письмо.
<br/>
В противном случае перейдите по указанной ссылке ниже 
<br/>
<i><a href="${config.BASE_URL}/auth/password/${token}">востановить доступ</a></i>

</b>
</div>

</div>
`
    }
}