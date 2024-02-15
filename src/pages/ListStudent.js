import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GetAllStudents } from '../api/ApiCalls'; // Varsayılan API çağrısını doğru şekilde isimlendirin

function StudentList() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        async function fetchStudents() {
            try {
                const response = await GetAllStudents(); // Öğrenci listesini çeken API çağrısı
                setStudents(response.data); // API'den gelen veriyi students state'ine ata
            } catch (error) {
                console.error("An error occurred while fetching the students:", error);
            }
        }
        
        fetchStudents();
    }, []);

    return (
        <div className="student-list-container">
            <h1>Student List</h1>
            <Link to="/dashboard">Back to Dashboard</Link>
            <table>
                <thead>
                    <tr>
                        <th>NIC</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Contact</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.nic}>
                            <td>{student.nic}</td>
                            <td>{student.name}</td>
                            <td>{student.address}</td>
                            <td>{student.contact}</td>
                            <td>
                                <Link to={`/update/${student.nic}`}>Update</Link> | 
                                <Link to={`/delete/${student.nic}`}>Delete</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default StudentList;
