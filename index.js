const mysql = require('./libs/mysql')
const config = require('./config')
const vimeworld = require('./libs/vimelibrary')

const core = require('./statsStorage')

const Storage = new core.Top(new vimeworld.Total(config.vimeworld.dev_token), new core.Storage(mysql))

async function start(){
    let info = await mysql.execute("SELECT * FROM info")

    if(info[0].month - Date.now()/1000 >= 1){
        console.log("</> До обнуления сбора информации: " + Math.floor(info[0].month - Date.now()/1000) + " секунд")
    }
    else {
        console.log("</> Новые сезон")

        await Storage.push("leaderboards_last_month")
        await mysql.execute("UPDATE info SET month = ?", [Math.floor(Date.now()/1000) + (60 * 60 * 24 * 7 * 29)])
    }

    info = await mysql.execute("SELECT * FROM info")
    setTimeout(async function () {
        await Storage.push("leaderboards_last_month")
    }, Math.floor(info[0].month - Date.now()/1000));
}

start()