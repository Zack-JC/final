function searchNews() {
    // Obtain keywords entered by users
    var keyword = document.getElementById('keyword').value;
    //Prevent jumping to the data page returned by the API
    event.preventDefault();
    // Sending requests to the server
    $.ajax({
        url: '/getnews',
        method: 'POST',
        data: { keyword: keyword },
        success: function () {
            //Jump to the designated webpage displaying news
            window.location.href = '/show';
        },
        error: function (error) {
            console.error(error);
        }
    });
}
//add event listener
document.querySelector('form').addEventListener('submit', searchNews);
