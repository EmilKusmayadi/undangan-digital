const apikey =  ''
const url = ``

const ul = document.getElementById('commend')
const info = document.getElementById('info')
const inputNama = document.getElementById('inputNama')
const inputPesan = document.getElementById('inputPesan')
const buttonSend = document.getElementById('buttonSend')

let _allComments = []

async function loadComments() {
    ul.innerHTML = '<p>Loading...</p>'
    try {
        const getComments = await GET()
        const result = getComments.map(commend => `<li> <h3>${commend.nama}</h3> <p>${commend.komentar}</p> </li>`)
        ul.innerHTML = result.join('')
        getComments.every(commend => _allComments.push({nama: commend.nama, komentar: commend.komentar }) )
        if (_allComments < 1) {
            ul.innerHTML = '<p>Belum ada komentar.</p>'
        }
    } catch (error) {
        ul.innerHTML = `<p>Maaf, ada kesalahan saat mengambil komentar.</p>`
        console.log({error});
    }
}

loadComments() 


async function GET() {
    try {
        const result = await fetch('https://komentar-e573.restdb.io/rest/comment', {
            headers: {
                'Content-Type': 'application/json',
                'x-apikey': '64d78fbca3ea46607b978d49'
            },
            mode: 'cors',
            method: 'GET' 
        });
        const comments = await result.json()
        console.log(comments);
        return comments
    } catch (error) {
        console.log({error});
        return false;
    }
}

async function POST() {
    const nama = inputNama.value
    const komentar = inputPesan.value
    if (!nama || !komentar) return info.textContent = 'Nama dan komentar harus di isi.' 
    buttonSend.setAttribute('disabled', '')
    try {
        const response = await fetch('https://komentar-e573.restdb.io/rest/comment', {
            headers: {
                'Content-Type': 'application/json',
                'x-apikey': '64d78fbca3ea46607b978d49'
            },
            method: 'POST', 
            mode: 'cors',
            body: JSON.stringify({
                nama: nama,
                komentar: komentar,
                tanggal: String(Date.now())
            })
        });
        const responseJson = await response.json();
        console.log(responseJson);
        info.textContent = 'Pesan dikirim.'
        loadComments()
        setTimeout(() => {
            info.textContent = ''
        }, 3000)
        inputNama.value = ''
        inputPesan.value = ''
        buttonSend.removeAttribute('disabled')
    } catch (error) {
        console.log({error});
        info.textContent = 'Pesan gagal dikirim.'
        buttonSend.removeAttribute('disabled')
        setTimeout(() => {
            info.textContent = ''
        }, 3000)
        return false;
    }
}