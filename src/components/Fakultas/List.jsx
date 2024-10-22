import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import Swal from 'sweetalert2';

export default function List() {
    const handleDelete = (id, nama) => {
        Swal.fire({
            title: 'Apakah Kamu Yakin?',
            text: "Anda tidak akan dapat mengembalikan data ini!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Iya,Hapus ini!'
          }).then((result) => {
            if (result.isConfirmed) {
              axios
                .delete(`https://project-apiif-3-b.vercel.app/api/api/fakultas/${id}`)
                .then((response) => {
                 setFakultas(
                     fakultas.filter((fakultas) => fakultas.id !== id)
                 );
                  Swal.fire(
                    'Terhapus!',
                    `Fakultas ${nama} Sudah Terhapus.`,
                  )
                })
                .catch((error) => {
                  console.log("Error deleting data:",error);
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                  })
                })
            }
          })
    }

    const [fakultas, setFakultas] = useState([])

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

    return (
        <div>
            <h2>List Fakultas</h2>

            <NavLink to='/fakultas/create' className="btn btn-primary my-4">
                Tambah
            </NavLink>

            <ul className="list-group">
                {
                    fakultas.map((data) => {
                        return (
                            <li key={data.id} className='list-group-item'>
                                {data.nama}
                                <div className="btn-group" role="group" aria-label="Action buttons">
                                <NavLink to={`/fakultas/edit/${data.id}`} className="btn btn-warning mx-2">
                                    Edit
                                </NavLink>
                                <button
                                    onClick={() => handleDelete(data.id, data.nama)}  
                                    className="btn btn-danger"
                                >
                                    Delete
                                </button>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
