import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import { toast } from "react-hot-toast";
import axiosInstance from "../../../utils/axiosInstance";
import { API_PATHS } from "../../../utils/apiPaths";
import RoleInfoHeader from "./RoleInfoHeader";
import QuestionCard from "../../../components/Cards/QuestionCard";
import Drawer from "../../../components/Drawer";
import AIResponsePreview from "./AIResponsePreview";
import SpinnerLoader from "../../../components/Loader/SpinnerLoader";
import Navbar from "../../../components/layouts/Navbar";

const InterviewPrep = () => {
    const { sessionId } = useParams();
    const navigate = useNavigate();
    const [sessionData, setSessionData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [explanationData, setExplanationData] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [loadingExplanation, setLoadingExplanation] = useState(false);

    useEffect(() => {
        fetchSessionData();
    }, [sessionId]);

    const fetchSessionData = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(API_PATHS.SESSIONS.GET_BY_ID(sessionId));
            setSessionData(response.data.session);
        } catch (error) {
            console.error("Error fetching session data:", error);
            toast.error("Failed to load session data");
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateExplanation = async (questionObj) => {
        try {
            setLoadingExplanation(true);
            setDrawerOpen(true); // Open drawer immediately to show loading state
            setExplanationData(null); // Clear previous

            const response = await axiosInstance.post(API_PATHS.AI.GENERATE_EXPLANATION, {
                question: questionObj.question
            });
            // The AI returns { title: "...", explanation: "..." } based on prompts.js
            setExplanationData(response.data);
        } catch (error) {
            console.error("Error generating explanation:", error);
            toast.error("Failed to generate explanation");
            setDrawerOpen(false); // Close if failed
        } finally {
            setLoadingExplanation(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <SpinnerLoader />
            </div>
        );
    }

    if (!sessionData) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Session not found</h2>
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                    >
                        Go to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            {/* Navbar (assumed from layout based on screenshots) */}
            <Navbar />

            <div className="container mx-auto px-4 md:px-8 py-8">
                {/* Role Header Component */}
                <RoleInfoHeader
                    role={sessionData.role}
                    topicsToFocus={sessionData.topicsToFocus}
                    experience={sessionData.experience}
                    lastUpdated={moment(sessionData.updatedAt).format("Do MMM YYYY")}
                    questions={sessionData.questions?.length || 0}
                />

                {/* Questions List */}
                <div className="mt-10 max-w-4xl">
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Interview Q & A</h3>
                    <div className="space-y-4">
                        {sessionData.questions && sessionData.questions.length > 0 ? (
                            sessionData.questions.map((q, index) => (
                                <QuestionCard
                                    key={q.id || index}
                                    question={q.question}
                                    answer={q.answer}
                                    isPinned={q.isPinned === 1}
                                    onLearnMore={() => handleGenerateExplanation(q)}
                                    // For a full implementation, add an actual onTogglePin endpoint and handler 
                                    onTogglePin={() => toast.success("Pin feature coming soon")}
                                />
                            ))
                        ) : (
                            <p className="text-gray-500">No questions found for this session.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Right Side Drawer for Explanations */}
            <Drawer
                isOpen={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                title={loadingExplanation ? "Generating Insights..." : (explanationData?.title || "AI Explanation")}
            >
                {loadingExplanation ? (
                    <div className="flex flex-col items-center justify-center h-40 space-y-4">
                        <SpinnerLoader size="lg" color="orange" />
                        <p className="text-gray-500 animate-pulse">Our AI is analyzing the concepts...</p>
                    </div>
                ) : explanationData ? (
                    <div className="text-gray-700">
                        <AIResponsePreview content={explanationData.explanation} />
                    </div>
                ) : (
                    <p className="text-gray-500">Failed to load explanation.</p>
                )}
            </Drawer>
        </div>
    );
};

export default InterviewPrep;
