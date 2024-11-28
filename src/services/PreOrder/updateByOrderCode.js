const PreOrderModel = require('../../models/preOrder');

module.exports = async (orderCode, updateData) => {
    try {
        const updatedOrder = await PreOrderModel.findOneAndUpdate(
            { orderCode },
            { $set: updateData },
            { new: true }
        );

        if (!updatedOrder) {
            throw new Error('Order with code ' + orderCode + ' not found');
        }

        return updatedOrder;
    } catch (error) {
        console.error('Failed to update order with code ' + orderCode + ':', error);
        throw error;
    }
};
