import fs from 'node:fs/promises'

const databasePath = new URL('./database-data/db.json', import.meta.url)

export class Database {
    #database = {}

    constructor(){
        fs.readFile(databasePath, 'utf-8')
            .then(data => { 
                this.#database = JSON.parse(data)
            })
            .catch(() => {
                this.#persist()
            })
    }

    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }

    select(table) {
        const data = this.#database[table] ?? []

        return data;
    }

    findByID(table, id) {
        const rowIndex = Array(this.#database[table]).findIndex(row => row.id === id)
        const data = this.#database[table][rowIndex] ?? []

        if(rowIndex > -1) {
            return data;
        }
    }

    insert(table, data){
        if(Array.isArray(this.#database[table])){
            return this.#database[table].push(data)
        }else{
            this.#database[table] = [data]
        }

        this.#persist()
        return data;
    }

    update(table, data, id) {
        const rowIndex = Array(this.#database[table]).findIndex(row => row.id === id)

        if(rowIndex > -1) {
            this.#database[table][rowIndex] = {id, ...data }
            this.#persist()
        }
    }


    delete(table, id) {
        const rowIndex = Array(this.#database[table]).findIndex(row => row.id === id)

        if(rowIndex > -1) {
            this.#database[table].splice(rowIndex, 1)
            this.#persist()
        }
    }

}