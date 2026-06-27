import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment"; 
import { toast } from "react-hot-toast";
import { LuSettings, LuGlobe, LuPlay, LuSettings2 } from "react-icons/lu";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import RoleInfoHeader from "./components/RoleInfoHeader";
import QuestionCard from "../../components/Cards/QuestionCard";
import Drawer from "../../components/Drawer";
import AIResponsePreview from "./components/AIResponsePreview";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import { AuthContext } from '../../context/AuthContext.jsx';
import ProfileButton from '../../components/layouts/ProfileButton';

const NewInterviewPrep = () => {
    const { sessionId } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [sessionData, setSessionData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [explanationData, setExplanationData] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [loadingExplanation, setLoadingExplanation] = useState(false);
    const [isBilingual, setIsBilingual] = useState(false);

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
            setDrawerOpen(true);
            setExplanationData(null); 

            const response = await axiosInstance.post(API_PATHS.AI.GENERATE_EXPLANATION, {
                question: questionObj.question
            });
            setExplanationData(response.data);
        } catch (error) {
            console.error("Error generating explanation:", error);
            toast.error("Failed to generate explanation");
            setDrawerOpen(false);
        } finally {
            setLoadingExplanation(false);
        }
    };

    if (loading) {
        return (
            <div className="w-full min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <SpinnerLoader size="xl" color="indigo" />
            </div>
        );
    }

    if (!sessionData) {
        return (
            <div className="w-full min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <div className="text-center animate-fade-in">
                    <h2 className="text-3xl font-bold text-white mb-6">Session not found</h2>
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="bg-gradient-to-r from-indigo-500 to-violet-600 text-white px-8 py-3 rounded-2xl font-bold hover:scale-105 transition-all shadow-xl shadow-indigo-500/20"
                    >
                        Return to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-[#0a0a0a] relative overflow-x-hidden text-white selection:bg-indigo-500/30">
            {/* Soft Background Blurs */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse-glow"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
                {/* Header */}
                <header className="flex justify-between items-center py-5">
                    <div
                        className="text-xl font-bold cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => navigate('/')}
                    >
                        <span className="text-white"><span className="text-indigo-400">Prep</span>AI</span>
                    </div>

                    
                    <div className="flex items-center gap-4">
                        <ProfileButton />
                    </div>
                </header>

                <div className="py-2">
                    <div className="animate-fade-in">
                        <RoleInfoHeader
                            role={sessionData.role}
                            topicsToFocus={sessionData.topicsToFocus}
                            experience={sessionData.experience}
                            lastUpdated={moment(sessionData.updatedAt).format("Do MMM YYYY")}
                            questions={sessionData.questions?.length || 0}
                        />
                    </div>

                    <div className="mt-8 pb-20">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold text-white tracking-tight">Interview Q & A</h3>
                            <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-gray-400">
                                {sessionData.questions?.length || 0} Modules
                            </div>
                        </div>

                        <div className="space-y-4 max-w-4xl mx-auto">
                            {sessionData.questions && sessionData.questions.length > 0 ? (
                                sessionData.questions.map((q, index) => (
                                    <div key={q.id || index} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                                        <QuestionCard
                                            question={q.question}
                                            answer={q.answer}
                                            onLearnMore={() => handleGenerateExplanation(q)}
                                        />
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-10 bg-white/[0.02] rounded-[1.5rem] border border-dashed border-white/10">
                                    <p className="text-gray-500 font-bold">No questions found.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>


            <Drawer
                isOpen={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                title={loadingExplanation ? "AI Analysis in Progress" : (explanationData?.title || "Deep Insights")}
            >
                {loadingExplanation ? (
                    <div className="flex flex-col items-center justify-center h-64 space-y-6">
                        <SpinnerLoader size="xl" color="indigo" />
                        <div className="text-center">
                            <p className="text-white font-bold text-lg mb-1 animate-pulse">Analyzing Concepts</p>
                            <p className="text-gray-500 text-sm">Synthesizing personalized feedback...</p>
                        </div>
                    </div>
                ) : explanationData ? (
                    <div className="text-gray-200">
                        <AIResponsePreview content={explanationData.explanation} />
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-red-400 font-bold">Failed to load explanation. Please try again.</p>
                    </div>
                )}
            </Drawer>
        </div>

    );
};

export default NewInterviewPrep;
