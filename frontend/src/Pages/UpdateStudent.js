
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import '../Styles/UpdateStudent.css';
import api from "../Services/api";

function UpdateStudent() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [stdName, setStdName] = useState("");
    const [stdCourse, setStdCourse] = useState("");
    const [loading, setLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {

        async function fetchStudent() {
            try {
                const resp = await api.get(
                    `/students/getStudentById/${id}`
                );

                setStdName(resp.data.stdName);
                setStdCourse(resp.data.stdCourse);
            }
            catch (error) {
                console.error("Error fetching student:", error);
                setError("Unable to load student details.");
            }
            finally {
                setLoading(false);
            }
        }

        fetchStudent();

    }, [id]);

    async function handleUpdateStudent(e) {

        e.preventDefault();

        if (!stdName.trim() || !stdCourse.trim()) {
            setError("Please enter both student name and course.");
            return;
        }

        setError("");
        setIsUpdating(true);

        try {
            await api.put(`/students/updateStudent/${id}`, {
                stdName: stdName.trim(),
                stdCourse: stdCourse.trim()
            });

            alert("Student updated successfully!");

            navigate("/students");
        }
        catch (error) {
            console.error("Error updating student:", error);

            setError(
                error.response?.data?.message ||
                "Failed to update student."
            );
        }
        finally {
            setIsUpdating(false);
        }
    }

    if (loading) {
        return (
            <div className="update-student-container">
                <p>Loading student details...</p>
            </div>
        );
    }

    return (
        <div className="update-student-container">

            <div className="update-student-form">

                <h2>Update Student</h2>

                {error && (
                    <p className="update-student-error">{error}</p>
                )}

                <form onSubmit={handleUpdateStudent}>

                    <div className="update-student-field">
                        <label>Student Name:</label>
                        <input
                            type="text"
                            value={stdName}
                            disabled={isUpdating}
                            onChange={(e) => {
                                setStdName(e.target.value);
                                setError("");
                            }}
                        />
                    </div>

                    <div className="update-student-field">
                        <label>Student Course:</label>
                        <input
                            type="text"
                            value={stdCourse}
                            disabled={isUpdating}
                            onChange={(e) => {
                                setStdCourse(e.target.value);
                                setError("");
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        className="update-student-button"
                        disabled={isUpdating}
                    >
                        {isUpdating ? "Updating Student..." : "Update Student"}
                    </button>

                </form>

            </div>

        </div>
    );
}

export default UpdateStudent;
