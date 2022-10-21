class EmptyFieldValidator {
    constructor(field) {
        this.field = field
    }
    validate(data) {
        if (!data[this.field]) {
            return new Error(`O campo ${this.field} é obrigatório`)
        }
    }
}
module.exports = EmptyFieldValidator