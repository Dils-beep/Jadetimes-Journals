import React from 'react';
import {
    Settings,
    ShieldCheck,
    Database,
    Layout,
    Bell,
    Lock,
    Globe,
    Server,
    Zap
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const AdminSettings = () => {
    const { user } = useAuth();

    const sections = [
        {
            title: 'General Settings',
            icon: Globe,
            items: [
                { label: 'Journal Name', value: 'Journal of Universal Studies', type: 'text' },
                { label: 'Primary Language', value: 'English (US)', type: 'select' },
                { label: 'Timezone', value: 'UTC+05:30', type: 'select' }
            ]
        },
        {
            title: 'Admin Information',
            icon: ShieldCheck,
            items: [
                { label: 'Current User', value: user?.email, type: 'readonly' },
                { label: 'Role', value: 'Super Administrator', type: 'readonly' },
                { label: 'Access Level', value: 'Full Control', type: 'readonly' }
            ]
        },
        {
            title: 'System & Storage',
            icon: Database,
            items: [
                { label: 'Data Engine', value: 'LocalStorage (Phase 1)', type: 'readonly' },
                { label: 'Auth Provider', value: 'Firebase Authentication', type: 'readonly' },
                { label: 'Cache Control', value: 'Automatic', type: 'toggle' }
            ]
        }
    ];

    return (
        <div className="space-y-10 animate-in fade-in duration-500 pb-20">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">System Settings</h1>
                <p className="text-slate-500 mt-1">Configure your journal's platform behavior and preferences.</p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Left Column: Vertical Nav Link placeholders */}
                <div className="xl:col-span-1 space-y-3">
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-2 overflow-hidden">
                        {[
                            { name: 'General', icon: Globe, active: true },
                            { name: 'Appearance', icon: Layout },
                            { name: 'Notifications', icon: Bell },
                            { name: 'Security', icon: Lock },
                            { name: 'Server Status', icon: Server },
                            { name: 'API Keys', icon: Zap },
                        ].map((item) => (
                            <button
                                key={item.name}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${item.active
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-100'
                                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                                    }`}
                            >
                                <item.icon size={18} />
                                {item.name}
                            </button>
                        ))}
                    </div>

                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white mb-4 shadow-lg shadow-blue-200">
                            <ShieldCheck size={20} />
                        </div>
                        <h4 className="font-bold text-blue-900 text-sm">Deployment Mode</h4>
                        <p className="text-blue-700/70 text-xs mt-1 leading-relaxed">System is currently running in Development mode using LocalStorage persistence engine.</p>
                    </div>
                </div>

                {/* Right Column: Settings Content */}
                <div className="xl:col-span-2 space-y-6">
                    {sections.map((section) => (
                        <div key={section.title} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                            <div className="px-8 py-4 bg-slate-50/50 border-b border-slate-50 flex items-center gap-2">
                                <section.icon size={16} className="text-slate-400" />
                                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">{section.title}</h3>
                            </div>
                            <div className="p-8 space-y-6">
                                {section.items.map((item) => (
                                    <div key={item.label} className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-50 pb-6 last:border-0 last:pb-0">
                                        <div>
                                            <p className="text-sm font-bold text-slate-800">{item.label}</p>
                                            <p className="text-xs text-slate-400 mt-0.5 tracking-tight uppercase font-medium">Administrative Setting</p>
                                        </div>

                                        <div className="w-full md:w-2/3 max-w-sm">
                                            {item.type === 'readonly' ? (
                                                <div className="bg-slate-50 px-4 py-2 rounded-lg border border-slate-100 text-sm text-slate-600 font-medium">
                                                    {item.value}
                                                </div>
                                            ) : item.type === 'toggle' ? (
                                                <div className="flex items-center gap-3">
                                                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Enabled</span>
                                                    <div className="w-10 h-5 bg-blue-600 rounded-full flex items-center justify-end p-1 transition-colors">
                                                        <div className="w-3 h-3 bg-white rounded-full"></div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <input
                                                    type="text"
                                                    defaultValue={item.value}
                                                    className="w-full bg-white border border-slate-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-300 rounded-lg px-4 py-2 text-sm transition-all text-slate-600 font-medium"
                                                />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    <div className="flex justify-end gap-3 pt-4">
                        <button className="px-6 py-2 rounded-xl text-sm font-bold border border-slate-200 text-slate-500 hover:bg-slate-50 transition-all uppercase tracking-widest">Cancel</button>
                        <button className="px-6 py-2 rounded-xl text-sm font-bold bg-blue-600 text-white shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all uppercase tracking-widest">Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
