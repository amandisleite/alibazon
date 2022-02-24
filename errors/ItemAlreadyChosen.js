class ItemAlreadyChosen extends Error {
    constructor() {
        super('This item was already chosen by you.');
    
        this.name = 'ItemAlreadyChosen';
        this.errId = 3;
    }
}
  
module.exports = ItemAlreadyChosen;
  