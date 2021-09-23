const axios = require("axios")

class Request {
    async get(url, token) {
        const req = await axios.get(url, {
            params: {
                token: token
            }
        });
        return req.data
    }

    async post(url, data) {
        const req = await axios.post(url, data, {dataType: 'json',});
        return req.data
    }
}


class User {
    constructor(token) {
        this.token = token
        this.requests = new Request()
    }

    /** Получение информации об игроке */
    async get(data, by) {
        if (!data || !by) return console.error("[VimeLibrary] Один из обязательных параметров отсутствует")
        switch (by) {
            case 'nick':
            case 'nickname':
            case 'username':
            case 'name':
                return this.requests.get(`https://api.vimeworld.ru/user/name/${data}`, this.token)
            case 'id':
                return this.requests.get(`https://api.vimeworld.ru/user/${data}`, this.token)
        }
    }

    /** Получение друзей игрока */
    async friends(data, by) {
        if (!data || !by) return console.error("[VimeLibrary] Один из обязательных параметров отсутствует")
        switch (by) {
            case 'nick':
            case 'nickname':
            case 'username':
            case 'name':
                return this.requests.get(`https://api.vimeworld.ru/user/name/${data}/friends`, this.token)
            case 'id':
                return this.requests.get(`https://api.vimeworld.ru/user/${data}/friends`, this.token)
        }
    }

    /** Получение сессии игрока */
    async session(data, by) {
        if (!data || !by) return console.error("[VimeLibrary] Один из обязательных параметров отсутствует")
        switch (by) {
            case 'nick':
            case 'nickname':
            case 'username':
            case 'name':
                return this.requests.get(`https://api.vimeworld.ru/user/name/${data}/session`, this.token)
            case 'id':
                return this.requests.get(`https://api.vimeworld.ru/user/${data}/session`, this.token)
        }
    }

    /** Очень массовое получение статуса (до 1000) */
    async sessionBig(data) {
        if (!data) return console.error("[VimeLibrary] Необходимо указать массив поиска")
        if (!data instanceof Array) return console.error("[VimeLibrary] Необходимо указать имеено МАССИВ поиска")
        return this.requests.post(`https://api.vimeworld.ru/user/session`, data)
    }

    /** Получение статистики игрока */
    async stats(data, by) {
        if (!data || !by) return console.error("[VimeLibrary] Один из обязательных параметров отсутствует")
        switch (by) {
            case 'nick':
            case 'nickname':
            case 'username':
            case 'name':
                return this.requests.get(`https://api.vimeworld.ru/user/name/${data}/stats`, this.token)
            case 'id':
                return this.requests.get(`https://api.vimeworld.ru/user/${data}/stats`, this.token)
        }
    }

    /** Получение достижений игрока */
    async achievements(data, by) {
        if (!data || !by) return console.error("[VimeLibrary] Один из обязательных параметров отсутствует")
        switch (by) {
            case 'nick':
            case 'nickname':
            case 'username':
            case 'name':
                return this.requests.get(`https://api.vimeworld.ru/user/name/${data}/achievements`, this.token)
            case 'id':
                return this.requests.get(`https://api.vimeworld.ru/user/${data}/achievements`, this.token)
        }
    }

    /** Получение топов игрока */
    async leaderboards(data, by) {
        if (!data || !by) return console.error("[VimeLibrary] Один из обязательных параметров отсутствует")
        switch (by) {
            case 'nick':
            case 'nickname':
            case 'username':
            case 'name':
                return this.requests.get(`https://api.vimeworld.ru/user/name/${data}/leaderboards`, this.token)
            case 'id':
                return this.requests.get(`https://api.vimeworld.ru/user/${data}/leaderboards`, this.token)
        }
    }

    /** Получение последних матчей игрока */
    async matches(data, by) {
        if (!data || !by) return console.error("[VimeLibrary] Один из обязательных параметров отсутствует")
        switch (by) {
            case 'nick':
            case 'nickname':
            case 'username':
            case 'name':
                return this.requests.get(`https://api.vimeworld.ru/user/name/${data}/matches`, this.token)
            case 'id':
                return this.requests.get(`https://api.vimeworld.ru/user/${data}/matches`, this.token)
        }
    }
}

