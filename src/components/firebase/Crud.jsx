import React, { useEffect, useState } from 'react'
import { dataBase } from '../../services/firebase/firebase'

export default function Crud() {

    const [userData, setUserData] = useState({
        name: '',
        email: ''
    })
    const [users, setUsers] = useState([]);
    const [newEmail, setNewEmail] = useState('');

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }

    //  Send data
    const handleSubmit = e => {
        e.preventDefault();
        addUserDB();
    }
    const addUserDB = async() => {
        await dataBase.collection('users').doc().set(userData);
        alert('Datos enviados');
        setUserData({
            name: '',
            email: ''
        })
    }

    //  Receive data
    // useEffect(() => {
        const receiveData = () => {
            const getData = async() => {
                try {
                    const querySnapshot = await dataBase.collection('users').get();
                    let usersArray = [];
                    
                    querySnapshot.forEach((doc) => {
                        usersArray.push({...doc.data() , id: doc.id});
                    })
    
                    setUsers(usersArray);
                } catch (error) {
                    console.log(error);
                }
                
            }
            getData();
        }
    // }, [users])


    //Update data
    const changeEmail = async(id) => {
        await dataBase.collection('users').doc(id).update('email', newEmail);
        console.log('email cambiado');
        setNewEmail('');
    }
    const handleChangeEmail = (e) => {
        setNewEmail(e.target.name = e.target.value)
    }

    //  Delete data
    const handleDelete = async(id) => {
        await dataBase.collection('users').doc(id).delete();
    }

    return (
        <>
            <h1>Users</h1>
            <form 
                action=""
                onSubmit={handleSubmit}>
                <input 
                    type="text"
                    name="name" 
                    placeholder="Digita un nombre"
                    value={userData.name}
                    onChange={handleChange}
                    />
                <input 
                    type="email"
                    name="email" 
                    placeholder="Digita un email"
                    value={userData.email}
                    onChange={handleChange}
                    />
                <button
                    type="submit"
                    >Enviar</button>
            </form>

            <button
                onClick={() => receiveData()}
            >Traer datos</button>

            <hr/>

            <input 
                type="email"
                name="emailChange" 
                placeholder="Cambiar email"
                onChange={handleChangeEmail}
                value={newEmail}
                />
            

            <section>
                <ul>
                    {users?.map(item => (
                        <li key={item.id}>
                            {item.name} || {item.email} 
                            <span 
                                style={{color: 'red', cursor: 'pointer'}}
                                onClick={() => handleDelete(item.id)}    
                            ><strong>X</strong></span>
                            <span
                                onClick={() => changeEmail(item.id)}
                            ><strong>Change</strong></span>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    )
}
