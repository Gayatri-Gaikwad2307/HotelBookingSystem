// Get the modal
const modal = document.getElementById("myModal");

// Get the image and insert it inside the modal
const photos = document.querySelectorAll('.photo');
const modalImg = document.getElementById("img01");
const captionText = document.getElementById("caption");

photos.forEach(photo => {
    const img = photo.querySelector('img');
    const caption = photo.querySelector('p');
    
    img.addEventListener('click', function() {
        modal.style.display = "block";
        modalImg.src = this.src;
        captionText.innerHTML = caption.innerHTML;
    });
});

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};