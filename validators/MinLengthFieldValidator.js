class MinFieldValidator {
    constructor(field, minSize) {
        this.field = field
        this.minSize = minSize
    }
    validate(data) {
        console.log("data[this.field].length < this.minSize", data[this.field].length < this.minSize)
        if (data[this.field].length < this.minSize) {
            return new Error(`O campo ${this.field} deve conter no mínimo ${this.minSize} caracteres.`)
        }
    }
}
module.exports = MinFieldValidator