import React, { useCallback, useEffect, useMemo, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Col, Container, Row } from 'react-bootstrap';
import { StudentForm } from './components/StudentForm';
import { apiAxios } from './api/axios';
import { StudentsTable } from './components/StudentsTable';



function App() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const getStudents = useCallback(async () => {
    try {
      const res = await apiAxios.get('/students')
      setStudents(res.data.students);
    } catch(err) {
      window.alert('error loading students')
    }
  }, []);

  const createStudent = useCallback(async (studentDto) => {
    try {
      await apiAxios.post('/students', studentDto);
      getStudents();
    } catch(err) {
      window.alert('error saving student')
    }
  }, [getStudents]);

  const deleteStudent = useCallback(async (student) => {
    try {
      await apiAxios.delete(`/students/${student.id}`);
      getStudents();
    } catch(err) {
      window.alert('error deleting student')
    }
  }, [getStudents]);

  
  const isEditing = useMemo(() => !!selectedStudent, [selectedStudent]); 

  const onSubmit = useCallback((studentDto) => {
    if(isEditing) {
      //
    } else {
      createStudent(studentDto);
    }
  }, [createStudent, isEditing]);

  useEffect(() => {
    getStudents();
  }, [getStudents]);

  return (
    <Container fluid className="py-3">
      <Row className="justify-content-center">
        <Col xs={12} md={5} lg={4}>
          <StudentForm
            defaultValues={selectedStudent}
            onSubmit={onSubmit} 
          />
        </Col>
        <Col xs={12} md={7} lg={8}>
          <StudentsTable 
            students={students}
            onDelete={deleteStudent}
            onEdit={(student) => setSelectedStudent(student)}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
