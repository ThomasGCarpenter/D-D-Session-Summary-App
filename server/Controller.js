const mongoose = require("./db-config");

const CustomerSchema = mongoose.model("User");

class Controller {
    constructor() {
        this.insertCustomer = function (data) {
            return new Promise(function (resolve, reject) {
                CustomerSchema.save(data)
                    .then(function () {
                        resolve({
                            status: 200, message: "Customer inserted Successfully"
                        });
                    })
                    .catch(function (err) {
                        reject({
                            status: 500, message: "Error " + err
                        });
                    });
            });
        };



        this.updateCustomer = function (id, data) {
            return new Promise((resolve, reject) => {
                CustomerSchema.update({ _id: id }, data)
                    .then(() => {
                        resolve({ status: 200, message: "Customer updated Successfully" });
                    })
                    .catch(function (err) {
                        reject({ status: 500, message: err });
                    });
            });
        };

        this.searchAll = function () {
            return new Promise(function (resolve, reject) {
                CustomerSchema.find()
                    .exec()
                    .then(function (data) {
                        resolve({ status: 200, message: data });
                    })
                    .catch(function (err) {
                        reject({ status: 500, message: err });
                    });
            });
        };

        this.search = function (id) {
            return new Promise(function (resolve, reject) {
                CustomerSchema.find({ _id: id })
                    .exec()
                    .then(function (Customer) {
                        resolve({ status: 200, message: Customer });
                    })
                    .catch((err) => {
                        reject({ status: 500, message: err });
                    });
            });
        };

        this.delete = function (id) {
            return new Promise(function (resolve, reject) {
                CustomerSchema.remove({ _id: id })
                    .then(() => {
                        resolve({ status: 200, message: "Customer Removed" });
                    })
                    .catch((err) => {
                        reject({ status: 500, message: err });
                    });
            });
        };
    }
}


module.exports = new Controller();