import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LuPlus, LuTrash2 } from "react-icons/lu";
import { toast } from 'react-hot-toast';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import Model from '../../components/Model';
import CreateSessionForm from './CreateSessionForm';
import moment from 'moment';
import SummaryCard from '../../components/Cards/SummaryCard';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import DeleteAlertContent from '../../components/Loader/DeleteAlertContent';
import Modal from '../../components/Model';

const Dashboard = () => {
    const navigate = useNavigate();
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [sessions, setSessions] = useState([]);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({ open: false, data: null });

    const deleteSession = async (sessionId) => {
        try {
            await axiosInstance.delete(API_PATHS.SESSIONS.DELETE(sessionId));
            setSessions(sessions.filter(session => session.id !== sessionId));
            toast.success("Session Deleted Successfully", {
                icon: '✅',
                style: {
                    borderRadius: '50px',
                    background: '#fff',
                    color: '#333',
                    padding: '12px 24px',
                    fontWeight: 'bold',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                },
            });
        }
        catch (error) {
            console.error("Error deleting session:", error);
            toast.error("Failed to delete session");
        }
    };

    useEffect(() => {
        const fetchAllSessions = async () => {
            try {
                const response = await axiosInstance.get(API_PATHS.SESSIONS.GET_ALL);
                setSessions(response.data);
            } catch (error) {
                console.error("Error fetching session data:", error);
            }
        };
        fetchAllSessions();
    }, []);

    return (
        <DashboardLayout>
            <div className="container mx-auto px-4 py-8 pb-32 max-w-7xl relative z-10">
                <div className="mb-8 animate-fade-in">
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
                        Interview Prep <span className="text-gradient">AI</span>
                    </h1>
                    <p className="text-gray-400 text-base font-medium max-w-2xl">
                        Personalized, AI-driven interview simulations.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {sessions?.map((data, index) => (
                        <SummaryCard
                            key={data?.id || index}
                            role={data?.role || ""}
                            topicsToFocus={data?.topicsToFocus || ""}
                            experience={data?.experience || "-"}
                            questions={data?.questions?.length || "-"}
                            description={data?.description || ""}
                            lastUpdated={
                                data?.updatedAt
                                    ? moment(data.updatedAt).format("D MMM YYYY")
                                    : ""
                            }
                            onSelect={() => navigate(`/interview-prep/${data.id}`)}
                            onDelete={() => setOpenDeleteAlert({ open: true, data: data.id })}
                        />
                    ))}
                </div>

                {(!sessions || sessions.length === 0) && (
                    <div className="rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-sm px-6 py-20 text-center animate-fade-in">
                        <div className="max-w-md mx-auto">
                            <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <LuPlus className="text-3xl text-indigo-500" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">No preparation sessions found</h3>
                            <p className="text-gray-400 text-sm font-medium mb-8 leading-relaxed">
                                Ready to ace your next role? Create your first AI-powered interview session.
                            </p>
                            <button 
                                onClick={() => setOpenCreateModal(true)}
                                className="bg-gradient-to-r from-indigo-500 to-violet-600 text-white px-8 py-3 rounded-xl font-bold hover:scale-105 transition-all shadow-xl shadow-indigo-500/20"
                            >
                                Start New Session
                            </button>
                        </div>
                    </div>
                )}

                <button
                    type="button"
                    className="fixed bottom-8 right-8 z-50 flex h-14 items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-6 text-base font-bold text-white shadow-2xl shadow-indigo-500/40 transition-all hover:scale-105 active:scale-95 group"
                    onClick={() => setOpenCreateModal(true)}>
                    <LuPlus className='text-xl font-bold group-hover:rotate-90 transition-transform duration-300' />
                    <span>Create New</span>
                </button>
            </div>



            <Model
                isOpen={openCreateModal}
                onClose={() => setOpenCreateModal(false)}
                hideHeader
            >
                <div>
                    <CreateSessionForm
                        onClose={() => setOpenCreateModal(false)}
                        onSessionCreated={(newSession) => {
                            setSessions((prev) => [newSession, ...prev]);
                        }}
                    />
                </div>
            </Model>

            <Modal
                isOpen={openDeleteAlert?.open}
                onClose={() => {
                    setOpenDeleteAlert({ open: false, data: null });
                }}
                title="Confirm Deletion"
            >
                <div className="w-[30vw] min-w-[320px]">
                    <DeleteAlertContent
                        content="Are you sure you want to delete this session? This action cannot be undone."
                        onDelete={() => {
                            deleteSession(openDeleteAlert.data);
                            setOpenDeleteAlert({ open: false, data: null });
                        }}
                    />
                </div>
            </Modal>
        </DashboardLayout>
    )
}

export default Dashboard;