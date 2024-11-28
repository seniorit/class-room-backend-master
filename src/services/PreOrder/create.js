const PreOrderModel = require('../../models/preOrder')
 
module.exports = async (newOrder) => {

      try {
        return await PreOrderModel.create(newOrder);
      } catch (error) {
        throw new Error(error);
      }
}