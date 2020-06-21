class PostComments{

    constructor(postid)
    {
      var PostId=postid;
       
        this.createComment(PostId);

      var postContainer=$(`#post-${PostId}`)

        // call for the existing comments

                  let self=this;
          $(' .delete-comment-button',postContainer).each(function(){

            self.deleteComment($(this));
          })
       
    }
 
    createComment(PostId){
      let pself=this;
        //console.log(pself);
        let newCommentForm=$('#new-comment-form')
        //  console.log($('#new-comment-form')[0]);
        
      
           //console.log(PostId);
               newCommentForm.submit(function(e){

                e.preventDefault();
                let self=this;
                //console.log(self);


                $.ajax({

              type:'POST',
               url:'/comments/create',
               data:newCommentForm.serialize(),
               success:function(data){
                          
                let newComment=pself.newCommentToBePrepended(data.data.comment);

                
                $(`#post-comments-${PostId}`).prepend(newComment);
                 
                pself.deleteComment($(' .delete-comment-button',newComment));
                 
                           new ToggleLike($(' .toggle-like-button',newComment));
               },
               error:function(error){

                console.log(error.responseText)
               }


                })

               })         
                       }
                          // method to create a comment in dom
                       newCommentToBePrepended(comment){

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
                    
                        <small>

          <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${comment._id}&type=Comment">
          
                   0 likes
          </a>

          </small>
                        
                        </p>
                        </li>`)
                
                
                }

                deleteComment(deleteCommentLink){


                  $(deleteCommentLink).click(function(e){

                    e.preventDefault();

                    $.ajax({
                      type:'get',
                      url:$(deleteCommentLink).prop('href'),
                      // as we are sending a req using url then server will give a post id which was deleted in data 
                      success:function(data){
          
                          $(`#comment-${data.data.comment_id}`).remove();
                      },
                      error:function(error){
                          console.log(error.reponseText);
                      
                      }
          
                  });

                  })



                }

                       }









                      



                    



