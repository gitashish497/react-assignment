import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase/config';
import "../styles/index.css"

function StudentsPage({ setLoggedIn }) {
  const [students, setStudents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    id: '',
    name: '',
    class: '',
    section: '',
    rollNumber: '',
    additionalFields: Array(8).fill(''),
  });

  // Fetch students on initial render
  useEffect(() => {
    const fetchStudents = async () => {
      const querySnapshot = await getDocs(collection(db, 'students'));
      const studentList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setStudents(studentList);
    };
    fetchStudents();
  }, []);

  const handleAddStudent = async () => {
    try {
      await addDoc(collection(db, 'students'), newStudent);
  
      // Log success
      console.log('Student added successfully.');
      
      // Close the modal and reset the form fields
      setModalOpen(false);
      console.log('Modal is open:', modalOpen); // This should log 'false' after closing modal
      setNewStudent({
        id: '',
        name: '',
        class: '',
        section: '',
        rollNumber: '',
        additionalFields: Array(8).fill(''),
      });
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };
  

  return (
    <div>
      <h1>Students Page</h1>
      <button onClick={() => setModalOpen(true)}>Add Student</button>

      {/* Modal visibility controlled by modalOpen state */}
      {modalOpen && (
        <div className="modal">
          <h2>Add Student</h2>
          <form>
            <input
              type="text"
              placeholder="ID"
              value={newStudent.id}
              onChange={(e) => setNewStudent({ ...newStudent, id: e.target.value })}
            />
            <input
              type="text"
              placeholder="Name"
              value={newStudent.name}
              onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Class"
              value={newStudent.class}
              onChange={(e) => setNewStudent({ ...newStudent, class: e.target.value })}
            />
            <input
              type="text"
              placeholder="Section"
              value={newStudent.section}
              onChange={(e) => setNewStudent({ ...newStudent, section: e.target.value })}
            />
            <input
              type="text"
              placeholder="Roll Number"
              value={newStudent.rollNumber}
              onChange={(e) => setNewStudent({ ...newStudent, rollNumber: e.target.value })}
            />
            {newStudent.additionalFields.map((field, index) => (
              <input
                key={index}
                type="text"
                placeholder={`Additional Field ${index + 1}`}
                value={field}
                onChange={(e) => {
                  const updatedFields = [...newStudent.additionalFields];
                  updatedFields[index] = e.target.value;
                  setNewStudent({ ...newStudent, additionalFields: updatedFields });
                }}
              />
            ))}
            <button type="button" onClick={handleAddStudent}>Submit</button>
          </form>
        </div>
      )}

      {/* Student Table */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Class</th>
            <th>Section</th>
            <th>Roll Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.class}</td>
              <td>{student.section}</td>
              <td>{student.rollNumber}</td>
              <td>
                <button>View</button>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Logout Button */}
      <button onClick={() => signOut(auth).then(() => setLoggedIn(false))}>Logout</button>
    </div>
  );
}

export default StudentsPage;
