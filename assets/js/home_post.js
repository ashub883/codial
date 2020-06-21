// method to submit the form data for new post using ajax 

    let createPost=function(){

        let newPostForm = $('#new-post-form');
        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type:'post',
                url:'/posts/create',
            // serialize is to convert data  into JSON format (key,value format) 
                data:newPostForm.serialize(),
                success:function(data){
                   let newPost=newPostDom(data.data.post);
                   $('#post-list-container>ul').prepend(newPost);
                   deletePost($(' .delete-post-button',newPost));


                   new PostComments(data.data.post._id);

                   new ToggleLike($(' .toggle-like-button',newPost));
                   
                   // comment from listener
                  // console.log($(' .delete-post-button',newPost));
                   
                },error:function(error){
                    console.log(error.reponseText);
                }
            });
        });
    }

                    //let newCommentForm = $(' #new-comment-form',newPost)
                    
// method to create a post in DOM
    
         let newPostDom=function(post)
         {

           return $(`<li id="post-${post._id}"> 

              <p>
               
                  <small>
          
                 <a  class ="delete-post-button" href="/posts/destroy/${post._id}">X</a>
                  </small>
                 
                  ${ post.content }                            
          <br>
          <small>

              ${post.user.name}
          </small>
          <br>
          <small>

          <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
          
                   0 likes
          </a>

          </small>
          
              </p>
          <div class="post-comments" >
          
          <form action="/comments/create"  id="new-comment-form" method="POST">
          <input type="text" name="content" placeholder="Type here to add comment">
          <input type="hidden" name="post" value="${ post._id }">
          <input type="submit" value="Add comments">
          
          
          </form>
          
          <div class="post-comments-lists">
          
          <ul id="post-comments-${ post._id }">
          
          
          </ul>
          </div>
          
          </div>
    
          </li>`)

         }


// method to delete a post from Dom

let deletePost=function(deleteLink)
{

    $(deleteLink).click(function(e){

        e.preventDefault();
        $.ajax({
            type:'get',
            url:$(deleteLink).prop('href'),
            // as we are sending a req using url then server will give a post id which was deleted in data 
            success:function(data){

                $(`#post-${data.data.post_id}`).remove();
            },
            error:function(error){
                console.log(error.reponseText);
            }
        });

    });
}
      let convertPostsToAjax =function(){

        $('#post-list-container>ul>li').each(function(){
            
            let self=$(this);
           // console.log(self[0]);
            deletePost($(' .delete-post-button',self));

             let postId=self.prop('id').split("-")[1]
            //console.log(postId);
             new PostComments(postId);
        });
      }
    
createPost()
convertPostsToAjax()

                
     
            
            