import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../api/api";
import { LogOutModal } from "../../Modals/LogOutModal";
import { Eye, EyeOff } from "lucide-react";

const MyDetails = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        role: "",
        companyAddress: "",
        companyLogo: "",
    });

    const fileInputRef = useRef(null);
    const [openEdit, setOpenEdit] = useState(false);
    const [openPassword, setOpenPassword] = useState(false);
    const [logOut, setLogOut] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [passwordForm, setPasswordForm] = useState({
        email: "",
        newPassword: "",
    });

    const [logoFile, setLogoFile] = useState(null);

    const inputclass = "w-full p-2 rounded bg-gray-100";

    const token = localStorage.getItem("adminToken");

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        const IMAGE_BASE_URL = "http://localhost:5000";
        try {
            const res = await axios.get(`${BASE_URL}/user/profile`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const user = res.data.user;

            setForm({
                name: `${user.firstName || ""} ${user.lastName || ""}`,
                email: user.email || "",
                phone: user.phone || "",
                role: user.role || "Admin",
                companyAddress: user.companyAddress || "",
                companyLogo: user.companyLogo

                    ? `${IMAGE_BASE_URL}${user.companyLogo}`

                    : "",
            });
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handlePasswordInputChange = (e) => {
        setPasswordForm({
            ...passwordForm,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = async () => {
        try {
            const formData = new FormData();
            formData.append("name", form.name);
            formData.append("email", form.email);
            formData.append("phone", form.phone);
            formData.append("companyAddress", form.companyAddress);

            if (logoFile) {
                formData.append("companyLogo", logoFile);
            }

            await axios.put(`${BASE_URL}/user/profile`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            alert("Details updated");
            setOpenEdit(false);
            setLogoFile(null);
            fetchProfile();
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Update failed");
        }
    };

    const handleChangePassword = async () => {
        try {
            await axios.post(
                `${BASE_URL}/auth/change-password`,
                {
                    oldPassword: passwordForm.oldPassword,
                    newPassword: passwordForm.newPassword,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            alert("Password changed successfully");
            setOpenPassword(false);
            setPasswordForm({ oldPassword: "", newPassword: "" });
        } catch (err) {
            alert(err.response?.data?.message || "Password change failed");
        }
    };

    const handleLogout = async () => {
        try {
            await axios.post(
                `${BASE_URL}/logout`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            localStorage.removeItem("adminToken");
            window.location.href = "/login";
        } catch (err) {
            alert("Logout failed");
        }
    };

    return (
        <div className="max-w-xl">
            <h3 className="text-xl font-semibold mb-6 text-[#1C3F6E] mt-4">
                Account & Company Settings
            </h3>

            <div className="bg-white shadow rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                    <div>
                        <span className="font-medium">Admin Name: </span>
                        <span className="text-gray-500">{form.name}</span>
                    </div>

                    <div>
                        <span className="font-medium">Email: </span>
                        <span className="text-gray-500">{form.email}</span>
                    </div>

                    <div>
                        <span className="font-medium">Phone: </span>
                        <span className="text-gray-500">{form.phone}</span>
                    </div>

                    <div>
                        <span className="font-medium">Role: </span>
                        <span className="text-gray-500">{form.role}</span>
                    </div>

                    <div>
                        <span className="font-medium">Company Address: </span>
                        <span className="text-gray-500">
                            {form.companyAddress || "Not set"}
                        </span>
                    </div>
                </div>
                <div
                    onClick={() => fileInputRef.current.click()}
                    className="flex flex-col items-center justify-center border rounded-lg p-4 cursor-pointer hover:bg-gray-50"
                >
                    <p className="text-sm text-gray-500 mb-2">Company Logo</p>

                    {form.companyLogo ? (
                        <img
                           src={form.companyLogo}
                            alt="logo"
                            className="w-32 h-32 object-contain border rounded"
                        />
                    ) : (
                        <div className="w-32 h-32 flex items-center justify-center border rounded text-gray-400">
                            Click to upload
                        </div>
                    )}

                    <input
                        type="file"
                        accept="image/png,image/jpg,image/jpeg"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (!file) return;

                            setLogoFile(file);
                            setForm({
                                ...form,
                                companyLogo: URL.createObjectURL(file),
                            });
                        }}
                    />
                </div>


            </div>
            <div className="flex gap-3 mt-6">
                <button
                    onClick={() => setOpenEdit(true)}
                    className="bg-[#1C3F6E] text-white px-5 py-2 rounded"
                >
                    Edit Details
                </button>

                <button
                    onClick={() => setOpenPassword(true)}
                    className="bg-gray-700 text-white px-5 py-2 rounded"
                >
                    Change Password
                </button>

                <button
                    onClick={() => setLogOut(true)}
                    className="bg-red-600 text-white px-5 py-2 rounded"
                >
                    Logout
                </button>
            </div>
            {openEdit && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded w-[400px]">
                        <h4 className="text-lg font-semibold mb-4">Edit Details</h4>

                        <div className="space-y-3">
                            <input
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Full Name"
                                className={inputclass}
                            />

                            <input
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Email"
                                className={inputclass}
                            />

                            <input
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="Phone"
                                className={inputclass}
                            />

                            <input
                                name="companyAddress"
                                value={form.companyAddress}
                                onChange={handleChange}
                                placeholder="Company Address"
                                className={inputclass}
                            />

                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setLogoFile(e.target.files[0])}
                            />
                        </div>

                        <div className="flex justify-end gap-3 mt-4">
                            <button
                                onClick={() => setOpenEdit(false)}
                                className="bg-red-600 text-white px-5 py-2 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="bg-[#1C3F6E] text-white px-5 py-2 rounded"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {openPassword && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded w-[400px]">
                        <h4 className="text-lg font-semibold mb-4">Change Password</h4>

                        <div className="space-y-3">
                            <input
                                type="email"
                                name="email"
                                value={passwordForm.email}
                                onChange={handlePasswordInputChange}
                                placeholder="Enetr email"
                                className={inputclass}
                            />

                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="newPassword"
                                    value={passwordForm.newPassword}
                                    onChange={handlePasswordInputChange}
                                    placeholder="New Password"
                                    className={inputclass + " pr-10"}
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>

                        </div>

                        <div className="flex justify-end gap-3 mt-4">
                            <button
                                onClick={() => setOpenPassword(false)}
                                className="px-4 py-2 bg-red-500 text-white rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleChangePassword}
                                className="px-4 py-2 bg-green-600 text-white rounded"
                            >
                                Update Password
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {logOut && (
                <LogOutModal
                    setLogOut={setLogOut}
                    handleLogout={handleLogout}
                />
            )}
        </div>
    );
};

export default MyDetails;
