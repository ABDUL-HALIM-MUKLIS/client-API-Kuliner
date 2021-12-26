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

    document.getElementById('collapsible').style.display = "block";
    document.getElementById('pemanis').style.display = "block";
    title.innerHTML = `
                        <div class="row">
                            <form class="col s12">
                            <div class="row">
                                <div class="col s6">
                                    <h4>Daftar Resep</h4>
                                </div>
                                <div class="input-field col s6">
                                    <form onsubmit="return false">
                                        <i class="material-icons prefix">search</i>
                                        <input id="search" type="text" class="validate search">
                                        <label for="search">Cari Kota</label>
                                    </form>
                                </div>
                            </div>
                            </form>
                        </div>`
    fetch(resepurl+'?page='+hal, fetchHeader)
        .then(res => res.json())
        .then(data => {
            console.log(data);

            let reseps = "";
            data.data.forEach(resep => {
                reseps += `
                    <div class="col s12 m4">
                        <div class="card">
                            <div class="card-image waves-effect waves-waves-light">
                                <img class="activator" src="${resep.gambar}" alt="coba">
                                <span class="card-title">${resep.nama_kuliner}</span>
                            </div> 
                            <div class="card-content">
                                <div class="card-content">
                                    <p>${resep.kategori} Khas ${resep.asal}</p>
                                </div> 
                                <div class="card-action">
                                    <a href="#id=${resep.id}" data-id="${resep.id}" class="detail waves-effect waves-light btn"> Lihat.. </a>
                                    
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
                        <li class="active"><a href="#page=`+index+`" data-id="`+index+`" class="pgcg">`+index+`</a></li>
                    `;
                } else {
                    pages += `
                        <li class="waves-effect"><a href="#page=`+index+`" data-id="`+index+`" class="pgcg">`+index+`</a></li>
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
                    getListResep(e.target.dataset.id);
                }
            })
            // detail
            const detil = document.querySelectorAll('.detail');
            detil.forEach(btn => {
                btn.onclick = (e) => {
                    detailResep(e.target.dataset.id, hal);
                }
            })
            //seatch
            const asd = document.querySelectorAll('.search');
            asd.forEach(btn => {
                btn.onchange = (e) => {
                    getasalResep(document.querySelector('#search').value,hal);
                }
            })
        }).catch(err => {
            console.error(err);
        })
}

function getasalResep(search,hal) {
    document.getElementById('collapsible').style.display = "block";
    document.getElementById('pemanis').style.display = "block";
    title.innerHTML = `
                        <div class="row">
                            <form class="col s12">
                            <div class="row">
                                <div class="col s6">
                                    <h4>Daftar Resep</h4>
                                </div>
                                <div class="input-field col s6">
                                <i class="material-icons prefix">search</i>
                                <input id="search" type="text" class="validate">
                                <label for="search">Cari Kota</label>
                                </div>
                            </div>
                            </form>
                        </div>`
    fetch(resepurl+'?asal='+search, fetchHeader)
        .then(res => res.json())
        .then(data => {
            console.log(data);

            let reseps = "";
            data.data.forEach(resep => {
                reseps += `
                    <div class="col s12 m4">
                        <div class="card">
                            <div class="card-image waves-effect waves-waves-light">
                                <img class="activator" src="${resep.gambar}" alt="coba">
                                <span class="card-title">${resep.nama_kuliner}</span>
                            </div> 
                            <div class="card-content">
                                <div class="card-content">
                                    <p>${resep.kategori} Khas ${resep.asal}</p>
                                </div> 
                                <div class="card-action">
                                    <a href="#id=${resep.id}" data-id="${resep.id}" class="detail waves-effect waves-light btn"> Lihat.. </a>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                `
            });

            // Content resep
            contents.innerHTML = `
            <div class="row">` + reseps + `</div>
            `;
            // detail
            const detil = document.querySelectorAll('.detail');
            detil.forEach(btn => {
                btn.onclick = (e) => {
                    detailResep(e.target.dataset.id, hal);
                }
            })
            //seatch
            const asd = document.querySelectorAll('.search');
            asd.forEach(btn => {
                btn.onchange = (e) => {
                    getasalResep(document.querySelector('#search').value);
                }
            })
        }).catch(err => {
            console.error(err);
        })
}

function postResep(){
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
                    'Content-type': 'application/json'
                },
                body : JSON.stringify(data)			
            }
        )
        .then(res => res.json())
        .then(teks => {
            alert(teks.msg);
            document.getElementById('colbody').style.display = "none";
            document.getElementById('colats').classList.remove('active');
            
        })
        .catch(err => console.log(err));
    }
    
}

function detailResep(id,hal){
    window.localStorage.setItem('hal', JSON.stringify(hal));
    document.getElementById('collapsible').style.display = "none";
    document.getElementById('pemanis').style.display = "none";
    fetch(resepurl+'?id='+id, fetchHeader)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            title.innerHTML = `<h1 class="center-align">${data.data[0].nama_kuliner}</h1>`;
                contents.innerHTML = `
                        <div class="teal-text text-darken-3" style="display: flex;justify-content: center;align-items: center; margin-bottom:20px;">
                            <div style="margin-right:20px;"><i class="material-icons left">access_time</i>${data.data[0].durasi} Menis</div> 
                            <div style="margin-right:20px;"><i class="material-icons left">room_service</i>${data.data[0].porsi} Porsi</div>
                            <div style="margin-right:20px;"><i class="material-icons left">local_dining</i>${data.data[0].kategori}</div>
                            <div style="margin-right:20px;"><i class="material-icons left">account_balance</i>${data.data[0].asal}</div>
                        </div>
                        <div class="teal-text text-darken-3" style="display: flex;justify-content: center;align-items: center; margin-bottom:20px;">
                            <div style="margin-right:20px;">Diupload pada ${data.data[0].created_at}</div>
                        </div>
                        <div id="untukimg"></div>
                        
                        <a class="waves-effect waves-accent-3 yellow btn upresep" data-id="`+id+`" href="#update=`+id+`"><i class="material-icons left">edit</i>Ubah Resep</a>
                        <a class="waves-effect waves-accent-3 red btn delresep"  data-id="`+id+`"><i class="material-icons left">delete</i>Hapus Resep</a>
                        <a class="waves-effect waves-darken-3 green btn kembali" href="#page=`+hal+`" data-id="`+hal+`"><i class="material-icons left">arrow_back</i>Kembali</a>
                        <div style="margin-top:20px;">
                            ${data.data[0].bahan}
                        </div>
                        <div style="margin-top:20px;">
                            ${data.data[0].resep}
                        </div>
                `;
            document.getElementById('untukimg').style.backgroundImage = "url("+data.data[0].gambar+")";

            const del = document.querySelectorAll('.delresep');
            del.forEach(btn => {
                btn.onclick = (e) => {
                    if (confirm("Apakah inggin hapus data ?") == true) {
                        // console.log(e.target.dataset.id);
                        deleteResep(e.target.dataset.id,hal);
                        } else {
                        console.log('tidak');
                        }
                }
            })

            const upd = document.querySelectorAll('.upresep');
            upd.forEach(btn => {
                btn.onclick = (e) => {
                    updateResep(e.target.dataset.id,hal);
                }
            })

            const kem = document.querySelectorAll('.kembali');
                kem.forEach(btn => {
                    btn.onclick = (e) => {
                        getListResep(e.target.dataset.id);
                    }
                })
        }).catch(err => {
            console.error(err);
        })
}

function updateResep(idup,hal){
    window.localStorage.setItem('hal', JSON.stringify(hal));
    document.getElementById('collapsible').style.display = "none";
    document.getElementById('pemanis').style.display = "none";
    fetch(resepurl+'?id='+idup, fetchHeader)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            title.innerHTML = `
            <div class="row">
                <div class="input-field col s12">
                    <input value="${data.data[0].nama_kuliner}" id="nama_kuliner1" type="text" class="validate">
                    <label class="active" for="nama_kuliner1">Nama Kuliner</label>
                </div>
            </div>
                `;
                contents.innerHTML = `
                        <div class="teal-text text-darken-3 row" style="display: flex;justify-content: center;align-items: center; margin-bottom:20px;">

                            <div class="input-field col s2">
                                <input value="${data.data[0].durasi}" id="durasi1" type="number" class="validate">
                                <label class="active" for="durasi1"><i class="material-icons left">access_time</i>durasi memasak</label>
                            </div>
                            <div class="input-field col s2">
                                <input value="${data.data[0].porsi}" id="porsi1" type="number" class="validate">
                                <label class="active" for="porsi1"><i class="material-icons left">room_service</i>jumlah porsi</label>
                            </div>
                            <div class="input-field col s2">
                                <select id="kategori1">
                                    <option value="${data.data[0].kategori}" selected disabled>${data.data[0].kategori}</option>
                                    <option value="Makanan">Makanan</option>
                                    <option value="Minuman">Minuman</option>
                                </select>
                                <label class="active" for="kategori1"><i class="material-icons left">local_dining</i>Kategori</label>
                            </div>
                            <div class="input-field col s2">
                                <input value="${data.data[0].asal}" id="asal1" type="text" class="validate">
                                <label class="active" for="asal1"><i class="material-icons left">account_balance</i>Asal Kuliner</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <input value="${data.data[0].gambar}" id="gambarold" type="url" class="validate" hidden>
                                <input value="${data.data[0].gambar}" id="gambar1" type="url" class="validate">
                                <label class="active" for="gambar1">link gambar</label>
                            </div>
                        </div>
                        <div id="untukimg"></div>
                        
                        <a class="waves-effect waves-darken-3 blue btn putresep" data-id="`+idup+`"><i class="material-icons left">edit</i>Update</a>
                        <a class="waves-effect waves-darken-3 green btn kembali" href="#id=`+idup+`" data-id="`+idup+`"><i class="material-icons left">arrow_back</i>Kembali</a>
                        
                        <div class="input-field col s12">
                            <p>Masukkan langkah-langkah resep pembuatan</p>
                            <input id="bahan1" type="hidden" name="bahan1" value="${data.data[0].bahan}">
                                <trix-editor input="bahan1"></trix-editor>
                        </div>

                        <div class="input-field col s12">
                            <p>Masukkan langkah-langkah resep pembuatan</p>
                            <input id="resep1" type="hidden" name="resep1" value="${data.data[0].resep}">
                            <trix-editor input="resep1"></trix-editor>
                        </div>
                `;
                document.getElementById('untukimg').style.backgroundImage = "url("+data.data[0].gambar+")";
                document.getElementById('kategori1').style.display = "inline";

                const pud = document.querySelectorAll('.putresep');
                pud.forEach(btn => {
                    btn.onclick = (e) => {
                        putResep(e.target.dataset.id,hal);
                    }
                })
                const kem = document.querySelectorAll('.kembali');
                kem.forEach(btn => {
                    btn.onclick = (e) => {
                        detailResep(e.target.dataset.id,hal);
                    }
                })
        }).catch(err => {
            console.error(err);
        })
}

function putResep(putid,hal){
    const gambar = document.querySelector('#gambarold').value;
    var data = {
			'nama_kuliner' : document.querySelector('#nama_kuliner1').value,
			'asal' : document.querySelector('#asal1').value,
			'kategori' : document.querySelector('#kategori1').value,
			'gambar' : document.querySelector('#gambar1').value,
			'durasi' : document.querySelector('#durasi1').value,
			'porsi' : document.querySelector('#porsi1').value,
			'bahan' : document.querySelector('#bahan1').value,
			'resep' : document.querySelector('#resep1').value,
            'id' : putid
		};
    if (data.nama_kuliner == "" ||  data.asal == "" || data.kategori == "" || data.gambar == "" || data.durasi == "" || data.porsi == "" || data.bahan == "" || data.resep == "") {
        alert("Data tidak boleh kososong");
        return false;
    }else if (data.gambar == gambar){
        console.log('gambar sama');
        fetch(resepurl,{
                method : 'PUT',
                headers: {
                    'API-TOKEN': '13412352135235234',
                    'Content-type': 'application/json'
                },
                body : JSON.stringify(data)			
            }
        )
        .then(res => res.json())
        .then(teks => alert(teks.msg))
        .catch(err => console.log(err));
    }else {
        console.log('gambar berbeda');
        databaru = {
            'gambar' : gambar
        }
        Object.assign(databaru, data);
        fetch(resepurl,{
                method : 'PUT',
                headers: {
                    'API-TOKEN': '13412352135235234',
                    'Content-type': 'application/json'
                },
                body : JSON.stringify(databaru)			
            }
        )
        .then(res => res.json())
        .then(teks => alert(teks.msg))
        .catch(err => console.log(err));
    }
    detailResep(putid,hal);
}

function deleteResep(idhapus,hal) {
    fetch(resepurl,{
                method : 'DELETE',
                headers: {
                    'API-TOKEN': '13412352135235234',
                    'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                body : new URLSearchParams({
                    'id': idhapus,
                })
            }
        )
        .then(res => res.json())
        .then(teks => {
                alert(teks.msg);
                getListResep(hal);
            })
        .catch(err => console.log(err));
}


function loadPage(page) {
    switch (page) {
        case "reseps":
            getListResep(1);
            // console.log('masuk')
            break;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // melihat url
    var page = window.location.hash.substr(1);
    var pagehal = window.location.hash.substr(6);
    var pagno = window.location.hash.substr(1,5);
    var det = window.location.hash.substr(1,3);
    var detid = window.location.hash.substr(4);
    var upd = window.location.hash.substr(1,7);
    var updid = window.location.hash.substr(8);

    // menyimpan halaman awal
    var halaman = JSON.parse(window.localStorage.getItem('hal'));

    // cek url ketika di refresh
    if (pagno === "page=") getListResep(pagehal) ,console.log('6');
    if (upd === "update=") updateResep(updid,halaman) ,console.log('5');
    if (det === "id=") detailResep(detid,halaman) ,console.log('4');
    if (page === "" || page === "!" || page === "reseps") loadPage("reseps"),console.log('3') ;
    
    // buton post
    document.querySelector('#kirim').addEventListener('click',function(e)
    {
        postResep();
        
    });

});