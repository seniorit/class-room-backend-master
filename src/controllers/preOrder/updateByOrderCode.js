const preOrderServices = require('../../services/preOrder');

module.exports = async (req, res) => {
    const { orderCode } = req.params;
    const update = req.body;   
    try {
        const result = await preOrderServices.updateByOrderCode(orderCode, update);
        console.log('Pre-orders fetched successfully');
        res.status(200).json(result);
    } catch (error) {
        console.warn("Error in preOrder", error);
        console.log('Pre-orders fetching failed');
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
