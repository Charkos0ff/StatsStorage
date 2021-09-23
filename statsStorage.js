class Storage {
    constructor(mysql) {
        this.mysql = mysql
    }

    async add(table, game, sort, list) {
        try {
            const strs = []
            for (const p of list) {
                strs.push(`('${p.username}', ${p.place}, '${game}', '${sort}')`)
            }

            await this.mysql.execute(`INSERT INTO ${table}(username, place, game, sort) VALUES ` + strs.join(','))
            return true
        } catch (e) {
            console.error(e)

            return false
        }
    }

    async clear(game, table) {
        return (game) ? this.mysql.execute("DELETE FROM ? WHERE `game` = ?", [table, game]) : this.mysql.execute("TRUNCATE ?", [table])
    }
}

class Top {
    constructor(vimeworld, storage) {
        this.vimeworld = vimeworld
        this.storage = storage
    }

    async push(table) {
        await this.storage.clear(null, table)
        const games = await this.getGames()

        for (const game of games) {
            const t = await this.getGame(game.game, game.sort)
            const p = []


            let i = 0
            for (const l of t.records) {
                i++
                const username = (l.user) ? l.user.username : l.username
                p.push({
                    username: username,
                    place: i
                })

            }

            if (config.debug) console.log(`${game.game}_${game.sort} ` + await this.storage.add(table, game.game, game.sort, p))
        }
    }

    async getGames() {
        const list = await this.vimeworld.Leaderboard.list();
        const games = []

        for (const g of list) {
            if (g.type === "guild") continue

            for (const sort of g.sort) {
                games.push({game: g.type, sort: sort})
            }
        }

        return games
    }

    async getGame(game, sort) {
        return await this.vimeworld.Leaderboard.get(game, sort, 1000)
    }
}

module.exports = {Storage, Top}