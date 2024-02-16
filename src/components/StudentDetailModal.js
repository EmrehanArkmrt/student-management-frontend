function StudentDetailModal({ student, onClose }) {
    if (!student) return null; // Eğer öğrenci bilgisi yoksa, hiçbir şey gösterme
  
    return (
      <div className="modal-backdrop">
        <div className="modal">
          <h2>Student Details</h2>
          <p>NIC: {student.nic}</p>
          <p>Name: {student.name}</p>
          <p>Grade: {student.grade}</p>
          <p>Contact: {student.contact}</p>
          <button onClick={onClose} className="close-button">Close</button>
        </div>
      </div>
    );
  }

  export default StudentDetailModal;