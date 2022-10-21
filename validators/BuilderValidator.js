const EmptyFieldValidator = require('./EmptyFieldValidator')
const MinLengthFieldValidator = require('./MinLengthFieldValidator')

class BuilderValidator {

    constructor(dataType) {
        this.dataType = dataType
        this.validators = []

        for (const [key, value] of Object.entries(this.dataType)) {
            if (value.required) {
                this.validators.push(new EmptyFieldValidator(key))
            }

            if (value.minLength) {
                this.validators.push(new MinLengthFieldValidator(key, value.minLength))
            }
        }
    }

    validate(data) {
        for (const validator of this.validators) {
            const error = validator.validate(data)
            if (error) {
                return error
            }
        }
    }
}

module.exports = BuilderValidator