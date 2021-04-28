import { Card, CardHeader, CardMedia, Grid, IconButton, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { dataBase } from '../../services/firebase/firebase'

//icons
import CloseIcon from '@material-ui/icons/Close';

export default function NewCrud() {
    const [products, setProducts] = useState({
        productName: '',
        description: '',
        imgUrl: ''
    });
    const [users, setUsers] = useState([]);
    const [productList, setproductList] = useState([]);
    const [productDelete, setProductDelete] = useState(null);
    // captura datos mediante evento onChange
    const handleChange = e => {
        setProducts({
            ...products,
            [e.target.name]: e.target.value
        })
    }

    const getUsers = async () => {
        const querySnapshot = await dataBase.collection("users").get();
        let docs = [];
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            docs.push({ ...doc.data(), id: doc.id });
        });
        console.log(docs);
        setUsers(docs);

    }

    const getProducts = async () => {
        const querySnapshot = await dataBase.collection("products").get();
        let docs = [];
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            docs.push({ ...doc.data(), id: doc.id });
        });
        console.log(docs);
        setproductList(docs);

    }

    useEffect(() => {
        console.log(users);
    }, [users])

    useEffect(() => {
        getUsers();
        getProducts();
    }, [])

    useEffect(() => {
        if (productDelete !== null) {
            handleDelete(productDelete)
        }
    }, [productDelete])

    const addUserDB = async () => {
        await dataBase.collection('users').doc().set(products);
        console.log('Enviando datos a firebase')
    }

    const addProductsDB = async () => {
        await dataBase.collection('products').doc().set(products);
        console.log('Enviando datos a firebase');
        setProducts({
            productName: '',
            description: '',
            imgUrl: ''
        })
    }

    //registrar la data
    const handleSubmit = e => {
        e.preventDefault();
        console.log(products);
        addProductsDB();
    }

    //eliminar Productos
    const handleDelete = async (id) => {
        console.log(id)
        if (window.confirm("Are you sure you want to delete this product")) {
            await dataBase.collection('products').doc(id).delete();
            console.log("product deleted")
            setProductDelete(null);
        }
    }
    return (
        <>
            <h1>
                Products
            </h1>
            <form
                onSubmit={handleSubmit}
            >
                <input
                    placeholder='Nombre de Producto'
                    type='text'
                    name='productName'
                    onChange={handleChange}
                    value={products.productName}

                />
                <input
                    placeholder='Descripción'
                    type='text'
                    name='description'
                    onChange={handleChange}
                    value={products.description}
                />
                <input
                    placeholder='Url de imagen'
                    type='text'
                    name='imgUrl'
                    onChange={handleChange}
                    value={products.imgUrl}
                />
                <button
                    type='submit'
                >
                    Registrar
                </button>
            </form>
            <div>
                
                    {productList.length ?
                        (productList.map(i => (
                            <Grid item xs={3} key={i.id}>
                                <Card>
                                    <IconButton
                                        onClick={() => setProductDelete(i.id)}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                    <CardHeader
                                        title={
                                            <Typography>
                                                {i.productName}
                                            </Typography>}
                                        subheader={
                                            i.description
                                        }>
                                    </CardHeader>
                                    <CardMedia
                                        style={{
                                            height: 200
                                        }}
                                        image={i.imgUrl} />
                                </Card>
                            </Grid>
                        )))
                        :
                        null
                    }
                
            </div>
        </>
    )
}