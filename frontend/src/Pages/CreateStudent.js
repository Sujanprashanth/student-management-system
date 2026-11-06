
import { useState } from "react";
import api from "../Services/api";
import '../Styles/CreateStudent.css';

function CreateStudent() {
    const [stdName, setStdName] = useState('');
    const [stdCourse, setStdCourse] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleCreateStudent(e) {
        e.preventDefault();

        if (!stdName.trim() || !stdCourse.trim()) {
            setMessage("");
            setError("Please enter both student name and course.");
            return;
        }

        setError("");
        setMessage("");
        setIsSubmitting(true);

        try {
            await api.post("/students/createStudent", {
                stdName: stdName.trim(),
                stdCourse: stdCourse.trim()
            });

            setMessage("Student created successfully!");
            setStdName("");
            setStdCourse("");
        }
        catch (error) {
            console.error("Error creating student:", error);
            setError(
                error.response?.data?.message ||
                "Failed to create student. Please try again."
            );
        }
        finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="create-student-container">
            <div className="create-student-form">

                <h2>Create Student</h2>

                <form onSubmit={handleCreateStudent}>

                    <div className="create-student-field">
                        <label>Student Name:</label>
                        <input
                            type="text"
                            value={stdName}
                            disabled={isSubmitting}
                            onChange={(e) => {
                                setStdName(e.target.value);
                                setError("");
                                setMessage("");
                            }}
                        />
                    </div>

                    <div className="create-student-field">
                        <label>Student Course:</label>
                        <input
                            type="text"
                            value={stdCourse}
                            disabled={isSubmitting}
                            onChange={(e) => {
                                setStdCourse(e.target.value);
                                setError("");
                                setMessage("");
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        className="create-student-button"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Creating Student..." : "Create Student"}
                    </button>

                </form>

                {message && (
                    <p className="create-student-message">{message}</p>
                )}

                {error && (
                    <p className="create-student-error">{error}</p>
                )}

            </div>
        </div>
    );
}

export default CreateStudent;
