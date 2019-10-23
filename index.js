const express = require('express')
const axios = require('axios')
const app = express()
const cheerio = require('cheerio')
const url = `http://ketqua.net/xo-so-truyen-thong.php?ngay=`
const index = require('./components/index')
// firebase
var admin = require('firebase-admin')
var serviceAccount = require("./soicau247-567bf-firebase-adminsdk-3p9te-eaea471ce1.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://soicau247-567bf.firebaseio.com"
})

var database = admin.firestore()

app.use(express.static('public'))

app.get('/', async function (req, res) {
    res.send(index)
})

app.listen(3000, function () {
    console.log('server start') 
})

function fTime(date) {
    return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
}

async function getUrlContent(url) {
    let res = await axios.get(url)
    return res.data
}

app.get('/today', async function (req, res) {
    let date = new Date()

    let content = await getUrlContent(url + fTime(date))
    const $ = cheerio.load(content)
    var ketqua = $('#result_tab_mb').find('td[rs_len]')
    
    let array = []
    for(let i = 0; i <ketqua.length; i++) {
        array[i] = $(ketqua[i]).text()
    }
    database.collection("results").doc(fTime(date)).set({
        prizes: array
    })

    // let content = await getUrlContent(url + fTime(date))
    // const $ = cheerio.load(content)
    // let array = []
    // var ketqua = $('#result_tab_mb').find('td[rs_len]')

    // for (let i = 0; i < ketqua.length; i++) {
    //     array[i] = $(ketqua[i]).text()
    // }

    let doc = await database.collection("results").doc(fTime(date)).get()
    if(doc.data() == undefined) {
        date.setDate(date.getDate() - 1)
        doc = await database.collection("results").doc(fTime(date)).get()
    }

    array = []
    for(let prize of doc.data().prizes) {
        array.push(prize)
    }

    let html = `
        <table class="table">
            <tr>
                <td>Đặc biệt</td>
                <td colspan="12">${array[0]}</td>
            </tr>
            
            <tr>
                <td>Nhất</td>
                <td colspan="12">${array[1]}</td>
            </tr>
            
            <tr>
                <td>Nhì</td>
                <td colspan="6">${array[2]}</td>
                <td colspan="6">${array[3]}</td>
            </tr>
            
            <tr>
                <td rowspan="2">Ba</td>
                <td colspan="4">${array[4]}</td>
                <td colspan="4">${array[5]}</td>
                <td colspan="4">${array[6]}</td>
            </tr>
            
            <tr>
                <td colspan="4">${array[7]}</td>
                <td colspan="4">${array[8]}</td>
                <td colspan="4">${array[9]}</td>
            </tr>

            <tr>
                <td>TƯ</td>
                <td colspan="3">${array[10]}</td>
                <td colspan="3">${array[11]}</td>
                <td colspan="3">${array[12]}</td>
                <td colspan="3">${array[13]}</td>
            </tr>

            <tr>
                <td rowspan="2">Năm</td>
                <td colspan="4">${array[14]}</td>
                <td colspan="4">${array[15]}</td>
                <td colspan="4">${array[16]}</td>
            </tr>
            
            <tr>
                <td colspan="4">${array[17]}</td>
                <td colspan="4">${array[18]}</td>
                <td colspan="4">${array[19]}</td>
            </tr>

            <tr>
                <td>Sáu</td>
                <td colspan="4">${array[20]}</td>
                <td colspan="4">${array[21]}</td>
                <td colspan="4">${array[22]}</td>
            </tr>

            <tr>
                <td>Bảy</td>
                <td colspan="3">${array[23]}</td>
                <td colspan="3">${array[24]}</td>
                <td colspan="3">${array[25]}</td>
                <td colspan="3">${array[26]}</td>
            </tr>
        </table>
    `
    res.send(html);
})