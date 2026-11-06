import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
    LayoutDashboard,
    UserPlus,
    Users,
    UserRound,
    LogOut,
    GraduationCap,
    BookOpen,
    Clock3,
    ArrowUpRight,
    ChevronRight
} from "lucide-react";
import { useAuth } from "../Context/AuthContext";
import api from "../Services/api";
import "../Styles/Dashboard.css";

function Dashboard() {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchStudents();
    }, []);

    async function fetchStudents() {
        try {
            const response = await api.get("/students/getStudents");

            const studentData = Array.isArray(response.data)
                ? response.data
                : Array.isArray(response.data?.content)
                    ? response.data.content
                    : [];

            setStudents(studentData);
        } catch (error) {
            console.error("Error fetching students:", error);
            setError("Unable to load student details.");
        } finally {
            setLoading(false);
        }
    }

    function handleLogout() {
        logout();
        navigate("/login");
    }

    const totalStudents = students.length;

    const totalCourses = new Set(
        students.map(student => student.stdCourse).filter(Boolean)
    ).size;

    const recentStudents = students.slice(0, 5);

    return (
        <div className="dashboard-layout">

            {/* Sidebar */}
            <aside className="dashboard-sidebar">

                <div className="sidebar-brand">
                    <div className="brand-icon">
                        <GraduationCap size={25} />
                    </div>

                    <div>
                        <h2>Student Portal</h2>
                        <span>Management System</span>
                    </div>
                </div>

                <div className="sidebar-section-label">
                    MAIN MENU
                </div>

                <nav className="sidebar-menu">

                    <Link to="/dashboard" className="sidebar-link active">
                        <LayoutDashboard size={19} />
                        <span>Dashboard</span>
                    </Link>

                    <Link to="/create-student" className="sidebar-link">
                        <UserPlus size={19} />
                        <span>Create Student</span>
                    </Link>

                    <Link to="/students" className="sidebar-link">
                        <Users size={19} />
                        <span>View Students</span>
                    </Link>

                    <Link to="/profile" className="sidebar-link">
                        <UserRound size={19} />
                        <span>My Profile</span>
                    </Link>

                </nav>

                <div className="sidebar-bottom">

                    <div className="sidebar-help">
                        <GraduationCap size={23} />
                        <p>Manage your student records with ease.</p>
                    </div>

                    <button
                        className="sidebar-logout"
                        onClick={handleLogout}
                    >
                        <LogOut size={19} />
                        <span>Logout</span>
                    </button>

                </div>

            </aside>

            {/* Main Content */}
            <main className="dashboard-main">

                {/* Topbar */}
                <header className="dashboard-topbar">

                    <div>
                        <h2>Dashboard</h2>
                        <p>Welcome back! Here's your overview.</p>
                    </div>

                    <Link to="/profile" className="topbar-profile">
                        <div className="topbar-avatar">
                            <UserRound size={21} />
                        </div>

                        <div className="topbar-user-info">
                            <strong>My Account</strong>
                            <span>View Profile</span>
                        </div>

                        <ChevronRight size={17} />
                    </Link>

                </header>

                <div className="dashboard-content">

                    {/* Welcome Banner */}
                    <section className="dashboard-welcome">

                        <div className="welcome-text">

                            <span className="welcome-label">
                                STUDENT MANAGEMENT
                            </span>

                            <h1>
                                Welcome to Your Dashboard!
                            </h1>

                            <p>
                                Manage student information, track courses,
                                and keep your records organized in one place.
                            </p>

                            <Link to="/students" className="welcome-button">
                                Explore Students
                                <ArrowUpRight size={17} />
                            </Link>

                        </div>

                        <div className="welcome-illustration">
                            <div className="illustration-circle">
                                <GraduationCap size={75} />
                            </div>
                        </div>

                    </section>

                    {/* Statistics */}
                    <section className="dashboard-stats">

                        <div className="stat-card">

                            <div className="stat-card-top">
                                <div className="stat-icon blue-icon">
                                    <Users size={23} />
                                </div>

                                <span className="stat-tag">Students</span>
                            </div>

                            <p>Total Students</p>

                            <h2>
                                {loading ? "..." : totalStudents}
                            </h2>

                            <span className="stat-description">
                                Registered student records
                            </span>

                        </div>

                        <div className="stat-card">

                            <div className="stat-card-top">
                                <div className="stat-icon green-icon">
                                    <BookOpen size={23} />
                                </div>

                                <span className="stat-tag">Courses</span>
                            </div>

                            <p>Courses Offered</p>

                            <h2>
                                {loading ? "..." : totalCourses}
                            </h2>

                            <span className="stat-description">
                                Different courses available
                            </span>

                        </div>

                        <div className="stat-card">

                            <div className="stat-card-top">
                                <div className="stat-icon orange-icon">
                                    <Clock3 size={23} />
                                </div>

                                <span className="stat-tag">Recent</span>
                            </div>

                            <p>Recent Records</p>

                            <h2>
                                {loading ? "..." : recentStudents.length}
                            </h2>

                            <span className="stat-description">
                                Latest student records displayed
                            </span>

                        </div>

                    </section>

                    {/* Student Table */}
                    <section className="dashboard-table-section">

                        <div className="section-heading">

                            <div>
                                <h2>Recent Students</h2>
                                <p>Overview of recently available student records</p>
                            </div>

                            <Link to="/students" className="view-all-link">
                                View All
                                <ArrowUpRight size={16} />
                            </Link>

                        </div>

                        {loading && (
                            <div className="dashboard-message">
                                Loading student records...
                            </div>
                        )}

                        {error && (
                            <div className="dashboard-message dashboard-error">
                                {error}
                            </div>
                        )}

                        {!loading && !error && students.length === 0 && (
                            <div className="dashboard-empty">
                                <Users size={35} />
                                <h3>No Students Found</h3>
                                <p>Start by adding your first student record.</p>

                                <Link to="/create-student">
                                    Create Student
                                </Link>
                            </div>
                        )}

                        {!loading && !error && students.length > 0 && (

                            <div className="dashboard-table-wrapper">

                                <table className="dashboard-table">

                                    <thead>
                                        <tr>
                                            <th>STUDENT ID</th>
                                            <th>STUDENT NAME</th>
                                            <th>COURSE</th>
                                            <th>ACTION</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {recentStudents.map(student => (
                                            <tr key={student.stdId}>

                                                <td>
                                                    <span className="student-id">
                                                        #{student.stdId}
                                                    </span>
                                                </td>

                                                <td>
                                                    <div className="student-name-cell">
                                                        <div className="student-avatar">
                                                            {student.stdName?.charAt(0)?.toUpperCase() || "S"}
                                                        </div>

                                                        <strong>
                                                            {student.stdName}
                                                        </strong>
                                                    </div>
                                                </td>

                                                <td>
                                                    <span className="course-badge">
                                                        {student.stdCourse}
                                                    </span>
                                                </td>

                                                <td>
                                                    <Link
                                                        to="/students"
                                                        className="table-action"
                                                    >
                                                        Manage
                                                        <ChevronRight size={15} />
                                                    </Link>
                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>

                                </table>

                            </div>
                        )}

                    </section>

                    {/* Quick Actions */}
                    <section className="quick-actions-section">

                        <div className="section-heading quick-heading">
                            <div>
                                <h2>Quick Actions</h2>
                                <p>Frequently used student management options</p>
                            </div>
                        </div>

                        <div className="quick-actions">

                            <Link
                                to="/create-student"
                                className="quick-action-card"
                            >
                                <div className="quick-action-icon blue-icon">
                                    <UserPlus size={24} />
                                </div>

                                <div>
                                    <h3>Create Student</h3>
                                    <p>Add a new student record.</p>
                                </div>

                                <ArrowUpRight className="quick-arrow" size={19} />
                            </Link>

                            <Link
                                to="/students"
                                className="quick-action-card"
                            >
                                <div className="quick-action-icon green-icon">
                                    <Users size={24} />
                                </div>

                                <div>
                                    <h3>View Students</h3>
                                    <p>Explore all student records.</p>
                                </div>

                                <ArrowUpRight className="quick-arrow" size={19} />
                            </Link>

                            <Link
                                to="/profile"
                                className="quick-action-card"
                            >
                                <div className="quick-action-icon purple-icon">
                                    <UserRound size={24} />
                                </div>

                                <div>
                                    <h3>My Profile</h3>
                                    <p>View your account information.</p>
                                </div>

                                <ArrowUpRight className="quick-arrow" size={19} />
                            </Link>

                        </div>

                    </section>

                </div>
            </main>

        </div>
    );
}

export default Dashboard;