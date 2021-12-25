const baseUrl = 'http://localhost/ci-rest/index.php';
const resepurl = `${baseUrl}/resep`;
const contents = document.querySelector("#content-list");
const title = document.querySelector(".card-title");
const fetchHeader = {
    headers: {
        'API-TOKEN': '13412352135235234',
    }
};

function getListResep(hal) {

    title.innerHTML = `Daftar Resep`
    fetch(resepurl+'?page='+hal, fetchHeader)
        .then(res => res.json())
        .then(data => {
            console.log(data);

            let reseps = "";
            data.data.forEach(resep => {
                reseps += `
                    <div class="col s12 m3">
                        <div class="card">
                            <div class="card-image waves-effect waves-waves-light">
                                <img class="activator" src="${resep.gambar}">
                                <span class="card-title">${resep.nama_kuliner}</span>
                            </div> 
                            <div class="card-content">
                                <div class="card-content">
                                    <p>${resep.kategori} Khas ${resep.asal}</p>
                                </div> 
                                <div class="card-action">
                                    <a href="#id${resep.id}" data-id="${resep.id}" class="detail"> Lihat.. </a>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            });
            //pagination
            let pages = "";
            for (let index = 1; index < data.total_page + 1; index++) {
                if (index == data.page) {
                    pages += `
                        <li class="active"><a href="#`+index+`" data-id="`+index+`" class="pgcg">`+index+`</a></li>
                    `;
                } else {
                    pages += `
                        <li class="waves-effect"><a href="#`+index+`" data-id="`+index+`" class="pgcg">`+index+`</a></li>
                    `;
                }
            }

            // Content resep
            contents.innerHTML = `
            <div class="row">` + reseps + `</div>
            <ul class="pagination">
                <li class="disabled"><i class="material-icons">chevron_left</i></li>
                `+ pages +`
                <li class="disabled"><i class="material-icons">chevron_right</i></li>
            </ul>
            `;

            //pagination
            const pagechange = document.querySelectorAll('.pgcg');
            pagechange.forEach(btn => {
                btn.onclick = (e) => {
                    // loadPage(e.target.dataset.id);
                    getListResep(e.target.dataset.id);
                    // console.log(e.target.dataset.id);
                }
            })
            // detail
            const detil = document.querySelectorAll('.detail');
            detil.forEach(btn => {
                btn.onclick = (e) => {
                    // loadPage(e.target.dataset.id);
                    // showPhoneInfo(e.target.dataset.id);
                    console.log(e.target.dataset.id);
                }
            })
        }).catch(err => {
            console.error(err);
        })
}

function addResep(){

    const data = {
			'nama_kuliner' : document.querySelector('#nama_kuliner').value,
			'asal' : document.querySelector('#asal').value,
			'kategori' : document.querySelector('#kategori').value,
			'gambar' : document.querySelector('#gambar').value,
			'durasi' : document.querySelector('#durasi').value,
			'porsi' : document.querySelector('#porsi').value,
			'bahan' : document.querySelector('#bahan').value,
			'resep' : document.querySelector('#resep').value,
		};
    if (data.nama_kuliner == "" ||  data.asal == "" || data.kategori == "" || data.gambar == "" || data.durasi == "" || data.porsi == "" || data.bahan == "" || data.resep == "") {
        alert("Data tidak boleh kososong");
        return false;
    }else{
        fetch(resepurl,{
                method : 'POST',
                headers: {
                    'API-TOKEN': '13412352135235234',
                    'Content-type' : 'application/json'
                },
                body : JSON.stringify(data)			
            }
        )
        .then(res => res.text())
        .then(teks => console.log(teks[msg]))
        .catch(err => console.log(err[msg]));
    }

        // console.log(data);

		

}

function loadPage(page) {
    switch (page) {
        case "reseps":
            getListResep(1);
            break;

    }
}

document.addEventListener('DOMContentLoaded', function () {
    var page = window.location.hash.substr(1);
    var pagech = parseInt(page);
    if (page === "" || page === "!") page = "reseps";
    if (typeof pagech == "number") getListResep(page);
    loadPage(page);

    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);

    var modal = document.querySelectorAll('.modal');
    var instances = M.Modal.init(modal);

    var slt = document.querySelectorAll('select');
    var instances = M.FormSelect.init(slt);

    var clb = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(clb);

    document.querySelectorAll(".sidenav a, .topnav a").forEach(elm => {
        elm.addEventListener("click", evt => {
            let sideNav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sideNav).close();
            page = evt.target.getAttribute("href").substr(1);
            loadPage(page);
        })
    });
    // buton post
    document.querySelector('#kirim').addEventListener('click',function(e)
	{
		addResep();		
	});

});