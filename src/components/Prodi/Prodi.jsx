import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import Swal from 'sweetalert2';

export default function List() {
    const [prodi, setProdi] = useState([])
    const [fakultas, setFakultas] = useState([])

    useEffect(() => {
        axios.get('https://project-apiif-3-b.vercel.app/api/api/prodi')
        .then(responses =>{ 
            console.log(responses.data.result)
            setProdi(responses.data.result)
        })
        .catch(error => {
            console.log('Error : ',error)
        })
    }, [])

    useEffect(() => {
        axios.get('https://project-apiif-3-b.vercel.app/api/api/fakultas')
        .then(responses =>{ 
            console.log(responses.data.result)
            setFakultas(responses.data.result)
        })
        .catch(error => {
            console.log('Error : ',error)
        })
    }, [])

    // Fungsi untuk handle delete
    const handleDelete = (id, nama) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You won't be able to revert this!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`https://project-apiif-3-b.vercel.app/api/api/prodi/${id}`)
                    .then((response) => {
                        setProdi(prodi.filter((item) => item.id !== id)); // Menghapus dari state
                        Swal.fire(
                            'Deleted!',
                            `Prodi ${nama} has been deleted.`,
                            'success'
                        )
                    })
                    .catch((error) => {
                        console.log('Error deleting data:', error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong!'
                        });
                    });
            }
        });
    }

    return (
        <div>
            <h2>List Prodi</h2>
            <NavLink to='/prodi/create' className="btn btn-primary my-4">
                Tambah
            </NavLink>

            <table className="table table-success table-striped-columns">
                <thead>
                    <tr>
                        <th scope="col">Nama</th>
                        <th scope="col">Fakultas</th>
                        <th>#</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        prodi.map((data) => {
                            return (
                                <tr key={data.id}>
                                    <td>{data.nama}</td>
                                    <td>{data.fakultas.nama}</td>
                                    <td>
                                        <NavLink to={`/prodi/edit/${data.id}`} className="btn btn-warning mx-2">
                                            Edit
                                        </NavLink>
                                        <button 
                                            onClick={() => handleDelete(data.id, data.nama)} 
                                            className="btn btn-danger"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
