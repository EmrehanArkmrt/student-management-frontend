import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GetAllStudents, DeleteCall } from '../ApiCalls';
import StudentDetailModal from "../components/StudentDetailModal"; 

function StudentList() {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchStudents();
    }, []);

    async function fetchStudents() {
        try {
            const response = await GetAllStudents(); 
            setStudents(response.data); 
        } catch (error) {
            console.error("An error occurred while fetching the students:", error);
        }
    }

    async function handleDelete(nic) {
        try {
            await DeleteCall(nic);
            // Silme işlemi başarılı olduktan sonra öğrenci listesini güncelleyin
            fetchStudents(); // Öğrenci listesini yeniden yükle
        } catch (error) {
            console.error("An error occurred while deleting the student:", error);
        }
    }

    return (
        <div className="student-list-container">
            <h1>Student List</h1>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>NIC</th>
                            <th>Name</th>
                            <th>Grade</th>
                            <th>Contact</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student.nic} onClick={() => setSelectedStudent(student)}>
                                <td>{student.nic}</td>
                                <td>{student.name}</td>
                                <td>{student.grade}</td>
                                <td>{student.contact}</td>
                                <td>
                                    
                                    <button onClick={() => handleDelete(student.nic)} className="delete-button">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <StudentDetailModal student={selectedStudent} onClose={() => setSelectedStudent(null)} />
        
            <div className="back-to-dashboard">
                <Link to="/dashboard" className="back-link">Back to Dashboard</Link>
                <button onClick={() => navigate('/dashboard/submit')} className="submit-button">Submit Student</button>
            </div>
        </div>
    );
}

export default StudentList;
