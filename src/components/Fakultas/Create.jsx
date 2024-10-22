import React, {useState, useEffect } from 'react'
import axios from 'axios'

export default function CreateFakultas() {
    const [namaFakultas, setNamaFakultas] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (namaFakultas.trim() === '') {
            setError('Name Fakultas is required');
            return;
        }
        try {
            const response = await axios.post(
                'https://project-apiif-3-b.vercel.app/api/api/fakultas', 
                {nama : namaFakultas}
        );

        if (response.status === 201) {
            setSuccess('Fakultas created successfully');
            setNamaFakultas('');
        } else {
            setError('Failed to create Fakultas');
        }
    } catch (error) {
        setError('An error occurred while creating Fakultas');
    }
};
    return (
        <div className="container mt-5">
            <h2 className="mb-4">Create Fakultas</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <form onSubmit = {handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="namaFakultas" className ="form-label">
                            Name Fakultas
                    </label>
                    <input
                        type="text" className="form-control" id="namaFakultas"
                        value={namaFakultas}
                        onChange={(e) => setNamaFakultas(e.target.value)}
                        placeholder="Masukan Nama Fakultas"
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Create
                </button>
            </form>
        </div>
    );
}
