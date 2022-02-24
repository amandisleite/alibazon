class ItemOutOfStock extends Error {
    constructor() {
        super('This item is out of stock. We apologize.');
    
        this.name = 'ItemOutOfStock';
        this.errId = 4;
    }
}
  
module.exports = ItemOutOfStock;
  