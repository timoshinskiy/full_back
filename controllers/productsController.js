const db = require('../service/db');
const fs = require('fs');
const uid = require('uuid');
const Path = require('path');

class productsController {
    async getAdminProducts(req, res) {
        try {
            const username = req.params.username;
            const response = await db.query("SELECT * FROM products WHERE creator=$1", [username]);
            let data = response.rows;
            if (!data) {
                res.status(400).send("You don't have any products!");
                return;
            }
            res.status(203).json(data);
        } catch (e) {
            console.log(e)
            res.status(501).send('Server is brake!');
        }
    }

    async getProducts(req, res) {
        try {
            const response = await db.query("SELECT * FROM products");
            let data = await response.rows;
            if (!data) {
                res.status(400).send("You don't have any products!");
                return;
            }
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
            res.status(501).send(e.message);
        }
    }

    async editProduct(req, res) {
        try {
            let {id, name, description, full_description, price} = req.body;
            let arr = [name, description, full_description, price, id];
            const response = await db.query("UPDATE products SET name=$1, description=$2, full_description=$3, price=$4 WHERE id=$5", arr);
            res.status(201).send('Successfully update!');
        } catch (e) {
            console.log(e);
            res.status(501).send(e.message);
        }
    }

    async removeProduct(req, res) {
        try {
            const {id} = req.body;
            const response = await db.query("DELETE FROM products WHERE id=$1", [id])
            res.status(206).send('Successfully delete');
        } catch (e) {
            res.status(501).send(e.message);
        }
    }

    async getProduct(req, res) {
        try {
            const {id} = req.params;
            const response = await db.query("SELECT * FROM products WHERE id=$1", [id]);
            const data = await response.rows[0];
            console.log(data);
            if (!data) {
                res.status(401).send('Not found product info');
                return;
            }
            res.status(202).json(data);
        } catch (e) {
            console.log(e);
            res.status(501).send(e.message)
        }
    }

    async addProduct(req, res) {
        try {
            const file = req.files.file;
            const filename = uid.v4() + '.jpg';
            const filepath = Path.resolve(__dirname, '..', 'images', filename);
            await file.mv(filepath);
            const {name, description, full_description, price, creator} = req.body;
            const arr = [name, description, full_description, Number(price), creator, filename];
            const response = await db.query("INSERT INTO products ( name, description, full_description, price, creator, picture ) VALUES ( $1, $2, $3, $4, $5, $6 )", arr);
            console.log(response);
            res.status(201).send('Product have been created!');
        } catch (e) {
            console.log(e);
            res.status(501).send(e.message);
        }
    }

    async orderProduct(req, res) {
        try {
            const {id, email} = req.body;
            const arr = [email, id];
            const response = await db.query("UPDATE products SET ordered=true, orders_email=$1 WHERE id=$2", arr);
            res.status(207).send('Product have been ordered');
        } catch (e) {
            console.log(e);
            res.status(501).send(e.message);
        }
    }

    async getBasket(req, res) {
        try {
            const {email} = req.params;
            const response = await db.query('SELECT * FROM products WHERE orders_email=$1 AND ordered=true', [email]);
            const data = await response.rows;
            if (!data) {
                res.status(408).send('Basket is clear');
                return;
            }
            res.status(208).json(data);
        } catch (e) {
            console.log(e);
            res.status(501).send(e.message);
        }
    }

    async unOrderProduct(req, res) {
        try {
            const {id} = req.body;
            const response = await db.query("UPDATE products SET ordered=false, orders_email='' WHERE id=$1", [id]);
            res.status(210).send('Successfully remove from orders!');
        } catch (e) {
            res.status(501).send(e.message);
        }
    }
}

module.exports = new productsController();