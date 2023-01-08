import { Button, Table } from "react-bootstrap";

export const StudentsTable = ({ students, onDelete, onEdit }) => {
  return (
    <Table bordered hover>
      <thead className="thead-dark">
        <tr>
          <th>#</th>
          <th>FullName</th>
          <th>Age</th>
          <th>DOB</th>
          <th>DOI</th>
          <th>Cost</th>
          <th>actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student.id}>
            <th role="row">{student.id}</th>
            <th>{student.fullName}</th>
            <th>{student.age}</th>
            <th>
              {student.dateOfBirth}
            </th>
            <th>
              {student.dateOfInscription}
            </th>
            <th>
              {student.cost}
            </th>
            <th>
              <Button onClick={() => onEdit(student)}>
                Edit
              </Button>
              <Button className="btn-warning" onClick={() => onDelete(student)}>
                Delete
              </Button>
            </th>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}