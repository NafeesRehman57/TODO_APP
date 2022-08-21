import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  setDoc,
  serverTimestamp,
  where,
  query,
} from "firebase/firestore/lite";
import { firestore } from "../../../config/firebase";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { Skeleton } from '@mui/material';

const initialState = {
  title: "",
  location: "",
  description: "",
};

const Todos = () => {
  const { user } = useContext(AuthContext);

  const [todo, setTodo] = useState({});
  const [state, setstate] = useState(initialState);
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessingDelete, setIsProcessingDelet] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const fetchDocuments = async () => {
    let array = [];

    const q = query(collection(firestore, "todos"), where("createdBy.uid", "==", user.uid));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      // doc.data() is never undefined for query doc snapshots
      console.log(data);
      array.push(data);
    });

    setDocuments(array);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchDocuments();
  }, [user]);

  const handleChange = (e) => {
    setTodo((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    let formData = { ...todo };
    formData.dateCreated = formData.dateCreated;
    formData.dateModified = serverTimestamp();

    formData.modifiedBy = {
      email: user.email,
      uid: user.uid,
    };

    setIsProcessing(true);

    try {
      await setDoc(doc(firestore, "todos", formData.id), formData, {
        merge: true,
      });
      window.notify("Todo has been added successfully updated", "success");

      let newDocuments = documents.map((doc) => {
        if (doc.id === todo.id) return todo;
        return doc;
      });

      setDocuments(newDocuments);
    } catch (error) {
      console.error(error);
      window.notify("Something went wrong todo isn't updated", "error");
    }
    setIsProcessing(false);
  };

  const handleDelete = async (todo) => {
    console.log(todo);

    setIsProcessingDelet(true);
    try {
      await deleteDoc(doc(firestore, "todos", todo.id));

      window.notify(
        "Todo has been successfully deleleted from your todo list",
        "success"
      );

      let newDocuments = documents.filter((doc) => {
        return doc.id !== todo.id;
      });

      setDocuments(newDocuments);
    } catch (error) {
      console.error(error);
      window.notify("Something went wrong", "error");
    }
    setIsProcessingDelet(false);
  };

  return (
    <>
      <div className="py-5 home d-flex justify-content-center align-items-center">
        <div className="container">
          <div className="row">
            <div className="col">
              <h2 className="text-center mb-4">My Todo</h2>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="card p-3 p-md-4 py-lg-5">
                {!isLoading ? (
                  <Table>
                    <Thead>
                      <Tr>
                        <Th>S. No.</Th>
                        <Th>Title</Th>
                        <Th>Location</Th>
                        <Th>Description</Th>
                        <Th>Status</Th>
                        <Th>Action</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {documents.map((todo, i) => {
                        return (
                          <Tr key={i}>
                            <Td>{i + 1}</Td>
                            <Td>{todo.title}</Td>
                            <Td>{todo.location}</Td>
                            <Td>{todo.description}</Td>
                            <Td>{todo.status}</Td>
                            <Td>
                              <button
                                className="btn btn-outline-primary btn-sm me-2"
                                data-bs-toggle="modal"
                                data-bs-target="#editModal"
                                onClick={() => {
                                  setTodo(todo);
                                }}
                              >
                                {!isProcessing ? (
                                  <><FaPencilAlt /> Edit</>
                                ) : (
                                  <div className="spinner-border spinner-border-sm"></div>
                                )}
                              </button>
                              <button
                                className="btn btn-outline-primary btn-sm"
                                disabled={isProcessingDelete}
                                onClick={() => {
                                  handleDelete(todo);
                                }}
                              >
                                {!isProcessingDelete ? (
                                  <><FaTrash /> Delete</>
                                ) : (
                                  <div className="spinner-border spinner-border-sm"></div>
                                )}
                              </button>
                            </Td>
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                ) : (
                  <div className="text-center">
                  <Skeleton animation="wave" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="editModal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="row">
                <div className="col">
                  <h2 className="text-center mb-4">Update Todo</h2>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-md-6 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    placeholder="Enter topic Title"
                    value={todo.title}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12 col-md-6 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="location"
                    placeholder="Enter location"
                    value={todo.location}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col">
                  <textarea
                    className="form-control"
                    name="description"
                    rows="5"
                    placeholder="Enter descripton"
                    value={todo.description}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col">
                  <select
                    name="status"
                    className="form-control"
                    value={todo.status}
                    onChange={handleChange}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col d-flex justify-content-end">
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm me-2"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    data-bs-dismiss="modal"
                    onClick={handleUpdate}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todos;