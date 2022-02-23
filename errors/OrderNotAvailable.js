class OrderNotAvailable extends Error {
    constructor() {
      super('There are no orders in your history yet.');
  
      this.name = 'OrderNotAvailable';
      this.errId = 2;
    }
  }
  
  module.exports = OrderNotAvailable;
  