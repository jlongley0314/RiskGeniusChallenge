'use strict';
module.exports = function(app) {
    var controller = require('../controllers/receiptsController');

    // ReceiptsGenius Routes
    app.route('/receipts')
        .get(controller.get_all_receipts)
        .post(controller.create_receipt);


    app.route('/receipts/:receiptsId')
        .get(controller.read_receipt)
        .put(controller.update_receipt)
        .delete(controller.delete_receipt);
};