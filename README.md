<p align="center" style="display: inline;"><a href="https://materializecss.com/" target="_blank"><img src="https://seeklogo.com/images/M/materialize-logo-0FCAD8A6F8-seeklogo.com.png" width="200"></a></p>

# Client API Resep
1. APi Server yang digunakan adalah refullAPI yang sebelumnya saya buat [Resep](https://github.com/ABDUL-HALIM-MUKLIS/CI-Resfull-API-Resep)

2. Membuat daftar Resep mengunakan metod GET
- resepurl = url mengakses resep
- hal = merupakan halaman
- fetchHeader = berisi headet terdapat Token
```
     fetch(resepurl+'?page='+hal, fetchHeader)
        .then(res => res.json())
        .then(data => {
            ... bagian ini bisa di lihat pada projek
        }).catch(err => {
            console.error(err);
        })
```
- Hasil Tampilan :
    <p align="center" style="display: inline;"><a href="/imgdemo/getall.jpeg" target="_blank"><img src="/imgdemo/getall.jpeg" width="600"></a></p>

3. Membuat tampilan menambah Resep dan di kirim dengan metod POST
- data = berisi pengambilan value pada inputan
- if = mengecek jika ada inputan kosong
- Pada fetch membawa data yang sudah di baca dan di kirim melalui body dengan mengunakan metod POST
```
     const data = {
			... bagian ini bisa di lihat pada projek
		};
    if ( ... bagian ini bisa di lihat pada projek
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
        })
        .catch(err => console.log(err));
    }
```
- Hasil Tampilan :
    <p align="center" style="display: inline;"><a href="/imgdemo/postdata.jpeg" target="_blank"><img src="/imgdemo/postdata.jpeg" width="600"></a></p>

3. Membuat tampilan Edit dan meng update dengan metod PUT berdasarkan ID
- Pada if else mengecek gambar dengan url lama atau baru
- Di kirim dengan Metod PUT
```
    var data = {
			... bagian ini bisa di lihat pada projek
		};
    if ( ... bagian ini bisa di lihat pada projek
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
```
- Hasil Tampilan :
    <p align="center" style="display: inline;"><a href="/imgdemo/edit.jpeg" target="_blank"><img src="/imgdemo/edit.jpeg" width="600"></a></p>

4. Pada tampilan Detail terdapat tombol Hapus Resep dengan metod DELETE dengan berdasarkan ID
- Menghapus dengan metod DELETE berdasarkan ID 
```
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
                getListResep(1);
            })
        .catch(err => console.log(err));
```
- Hasil Tampilan :
    <p align="center" style="display: inline;"><a href="/imgdemo/delete.jpeg" target="_blank"><img src="/imgdemo/delete.jpeg" width="600"></a></p>

5. Membuat Detail Resep dengan metod GET dengan berdasarkan ID
- pemangilan seperti point 1 tetapi berdasarkan ID
```
    fetch(resepurl+'?id='+id, fetchHeader)
        .then(res => res.json())
        .then(data => {
            ... bagian ini bisa di lihat pada projek
        }).catch(err => {
            console.error(err);
        })
```
- Hasil Tampilan :
    <p align="center" style="display: inline;"><a href="/imgdemo/getdetail.jpeg" target="_blank"><img src="/imgdemo/getdetail.jpeg" width="600"></a></p>

6. Membuat search berdasarkan asal kota masakan mengunakan metod GET
- pemangilan seperti point 1 tetapi berdasarkan asal
- search = adalah hasil inputan pada tag input
```
    fetch(resepurl+'?asal='+search, fetchHeader)
        .then(res => res.json())
        .then(data => {
            ... bagian ini bisa di lihat pada projek
        }).catch(err => {
            console.error(err);
        })
```
- Hasil Tampilan :
    <p align="center" style="display: inline;"><a href="/imgdemo/getbykota.jpeg" target="_blank"><img src="/imgdemo/getbykota.jpeg" width="600"></a></p>

### Lebih detail bisa lihat pada Project