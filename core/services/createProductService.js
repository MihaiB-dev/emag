import db from '../../models/index.js';
import { findOrCreateTag } from '../repositories/tagsRepository.js';

export const createProduct = async (product, context) => {
    const createdProduct = await db.Product.create({
        name: product.name,
        description: product.description,
        picture: product.picture,
        price: product.price,
        productCode: product.productCode,
        stock: product.stock,
        producerId: context.user_id,
     });

     const tag = await findOrCreateTag(product.tag);
     await createdProduct.setTag(tag);

     return createdProduct;
}