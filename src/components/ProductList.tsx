import  { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getProducts } from '../services/api';

interface Product {
    id: number;
    name: string;
}

const ProductList = () => {
    const { state } = useContext(AuthContext)!;
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts(state.token!);
                setProducts(data);
            } catch (error) {
                console.error('Failed to fetch products', error);
            }
        };

        fetchProducts();
    }, [state.token]);

    return (
        <div>
            <h2>Product List</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>{product.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
