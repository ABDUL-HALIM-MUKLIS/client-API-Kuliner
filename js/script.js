const ApiKey = "resep-mie-kocok";
// const ApiKey = "b9c2502a91124146b89478b7c2509b71";
// const baseUrl = "https://api.football-data.org/v2/";
// const leagueId = "2021";
const baseUrl = 'https://api-mobilespecs.azharimm.site';
const brandurl = `${baseUrl}/v2/brands/`;
// const baseEndPoin = `${baseUrl}competitions/${leagueId}`;
// const teamEndPoin = `${baseUrl}competitions/${leagueId}/teams`;
// const standingEndPoin = `${baseUrl}competitions/${leagueId}/standings`;
// const matchEndPoin = `${baseUrl}competitions/${leagueId}/matches`;

const contents = document.querySelector("#content-list");
const title = document.querySelector(".card-title");
// const fetchHeader = {
//     headers: {
//         'X-Auth-Token': null
//     }
// };



function getListResep() {

    title.innerHTML = "Daftar Brand Smartphone"
    fetch(brandurl)
        .then(res => res.json())
        .then(data => {
            console.log(data);

            let databrand = "";
            data.data.forEach(brand => {
                // console.log(brand);
                databrand += `
                
                <div class="col s12 m2">
                  <div class="card blue lighten-5 center-align" style="padding:5px;">
                    <span class="title">${brand.brand_name}</span>
                    <a href="#${brand.brand_slug}" data-id="${brand.brand_slug}" class="secondary-content" ><i data-id="${brand.brand_slug}" class="material-icons" >info</i></a>
                  </div>
                </div>
              
                `
            });
            contents.innerHTML = '<div class="row">' + databrand + '</div>';
            const detil = document.querySelectorAll('.secondary-content');
            detil.forEach(btn => { 
                btn.onclick = (e) => {
                    // loadPage(e.target.dataset.id);
                    showPhoneInfo(e.target.dataset.id);
                    // console.log(e.target.dataset.id);
                }
            })
        }).catch(err => {
            console.error(err);
        })
}

function showPhoneInfo(id) {
    let url = brandurl + id;
    // console.log(url)
    fetch(url)
        .then(response => response.json())
        .then(data => {
            title.innerHTML = data.data.title
            //  phone yang di ikuti
            let phones = "";
            data.data.phones.forEach(phone => {
                phones += `
                <div class="col s12 m4">
                <div class="card">
                    <div class="card-image waves-effect waves-block waves-light">
                        <img class="activator" src="${phone.image}">
                    </div>
                    <div class="card-content">
                        <span class="card-title activator grey-text text-darken-4">${phone.phone_name}</span>
                        <p><a href="#${phone.slug}" data-id="${phone.slug}" class="detail">Lihat Spesifikasi..</a></p>
                    </div>
                </div>
                </div>
                `;
            });
            //--------------------------------
            
            //content utama
            contents.innerHTML = `
                <div class="row">
                    ${phones}
                </div>
            `;
            //------------------------------
            const detil = document.querySelectorAll('.detail');
            detil.forEach(btn => { 
                btn.onclick = (e) => {
                    // loadPage(e.target.dataset.id);
                    showPhoneSpec(e.target.dataset.id);
                    // console.log(e.target.dataset.id);
                }
            })

        }).catch(err => {
            // console.error(err);
            console.log(err);
        })
        
}

function showPhoneSpec(id) {
    let urlspc = baseUrl +'/v2/'+ id;
    // console.log(urlspc)
    fetch(urlspc)
        .then(response => response.json())
        .then(data => {
            title.innerHTML = data.data.phone_name

            //  Spesifikasi network yang di ikuti
            let spec = '';
            data.data.specifications.forEach(spesifikasi => {
                spec += `
                <table class="striped">
                    <thead>
                        <tr>
                        <th>${spesifikasi.title}</th>
                        <th>Spesifikasi</th>
                        </tr>
                    </thead>
                <tbody>`;
                // console.log(spesifikasi.title);
                spesifikasi.specs.forEach(spes => {
                    // console.log(spes.key);
                    spec += `
                    <tr>
                        <td>${spes.key}</td>
                        <td>${spes.val}</td>
                    </tr>
                    `;
                });
                    spec += `
                    </tbody>
                    </table>`;
            });
            //--------------------------------
            // gambar
            let image = '';
            data.data.phone_images.forEach(element => {
                image += `
                
                    <div class="col">
                        <img src="${element}" style="width:250px;">
                    </div>
                
                `;
            });
            //--------------------------------



            //content utama
            contents.innerHTML = `
            <div class="row">
            ${image}
            </div>

            ${spec}
            `;
            //------------------------------
        }).catch(err => {
            // console.error(err);
            console.log(err);
        })
        
}

function loadPage(page) {
    switch (page) {
        case "brand":
            getListResep();
            break;
        case page:
            showPhoneInfo(page);
            break;

    }


}

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);

    document.querySelectorAll(".sidenav a, .topnav a").forEach(elm => {
        elm.addEventListener("click", evt => {
            let sideNav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sideNav).close();
            page = evt.target.getAttribute("href").substr(1);
            loadPage(page);
        })
    })
    var page = window.location.hash.substr(1);
    if (page === "" || page === "!") page = "brand";
    loadPage(page);
});

