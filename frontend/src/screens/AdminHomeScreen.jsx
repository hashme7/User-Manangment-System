import { useCallback, useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, Modal, Row, Table } from "react-bootstrap";
import {
  useDeleteUserMutation,
  useGetUsersDataMutation,
} from "../slices/adminApiSlices";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import debounce from "../utils/debouncer";

const AdminHomeScreen = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(page);
  const limit = 3;
  const searchRef = useRef(search);

  const [getUsersData, { isLoading }] = useGetUsersDataMutation();
  const [deleteUser] = useDeleteUserMutation();
  
  const debouncedFetchUser = useCallback(debounce(async () => {
    const res = await getUsersData({ page: 1, search:searchRef.current }).unwrap(""); 
    setUsers(res.user);
    setTotal(res.totalPages);
  }, 500),[])

  useEffect(() => {
    debouncedFetchUser();
  }, [getUsersData, page,search]);

  const prevPageHandler = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const nextPageHandler = () => {
    setPage(page + 1);
  };

  const deleteHandler = async (id) => {
    setSelectedUserId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteUser(selectedUserId).unwrap("");
      const prevUsers = [...users];
      const updatedUsers = prevUsers.filter(
        (user) => user._id !== selectedUserId
      );
      setUsers(updatedUsers);
      setShowModal(false);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleInput = (e)=>{
    setSearch(e.target.value);
    searchRef.current = e.target.value;
  }

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <Container style={{ border: "1px solid #ccc", padding: "20px" }}>
      <Form.Group
        className="mt-3 mt-5 d-flex align-items-center"
        controlId="searchForm">
        <Form.Label className="me-3">Search:</Form.Label>
        <Form.Control
          style={{ width: "30vw", marginBottom: "10px" }}
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleInput}
        />
      </Form.Group>

      <div className="d-flex justify-content-end mt-4">
        <Link to="/admin/users/add">
          <Button className="rounded-5" variant="dark">Add User</Button>
        </Link>
      </div>

      {isLoading ?<Loader />:<div
        className="table-responsive"
        style={{ backgroundColor: "transparent" }}>
        <Table striped bordered hover className="mt-5" variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user, index) => (
                <tr key={index}>
                  <td>{(page - 1) * limit + index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <Button
                      className="btn-danger"
                      onClick={() => deleteHandler(user._id)}>
                      Delete
                    </Button>
                  </td>
                  <td>
                    <Link to={`/admin/users/update/${user._id}`}>
                      <Button className="btn-success">Update</Button>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <div className="d-flex justify-content-end mt-2">
          <Button
            variant="dark"
            onClick={prevPageHandler}
            disabled={page == 1}>
            Previous
          </Button>
          <Row>
            <Col>{page} of {total}</Col>
          </Row>
          <Button
            variant="dark"
            onClick={nextPageHandler}
            disabled={page == total}>
            Next
          </Button>
        </div>
      </div>}

      

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminHomeScreen;
