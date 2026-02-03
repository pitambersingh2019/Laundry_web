export const LogOutModal =({setLogOut,handleLogout }) =>{
    return(
                    <>
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-[400px] shadow-lg">

                        <h4 className="text-lg font-semibold mb-3 text-red-600">
                            Confirm Logout
                        </h4>

                        <p className="text-gray-600 mb-6">
                            Are you sure you want to log out of your account?
                        </p>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setLogOut(false)}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Logout
                            </button>
                        </div>

                    </div>
                </div>
                    </>
    )
}