import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";

const CreateSessionForm = ({ onClose, onSessionCreated }) => {
    const [formData, setFormData] = useState({
        role: "",
        experience: "",
        topicsToFocus: "",
        description: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { role, experience, topicsToFocus } = formData;
        if (!role || !experience || !topicsToFocus) {
            setError("Please fill all the required fields.");
            setLoading(false);
            return;
        }
        setError("");

        try {
            const aiResponse = await axiosInstance.post(
                API_PATHS.AI.GENERATE_QUESTIONS,
                {
                    role,
                    experience,
                    topicsToFocus,
                    numberOfQuestions: 10,
                }
            );

            const generateQuestions = aiResponse.data;

            const response = await axiosInstance.post(
                API_PATHS.SESSIONS.CREATE, {
                ...formData,
                questions: generateQuestions,
            }
            );
            if (onSessionCreated) {
                onSessionCreated(response.data);
            }
            onClose();
        } catch (err) {
            console.error("Error creating session:", err);
            setError(err.response?.data?.message || "Failed to create session");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="animate-fade-in">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-white mb-1">Launch New Prep</h2>
                <p className="text-gray-500 text-xs font-medium">
                    Personalize your focus areas for this session.
                </p>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-xs font-bold animate-fade-in">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-[9px] font-black uppercase tracking-widest text-gray-500 mb-1.5 ml-1">
                        Target Role
                    </label>
                    <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        placeholder="e.g. Frontend Engineer"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#FF9324]/50 focus:border-[#FF9324] transition-all"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[9px] font-black uppercase tracking-widest text-gray-500 mb-1.5 ml-1">
                            Experience
                        </label>
                        <input
                            type="text"
                            name="experience"
                            value={formData.experience}
                            onChange={handleChange}
                            placeholder="e.g. 3 Years"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#FF9324]/50 focus:border-[#FF9324] transition-all"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-[9px] font-black uppercase tracking-widest text-gray-500 mb-1.5 ml-1">
                            Focus Topics
                        </label>
                        <input
                            type="text"
                            name="topicsToFocus"
                            value={formData.topicsToFocus}
                            onChange={handleChange}
                            placeholder="e.g. React, CSS"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#FF9324]/50 focus:border-[#FF9324] transition-all"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-[9px] font-black uppercase tracking-widest text-gray-500 mb-1.5 ml-1">
                        Context (Optional)
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Specific goals..."
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#FF9324]/50 focus:border-[#FF9324] transition-all min-h-[80px] resize-none"
                    />
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-[#FF9324] to-[#ff7b00] text-white rounded-xl hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 flex items-center justify-center gap-2 font-bold text-base shadow-lg shadow-orange-500/20"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <SpinnerLoader size="xs" color="white" />
                                <span className="text-sm">Analyzing...</span>
                            </>
                        ) : (
                            "Start Session"
                        )}
                    </button>
                </div>
            </form>
        </div>


    );
};

export default CreateSessionForm;
