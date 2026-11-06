
import { useAuth } from "../Context/AuthContext";
import { Link } from "react-router-dom";

import {
    UserRound,
    Mail,
    ShieldCheck,
    CalendarDays,
    ArrowLeft,
    GraduationCap
} from "lucide-react";

import "../Styles/MyProfile.css";

function MyProfile() {

    // Get profile information from Context API
    const { user, isLoading, refreshProfile } = useAuth();

    // Loading state
    if (isLoading) {
        return (
            <div className="profile-container">
                <div className="profile-message">
                    <div className="profile-loader"></div>
                    <p>Loading your profile...</p>
                </div>
            </div>
        );
    }

    // Profile unavailable
    if (!user) {
        return (
            <div className="profile-container">
                <div className="profile-message profile-error">
                    <UserRound size={35} />

                    <h2>Profile Unavailable</h2>

                    <p>Profile information could not be found.</p>

                    <button
                        className="profile-back-button"
                        onClick={refreshProfile}
                    >
                        Retry Loading
                    </button>

                    <Link
                        to="/dashboard"
                        className="profile-back-button"
                    >
                        <ArrowLeft size={17} />
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    // Format Member Since date
    const memberDate = user.memberSince
        ? new Date(user.memberSince).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        })
        : "Not available";

    return (
        <div className="profile-container">

            <div className="profile-card">

                {/* Profile Header */}
                <div className="profile-header">

                    <div className="profile-avatar">
                        <UserRound size={43} />
                    </div>

                    <h1>My Profile</h1>

                    <p>Your account information</p>

                    <span className="profile-role-badge">
                        <ShieldCheck size={15} />
                        {user.role}
                    </span>

                </div>

                {/* Profile Details */}
                <div className="profile-body">

                    <div className="profile-section-heading">
                        <h2>Personal Information</h2>
                        <span>Account Details</span>
                    </div>

                    <div className="profile-details">

                        {/* Username */}
                        <div className="profile-row">

                            <div className="profile-label">
                                <UserRound size={17} />
                                <span>Username</span>
                            </div>

                            <strong>{user.username}</strong>

                        </div>

                        {/* Email */}
                        <div className="profile-row">

                            <div className="profile-label">
                                <Mail size={17} />
                                <span>Email</span>
                            </div>

                            <strong>{user.email}</strong>

                        </div>

                        {/* Role */}
                        <div className="profile-row">

                            <div className="profile-label">
                                <ShieldCheck size={17} />
                                <span>Role</span>
                            </div>

                            <strong className="profile-role-value">
                                {user.role}
                            </strong>

                        </div>

                        {/* Member Since */}
                        <div className="profile-row">

                            <div className="profile-label">
                                <CalendarDays size={17} />
                                <span>Member Since</span>
                            </div>

                            <strong>{memberDate}</strong>

                        </div>

                    </div>

                    {/* Account Status */}
                    <div className="profile-status">

                        <div className="status-indicator"></div>

                        <div>
                            <strong>Account Active</strong>
                            <p>Your profile information is available.</p>
                        </div>

                    </div>

                    {/* Back Button */}
                    <Link
                        to="/dashboard"
                        className="profile-back-button"
                    >
                        <ArrowLeft size={17} />
                        Back to Dashboard
                    </Link>

                </div>

                {/* Footer */}
                <div className="profile-footer">
                    <GraduationCap size={18} />
                    <span>Student Management System</span>
                </div>

            </div>

        </div>
    );
}

export default MyProfile;
