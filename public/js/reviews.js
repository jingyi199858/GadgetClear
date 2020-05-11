let inProgressNewPost = false;
function postNewPost(userId){
	var postTitle = document.getElementById("postTitle").value;
	var postContent = document.getElementById("postContent").value;

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange=function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log("It worked!");
			alert("Post has successfully been added!");
			window.location.replace("/review");
		}else if(this.readyState == 4 && this.status == 400){
			alert("There was a problem adding this post. Please try again, or refresh the page.");
		}else{
			//not done yet
			//console.log("Hello " + this.status + " and  " + this.readyState);
		}
	};

    xhttp.open("POST", "/review/newReview", true);
	xhttp.setRequestHeader("Content-type", "application/json");
	var myData = {};
	myData.userId = userId;
	myData.postTitle = postTitle;
	myData.postContent = postContent;
	xhttp.send(JSON.stringify(myData));
}


function newPost(id){
	console.log("This is the id " + id);
	if(!inProgressNewPost){
		inProgressNewPost = true;
		var postParent = document.getElementById("postParent");
		var postTitle = document.createElement("input");
		var postContent = document.createElement("textarea");
		var postSave = document.createElement("button");
		var postTempDiv = document.createElement("div");

		postSave.innerHTML = "Add new post!";
		postSave.setAttribute("class", "post-entries");
		postSave.setAttribute( "onClick", "javascript: postNewPost('"+ id +"');" );

		postContent.setAttribute("class", "post-entries");
		postContent.setAttribute("placeholder", "Post Content");
		postContent.setAttribute("id", "postContent");
		postContent.setAttribute("style", "height: 200px; width: 80%;");

		postTitle.setAttribute("class", "post-entries");
		postTitle.setAttribute("placeholder", "Post Title");
		postTitle.setAttribute("id", "postTitle");	

		postTempDiv.append(postTitle);
		postTempDiv.append(postContent);
		postTempDiv.append(postSave);
		postTempDiv.setAttribute("class", "post");

		postParent.prepend(postTempDiv);
	}
}

function removePost(authorId,userId,postId){
	if(authorId===userId){
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange=function() {
			if (this.readyState == 4 && this.status == 200) {
				console.log("It worked!");
				alert("Post has successfully been deleted!");
				window.location.replace("/forum");
			}else if(this.readyState == 4 && this.status == 400){
				alert("There was a problem deleting this post. Please try again, or refresh the page.");
			}else{
				//not done yet
				//console.log("Hello " + this.status + " and  " + this.readyState);
			}
		};

	    xhttp.open("POST", "/forum/removePost", true);
		xhttp.setRequestHeader("Content-type", "application/json");
		var myData = {};
		myData.postId = postId;
		xhttp.send(JSON.stringify(myData));
	}else{
		alert("You do not have access to delete this post! Only the owner can delete the post.");
	}
}