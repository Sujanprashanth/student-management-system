
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/StudentList.css";
import api from "../Services/api";

function StudentList() {

    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [searchTerm, setSearchTerm] = useState("");
    const [sortField, setSortField] = useState("stdName");
    const [sortDirection, setSortDirection] = useState("asc");

    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 10;

    const [isAdmin, setIsAdmin] = useState(false);
    const [roleLoading, setRoleLoading] = useState(true);

    const [totalPages, setTotalPages] = useState(0);
    const [totalStudents, setTotalStudents] = useState(0);


    // Fetch logged-in user's role
    useEffect(() => {

        async function fetchUserRole() {

            try {

                const response = await api.get("/api/users/profile");

                const role = response.data.role?.toUpperCase();

                setIsAdmin(
                    role === "ADMIN" || role === "ROLE_ADMIN"
                );

            }
            catch (error) {

                console.error("Unable to fetch user role:", error);
                setIsAdmin(false);

            }
            finally {
                setRoleLoading(false);
            }
        }

        fetchUserRole();

    }, []);


    // Fetch students when page changes
    useEffect(() => {

        handleSearch(searchTerm, currentPage);

    }, [currentPage]);


    // Search and fetch student records
    async function handleSearch(
        name = searchTerm,
        page = currentPage
    ) {

        setLoading(true);
        setError("");

        try {

            const response = await api.get(
                "/students/getStudentsPage",
                {
                    params: {
                        name: name,
                        page: page,
                        size: pageSize,
                        sort: `${sortField},${sortDirection}`
                    }
                }
            );

            setStudents(response.data.content);
            setTotalPages(response.data.totalPages);
            setTotalStudents(response.data.totalElements);

        }
        catch (error) {

            console.error("Error fetching students:", error);
            setError("Unable to load student records.");

        }
        finally {

            setLoading(false);

        }
    }


    // Apply search
    function applySearch() {

        if (currentPage !== 0) {

            setCurrentPage(0);

        } else {

            handleSearch(searchTerm, 0);

        }
    }


    // Clear search
    function clearSearch() {

        setSearchTerm("");

        if (currentPage !== 0) {

            setCurrentPage(0);

        } else {

            handleSearch("", 0);

        }
    }


    // Refresh students
    function refreshStudents() {

        setSearchTerm("");

        if (currentPage !== 0) {

            setCurrentPage(0);

        } else {

            handleSearch("", 0);

        }
    }


    // Delete student (ADMIN only)
    async function handleDelete(id) {

        if (!isAdmin) {
            alert("Only ADMIN users can delete students.");
            return;
        }

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this student?"
        );

        if (!confirmDelete) return;

        try {

            await api.delete(`/students/deleteStudent/${id}`);

            alert("Student deleted successfully!");

            if (students.length === 1 && currentPage > 0) {

                setCurrentPage(currentPage - 1);

            } else {

                handleSearch();

            }

        }
        catch (error) {

            console.error("Delete error:", error);

            alert(
                error.response?.status === 403
                    ? "Access denied! Only ADMIN users can delete students."
                    : "Failed to delete student. Please try again."
            );

        }
    }


    return (

        <div className="student-list-container">


            {/* Header */}
            <header className="student-page-header">

                <div>

                    <span className="student-page-tag">
                        STUDENT MANAGEMENT SYSTEM
                    </span>

                    <h2>Student Records</h2>

                    <p>
                        View, search and manage your student information.
                    </p>

                </div>


                <Link
                    to="/dashboard"
                    className="student-dashboard-link"
                >
                    ← Back to Dashboard
                </Link>

            </header>


            {/* Statistics */}
            <section className="student-stats">

                <div className="student-stat-card">

                    <div className="student-stat-icon">
                        ♟
                    </div>

                    <div>

                        <p>Total Students</p>

                        <h2>
                            {loading ? "..." : totalStudents}
                        </h2>

                    </div>

                </div>


                <div className="student-stat-card">

                    <div className="student-stat-icon green">
                        ▤
                    </div>

                    <div>

                        <p>Records Per Page</p>

                        <h2>{pageSize}</h2>

                    </div>

                </div>

            </section>


            {/* Search and Filters */}
            <section className="student-filter-card">

                <div className="student-section-heading">

                    <div>

                        <h3>Student Directory</h3>

                        <p>
                            Search and organize student records
                        </p>

                    </div>


                    <button
                        className="student-refresh-button"
                        onClick={refreshStudents}
                    >
                        ↻ Refresh
                    </button>

                </div>


                <div className="student-search-controls">

                    <input
                        type="text"
                        placeholder="Search student by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") applySearch();
                        }}
                    />


                    <button
                        className="student-search-button"
                        onClick={applySearch}
                    >
                        Search
                    </button>


                    <button
                        className="student-clear-button"
                        onClick={clearSearch}
                    >
                        Clear
                    </button>

                </div>


                <div className="student-sort-controls">

                    <div className="student-input-group">

                        <label>Sort By</label>

                        <select
                            value={sortField}
                            onChange={(e) => setSortField(e.target.value)}
                        >

                            <option value="stdName">
                                Student Name
                            </option>

                            <option value="stdCourse">
                                Course
                            </option>

                        </select>

                    </div>


                    <div className="student-input-group">

                        <label>Direction</label>

                        <select
                            value={sortDirection}
                            onChange={(e) => setSortDirection(e.target.value)}
                        >

                            <option value="asc">
                                Ascending
                            </option>

                            <option value="desc">
                                Descending
                            </option>

                        </select>

                    </div>


                    <button
                        className="student-apply-button"
                        onClick={applySearch}
                    >
                        Apply Sorting
                    </button>

                </div>

            </section>


            {/* Student Table */}
            <section className="student-table-section">

                <div className="student-section-heading">

                    <div>

                        <h3>Manage Students</h3>

                        <p>
                            Available student records
                        </p>

                    </div>


                    <span className="student-record-count">
                        {totalStudents} Records
                    </span>

                </div>


                {loading && (

                    <div className="student-status-message">
                        Loading student records...
                    </div>

                )}


                {error && (

                    <div className="student-error">
                        {error}
                    </div>

                )}


                {!loading && !error && students.length === 0 && (

                    <div className="student-empty">

                        <span>📂</span>

                        <h3>No Students Found</h3>

                        <p>
                            Try searching with a different student name.
                        </p>

                    </div>

                )}


                {!loading && !error && students.length > 0 && (

                    <div className="student-table-wrapper">

                        <table className="student-table">

                            <thead>

                                <tr>

                                    <th>ID</th>
                                    <th>Student Name</th>
                                    <th>Course</th>
                                    <th>Actions</th>

                                </tr>

                            </thead>


                            <tbody>

                                {students.map((std) => (

                                    <tr key={std.stdId}>

                                        <td>

                                            <span className="student-id">
                                                #{std.stdId}
                                            </span>

                                        </td>


                                        <td>

                                            <div className="student-name-cell">

                                                <div className="student-avatar">

                                                    {std.stdName?.charAt(0).toUpperCase()}

                                                </div>

                                                <strong>
                                                    {std.stdName}
                                                </strong>

                                            </div>

                                        </td>


                                        <td>

                                            <span className="student-course">
                                                {std.stdCourse}
                                            </span>

                                        </td>


                                        <td>

                                            <div className="student-action-buttons">

                                                {roleLoading ? (

                                                    <span className="student-status-message">
                                                        Checking permissions...
                                                    </span>

                                                ) : isAdmin ? (

                                                    <>

                                                        <Link
                                                            to={`/update-student/${std.stdId}`}
                                                            className="student-edit-button"
                                                        >
                                                            Edit
                                                        </Link>


                                                        <button
                                                            className="student-delete-button"
                                                            onClick={() => handleDelete(std.stdId)}
                                                        >
                                                            Delete
                                                        </button>

                                                    </>

                                                ) : (

                                                    <span className="view-only-label">
                                                        View Only
                                                    </span>

                                                )}

                                            </div>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}


                {/* Pagination */}
                {!loading && !error && totalPages > 0 && (

                    <div className="student-pagination">

                        <p>

                            Page <strong>{currentPage + 1}</strong> of{" "}
                            <strong>{totalPages}</strong>

                        </p>


                        <div className="student-pagination-buttons">

                            <button
                                onClick={() => setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 0}
                            >
                                ← Previous
                            </button>


                            <button
                                onClick={() => setCurrentPage(currentPage + 1)}
                                disabled={currentPage >= totalPages - 1}
                            >
                                Next →
                            </button>

                        </div>

                    </div>

                )}

            </section>

        </div>

    );
}

export default StudentList;
