// THIS EVENT LISTENER DISABLES THE BUTTONS BASED ON THE CURRENT URL
window.addEventListener("load", () => {
    if (window.location.pathname === "/bookshelf/my-saved-books") {
        const savedBookBtn1 = document.getElementById("mySavedBooksBtnInSavedBook")
        savedBookBtn1.classList.toggle("disableButton");
        savedBookBtn1.prop("disabled", true);
    }

    if (window.location.pathname === "/bookshelf/my-created-books") {
        const createdBookBtn2 = document.getElementById("myCreatedBooksBtnInCreatedBook")
        createdBookBtn2.classList.toggle("disableButton")
        createdBookBtn2.prop("disabled", true);
    }
})