class Online {
    constructor(token) {
        this.token = token
        this.requests = new Request()
    }

    /** Получение общего онлайна на MiniGames */
    async get() {
        return this.requests.get(`https://api.vimeworld.ru/online`, this.token)
    }

    /** Получение модераторов онлайн */
    async staff() {
        return this.requests.get(`https://api.vimeworld.ru/online/staff`, this.token)
    }

    /** Получение стримов онлайн */
    async streams() {
        return this.requests.get(`https://api.vimeworld.ru/online/streams`, this.token)
    }
}

class Misc {
    constructor(token) {
        this.token = token
        this.requests = new Request()
    }

    /** Возвращает информацию о токене */
    async getToken(data) {
        if (!data) return console.error("[VimeLibrary] Необходимо указать токен для просмотра")
        return this.requests.get(`https://api.vimeworld.ru/misc/token/${data}`)
    }

    /** Список всех возможных достижений */
    async achievements() {
        return this.requests.get(`https://api.vimeworld.ru/misc/achievements`, this.token)
    }

    /** Список карт, сгруппированный по играм */
    async maps() {
        return this.requests.get(`https://api.vimeworld.ru/misc/maps`, this.token)
    }

    /** Список игр, по которым ведется статистика */
    async games() {
        return this.requests.get(`https://api.vimeworld.ru/misc/games`, this.token)
    }
}

class Match {
    constructor(token) {
        this.token = token
        this.requests = new Request()
    }

    /** Полная информация о матче */
    async get(id) {
        return this.requests.get(`https://api.vimeworld.ru/match/${id}`, this.token)
    }

    /** Список последних матчей на сервере */
    async latest() {
        return this.requests.get(`https://api.vimeworld.ru/match/latest`, this.token)
    }

    /** Список матчей на сервере */
    async list() {
        return this.requests.get(`https://api.vimeworld.ru/match/list`, this.token)
    }
}

class Guild {
    constructor(token) {
        this.token = token
        this.requests = new Request()
    }

    /** Получает информацию о гильдии */
    async get(data, by) {
        if (!data || !by) return console.error("[VimeLibrary] Один из необходимых аргументов (data, by) отсутствует")
        switch (by) {
            case 'id':
                return this.requests.get(`https://api.vimeworld.ru/guild/get?id=${data}`, this.token)
            case 'name':
                return this.requests.get(`https://api.vimeworld.ru/guild/get?name=${data}`, this.token)
            case 'tag':
                return this.requests.get(`https://api.vimeworld.ru/guild/get?tag=${data}`, this.token)
            default:
                return console.error("[VimeLibrary] Неверный тип поиска, доступно: id, name, tag")
        }
    }

    /** Ищет гильдии по названию или тегу */
    async search(data) {
        if (!data) return console.error("[VimeLibrary] Необходимо указать ключевое слово/ключевые слова для поиска")
        return this.requests.get(`https://api.vimeworld.ru/guild/search?query=${data}`, this.token)
    }
}

class Locale {
    constructor(token) {
        this.token = token
        this.requests = new Request()
    }

    /** Человекочитаемые названия игр, статистики, рангов */
    async get(parts) {
        if (!parts) parts = `games,game_stats,ranks`
        return this.requests.get(`https://api.vimeworld.ru/locale/ru?parts=${parts}`, this.token)
    }
}

class Leaderboard {
    constructor(token) {
        this.token = token
        this.requests = new Request()
    }

    /** Список таблиц рекордов */
    async list() {
        return this.requests.get(`https://api.vimeworld.ru/leaderboard/list`, this.token)
    }

    /** Возвращает таблицу рекордов */
    async get(type, sort, size, offset) {
        if (!size) size = 100
        if (!offset) offset = 0

        return this.requests.get(`https://api.vimeworld.ru/leaderboard/get/${type}/${sort}?size=${size}&offset=${offset}`, this.token)
    }
}

class Total {
    constructor(token) {
        this.User = new User(token)
        this.Online = new Online(token)
        this.Misc = new Misc(token)
        this.Locale = new Locale(token)
        this.Guild = new Guild(token)
        this.Match = new Match(token)
        this.Leaderboard = new Leaderboard(token)
    }
}

module.exports = {User, Online, Misc, Locale, Match, Guild, Leaderboard, Total}