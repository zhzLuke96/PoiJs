import { Poi } from '../../../../src/poi/poi';
import { h } from '../../../../src/tools/html';
import { productState, products } from '../store/product';
import { cart } from '../store/cart';

import productListTpl from "./ProductListTpl.html"

export default class ProductList extends Poi {
    setup() {
        return {
            get products() {
                return productState.all
            }
        }
    }
    template(): string {
        return h(productListTpl)
    }
    addProductToCart(product) {
        cart.dispatch("addProductToCart", product)
    }
    created() {
        products.dispatch("getAllProducts")
    }
}
