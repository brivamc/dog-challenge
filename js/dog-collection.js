var dogCollection = 0;

$(document).ready(function() {
  // function to populate the dropdown with a list of dog breeds
    $.get("https://dog.ceo/api/breeds/list", function(data) {
      var dogList = data.message;
      var option = '';
      for (var i = 0; i < dogList.length; i++) {
         option += '<option value="'+ dogList[i] + '">' + dogList[i] + '</option>';
      }
      $("#items").html(option);
    });

// fetch more images of the selected breed using the fetch! button
    $('.fetch-btn').click(function() {
      getListImages($('#items').val());
    });
});



// function to get a random dog image
function getRandomImage() {
  $.get("https://dog.ceo/api/breeds/image/random", function(data) {
    addToCollection(data.message, "column");
  });
}



// function to get an image of a dog given the breed
function getListImages(breed) {
  $.get("https://dog.ceo/api/breed/" + breed + "/images/random", function(data) {
    addToCollection(data.message, "column");
  });
}



// adds the image to the gallery
function addToCollection(url, id){
  dogCollection++;

  // creates a div to wrap the image and button
  var div = document.createElement("div");
  var imgWrapId = '"imageWrap' + dogCollection + '"';
  div.id = imgWrapId;
  div.classList.add("imageWrap");
  document.getElementById(id).appendChild(div);

  // creates the image
  var img = document.createElement("IMG");
  img.src = url;
  document.getElementById(imgWrapId).appendChild(img);

  createXBtn(imgWrapId);
  
}


// creates the x button to remove the selected image
function createXBtn(id){
  var xBtn = document.createElement("BUTTON");
  xBtn.innerHTML = "x";
  xBtn.classList.add("remv-img-btn");
  xBtn.type = "submit";

  // will remove the image if clicked
  xBtn.onclick = function(){
    $(this).parent("div").remove();
  };

  document.getElementById(id).appendChild(xBtn);
}
