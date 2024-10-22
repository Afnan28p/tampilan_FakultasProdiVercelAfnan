import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function Edit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [nama,setNama] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get(`https://project-apiif-3-b.vercel.app/api/api/fakultas/${id}`)
        .then((response) => {
            setNama(response.data.result.nama);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            setError("An error occurred while fetching data.");
        });
    }, {id});

    const handleChange = (e) => {
        setNama(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .patch(`https://project-apiif-3-b.vercel.app/api/api/fakultas/${id}`, { nama})
            .then((response) => {
                navigate("/fakultas");
            })
            .catch((error) => {
                console.error("Error updating data:", error);
                setError("An error occurred while updating data.");
            });
    };

    return (
        <div>
            <h2>Edit Fakultas</h2>
            {error && <p className="alert alert-danger">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nama" className="form-label">Nama Fakultas</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="nama" value={nama} 
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}