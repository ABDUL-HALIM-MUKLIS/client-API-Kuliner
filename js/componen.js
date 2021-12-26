document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instancessid = M.Sidenav.init(elems);

    var modal = document.querySelectorAll('.modal');
    var instancesmdl = M.Modal.init(modal);

    var slt = document.querySelectorAll('select');
    var instancesslc = M.FormSelect.init(slt);

    var clb = document.querySelectorAll('.collapsible');
    var instancescole = M.Collapsible.init(clb);

    document.querySelectorAll(".sidenav a, .topnav a").forEach(elm => {
        elm.addEventListener("click", evt => {
            let sideNav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sideNav).close();
            page = evt.target.getAttribute("href").substr(1);
            loadPage(page);
            console.log('1');
        })
    });
});