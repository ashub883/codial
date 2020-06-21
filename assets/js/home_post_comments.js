
{

let createComment=function(){

let commentForm=$('#new-comment-form')


commentForm.each(function(){

    let form=$(this);

      form.submit(function(event){

            event.preventDefault();
          
           
        $.ajax({

               type:'POST',
               url:'/comments/create',
               data:form.serialize(),
               success:function(data){
                          
                let newComment=newCommentToBePrepended(data.data.comment);

                console.log()
                $(`#post-comments-${data.data.comment.post}`).prepend(newComment);
                

               },
               error:function(error){

                console.log(error.responseText)
               }
               



        })



      })



})

}


let newCommentToBePrepended=function(comment){

        return $(`<li id="comment-${comment._id}">
        <p>
        
        <small>
        
        <a class="delete-comment-button" href="/comments/destroy/${comment._id}">X</a>
        
        </small>
        
          ${comment.content}
        <br>
        <small>
              ${comment.user.name}
        
        </small>
    
        
        
        </p>
        </li>`)


}



createComment();

}