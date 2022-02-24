class InvalidField extends Error {
    constructor(field) {
        super(
        `${field} is invalid`);
    
        this.name = 'InvalidField';
        this.errId = 1;
    }
}
  
module.exports = InvalidField;
  