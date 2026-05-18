import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useParams } from 'react-router-dom';
import { submissionService, journalService } from '../services/api';

const STEPS = [
    { id: 1, label: 'Details' },
    { id: 2, label: 'Upload Files' },
    { id: 3, label: 'Contributors' },
    { id: 4, label: 'For the Editors' },
    { id: 5, label: 'Review' }
];

const SubmitResearch = () => {
    const { user } = useAuth();
    const { journalId } = useParams();
    const [journalTitle, setJournalTitle] = useState(journalId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '));
    const [currentStep, setCurrentStep] = useState(0); // 0 is the "Make a Submission" start page
    const [lastSaved, setLastSaved] = useState(null);
    const fileInputRef = useRef(null);
    const [rawFiles, setRawFiles] = useState([]); // Store actual File objects for upload

    const [formData, setFormData] = useState({
        // Step 0
        title: '',
        section: '',
        checklistAgreed: false,
        privacyAgreed: false,
        // Step 1
        keywords: '',
        abstract: '',
        competingInterests: '',
        // Step 2
        files: [],
        // Step 3
        contributors: [],
        // Step 4
        subjects: '',
        commentsForEditor: '',
        funders: [],
        // Step 5
        confirmed: false
    });

    const [isAddingContributor, setIsAddingContributor] = useState(false);
    const [isAddingFunder, setIsAddingFunder] = useState(false);
    const [tempContributor, setTempContributor] = useState({ name: '', email: '', role: 'Author', affiliation: '' });
    const [tempFunder, setTempFunder] = useState({ name: '', id: '', grant: '' });

    // Load draft on mount
    useEffect(() => {
        const fetchJournalTitle = async () => {
            try {
                const journal = await journalService.getById(journalId);
                if (journal && journal.title) {
                    setJournalTitle(journal.title);
                }
            } catch (err) {
                console.error("Failed to fetch journal title");
            }
        };
        fetchJournalTitle();

        const draft = localStorage.getItem(`jt_submission_draft_${journalId}`);
        if (draft) {
            try {
                const parsed = JSON.parse(draft);
                setFormData(prev => ({ ...prev, ...parsed.data }));
                if (parsed.lastSaved) setLastSaved(new Date(parsed.lastSaved));
                // If they were mid-wizard, we could restore currentStep too, but 0 is safer for now.
            } catch (e) {
                console.error("Failed to parse draft", e);
            }
        }
    }, [journalId]);

    // Also add the user as default contributor if empty
    useEffect(() => {
        if (user && formData.contributors.length === 0) {
            setFormData(prev => ({
                ...prev,
                contributors: [{
                    id: Date.now(),
                    name: user.displayName || 'Author Name',
                    email: user.email,
                    role: 'Author',
                    affiliation: 'PhD Scholar', // Match screenshot placeholder
                    isPrimary: true
                }]
            }));
        }
    }, [user, formData.contributors.length]);

    const saveDraft = () => {
        const now = new Date();
        localStorage.setItem(`jt_submission_draft_${journalId}`, JSON.stringify({
            data: formData,
            lastSaved: now.toISOString()
        }));
        setLastSaved(now);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        const newFilesMetadata = selectedFiles.map(file => ({
            name: file.name,
            size: file.size,
            type: file.type,
            lastModified: file.lastModified
        }));

        setRawFiles(prev => [...prev, ...selectedFiles]);
        setFormData(prev => ({
            ...prev,
            files: [...prev.files, ...newFilesMetadata]
        }));
        saveDraft();
    };

    const triggerFileExplorer = () => {
        fileInputRef.current?.click();
    };

    const nextStep = () => {
        if (currentStep === 0) {
            if (!formData.title || !formData.section || !formData.checklistAgreed || !formData.privacyAgreed) {
                alert("Please fill all required fields and agree to the checklist and privacy statement.");
                return;
            }
        }
        if (currentStep === 1) {
            if (!formData.title || !formData.abstract || !formData.competingInterests) {
                alert("Title, Abstract, and Competing Interests are required.");
                return;
            }
        }
        setCurrentStep(prev => Math.min(prev + 1, 5));
        window.scrollTo(0, 0);
        saveDraft();
    };

    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 0));
        window.scrollTo(0, 0);
    };

    const addContributor = () => {
        if (!tempContributor.name || !tempContributor.email) return;
        setFormData(prev => ({
            ...prev,
            contributors: [...prev.contributors, { ...tempContributor, id: Date.now() }]
        }));
        setTempContributor({ name: '', email: '', role: 'Author', affiliation: '' });
        setIsAddingContributor(false);
        saveDraft();
    };

    const removeContributor = (id) => {
        setFormData(prev => ({
            ...prev,
            contributors: prev.contributors.filter(c => c.id !== id)
        }));
        saveDraft();
    };

    const addFunder = () => {
        if (!tempFunder.name) return;
        setFormData(prev => ({
            ...prev,
            funders: [...prev.funders, { ...tempFunder, id: Date.now() }]
        }));
        setTempFunder({ name: '', id: '', grant: '' });
        setIsAddingFunder(false);
        saveDraft();
    };

    const handleSubmit = async () => {
        if (!formData.confirmed) return;

        try {
            const submissionId = 'sub_' + Date.now();

            const uploadData = new FormData();
            uploadData.append('id', submissionId);
            uploadData.append('title', formData.title);
            uploadData.append('section', formData.section);
            uploadData.append('abstract', formData.abstract);
            uploadData.append('keywords', formData.keywords);
            uploadData.append('competingInterests', formData.competingInterests);
            uploadData.append('subjects', formData.subjects);
            uploadData.append('commentsForEditor', formData.commentsForEditor);
            uploadData.append('checklistAgreed', formData.checklistAgreed);
            uploadData.append('privacyAgreed', formData.privacyAgreed);
            uploadData.append('contributors', JSON.stringify(formData.contributors));
            uploadData.append('funders', JSON.stringify(formData.funders));
            uploadData.append('journalId', journalId);

            // Add actual files
            rawFiles.forEach(file => {
                uploadData.append('files', file);
            });

            await submissionService.create(uploadData);

            // Clear draft
            localStorage.removeItem(`jt_submission_draft_${journalId}`);

            // Go to success page
            setCurrentStep(6);
            window.scrollTo(0, 0);
        } catch (error) {
            console.error("Failed to submit research:", error);
            if (error.response?.status === 401) {
                alert("Your session has expired. Please refresh the page or log out and log back in before submitting again.");
            } else {
                alert("Failed to submit research. Please check your connection and try again.");
            }
        }
    };

    const formatLastSaved = () => {
        if (!lastSaved) return "";
        const diff = Math.floor((new Date() - lastSaved) / 1000);
        if (diff < 60) return "Last saved a few seconds ago";
        if (diff < 3600) return `Last saved ${Math.floor(diff / 60)} minute${Math.floor(diff / 60) > 1 ? 's' : ''} ago`;
        return `Last saved at ${lastSaved.toLocaleTimeString()}`;
    };

    // --- Sub-Components ---

    const Header = () => (
        <div className="bg-[#002b45] text-white py-3 px-4 flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
                <span className="font-bold">{journalTitle}</span>
                <Link to="/submissions" className="text-gray-300 hover:underline">← Back to Submissions</Link>
            </div>
            <div className="flex items-center gap-6">
                <span>]u[ Community Portal</span>
                <span className="flex items-center gap-1 cursor-pointer hover:text-gray-300">
                    <span className="bg-white text-[#002b45] rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">i</span> Help Centre
                </span>
                <span className="flex items-center gap-1 cursor-pointer hover:text-gray-300">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    Latest Updates
                </span>
                <svg className="w-5 h-5 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
            </div>
        </div>
    );

    const Stepper = () => (
        <div className="flex items-center justify-between w-full max-w-5xl mx-auto px-10 py-8 bg-[#f8f9fa] border-b border-gray-200">
            {STEPS.map((step, idx) => {
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;
                return (
                    <React.Fragment key={step.id}>
                        <div className="flex flex-col items-center relative z-10">
                            <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-semibold transition-all duration-300 ${isActive ? 'bg-white border-blue-500 text-blue-500 shadow-md' : isCompleted ? 'bg-blue-500 border-blue-500 text-white' : 'bg-gray-100 border-gray-300 text-gray-400'}`}>
                                {isCompleted ? (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                ) : step.id}
                            </div>
                            <span className={`absolute top-10 whitespace-nowrap text-xs font-medium transition-colors duration-300 ${isActive ? 'text-blue-600 font-bold' : isCompleted ? 'text-gray-700' : 'text-gray-400'}`}>
                                {step.label}
                            </span>
                        </div>
                        {idx < STEPS.length - 1 && (
                            <div className="flex-1 mx-2 h-[2px] bg-gray-200 relative">
                                <div className={`absolute left-0 top-0 h-full bg-blue-500 transition-all duration-500 ease-in-out`} style={{ width: isCompleted ? '100%' : '0%' }}></div>
                            </div>
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );

    const BottomActions = ({ onBack, onContinue, showBack = true, continueText = "Continue" }) => (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-4 px-10 flex items-center justify-between shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-50">
            <div className="flex items-center gap-4">
                {showBack && (
                    <button onClick={onBack} className="px-5 py-2 text-red-500 border border-red-200 rounded text-sm font-semibold hover:bg-red-50 transition-colors">
                        Back
                    </button>
                )}
            </div>
            <div className="flex items-center gap-6">
                <span className="text-xs text-gray-400 italic">{formatLastSaved()}</span>
                <button onClick={saveDraft} className="text-blue-600 text-sm font-semibold hover:underline">Save for Later</button>
                <button
                    onClick={onContinue}
                    className={`px-8 py-2 rounded text-sm font-bold text-white transition-all ${currentStep === 5 && !formData.confirmed ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#00669c] hover:bg-[#005582]'
                        }`}
                >
                    {continueText}
                </button>
            </div>
        </div>
    );

    // --- Steps ---

    const Step0Start = () => (
        <div className="max-w-6xl mx-auto py-12 px-6">
            <h1 className="text-3xl font-medium text-center text-gray-800 mb-12">Make a Submission</h1>

            <div className="space-y-8 max-w-5xl mx-auto">
                {/* Title */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Title <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full p-2 border border-blue-200 rounded focus:border-blue-500 outline-none"
                    />
                </div>

                {/* Section */}
                <fieldset className="border border-gray-200 p-6 rounded relative">
                    <legend className="px-2 text-sm font-bold text-gray-700">Section <span className="text-red-500">*</span></legend>
                    <p className="text-xs text-gray-500 mb-4">Submissions must be made to one of the journal's sections.</p>
                    <div className="space-y-3">
                        {[
                            'Original Articles', 'Short Report', 'Review Article',
                            'Personal View', 'Miscellanea', 'Correspondence',
                            'Three Minute Article for Parents'
                        ].map(sec => (
                            <label key={sec} className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer">
                                <input
                                    type="radio"
                                    name="section"
                                    value={sec}
                                    checked={formData.section === sec}
                                    onChange={handleChange}
                                    className="w-4 h-4 accent-blue-600"
                                />
                                {sec}
                            </label>
                        ))}
                    </div>
                </fieldset>

                {/* Checklist */}
                <fieldset className="border border-gray-200 p-6 rounded relative">
                    <legend className="px-2 text-sm font-bold text-gray-700">Submission Checklist <span className="text-red-500">*</span></legend>
                    <p className="text-xs text-gray-500 mb-4">All submissions must meet the following requirements.</p>
                    <ul className="text-xs text-gray-600 space-y-3 mb-6 list-disc ml-4">
                        <li>The submission has not been previously published, nor is it before another journal for consideration (or an explanation has been provided in Comments to the Editor).</li>
                        <li>The submission file is in Microsoft Word, RTF, or WordPerfect document file format.</li>
                        <li>Where available, URLs for the references have been provided.</li>
                        <li>The font should be Times New Roman and the font size should be 12. Margins should be set to one inch (2.54 cm) right round and there should be 1.5 line space setting.</li>
                        <li>Every effort has been made to ensure that the submission is ready for peer review according to the journal's review policy. If submitting to a peer-reviewed section of the journal, the submitted files (including file properties) have been anonymised.</li>
                        <li>The text adheres to the stylistic and bibliographic requirements outlined in the <span className="text-blue-500 cursor-pointer">Author Guidelines</span>, which is found in About the Journal.</li>
                    </ul>
                    <label className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer">
                        <input
                            type="checkbox"
                            name="checklistAgreed"
                            checked={formData.checklistAgreed}
                            onChange={handleChange}
                            className="w-4 h-4 accent-blue-600"
                        />
                        Yes, my submission meets all of these requirements.
                    </label>
                </fieldset>

                {/* Privacy Consent */}
                <fieldset className="border border-gray-200 p-6 rounded relative">
                    <legend className="px-2 text-sm font-bold text-gray-700">Privacy Consent <span className="text-red-500">*</span></legend>
                    <label className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer">
                        <input
                            type="checkbox"
                            name="privacyAgreed"
                            checked={formData.privacyAgreed}
                            onChange={handleChange}
                            className="w-4 h-4 accent-blue-600"
                        />
                        Yes, I agree to have my data collected and stored according to the <span className="text-blue-500 cursor-pointer">privacy statement</span>.
                    </label>
                </fieldset>

                <button
                    onClick={nextStep}
                    className="w-full bg-[#00669c] text-white py-3 rounded-md font-bold text-sm tracking-wide hover:bg-[#005582] transition-colors"
                >
                    Begin Submission
                </button>
            </div>
        </div>
    );

    const Step1Details = () => (
        <div className="max-w-6xl mx-auto py-10 px-6 mb-20">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        Make a Submission: Details
                    </h2>
                    <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest">11911 / Liyanage / iyrp86</p>
                    <p className="text-xs text-gray-500 mt-1">Submitting to the <span className="font-bold">Original Articles</span> section. <span className="text-blue-500 cursor-pointer">Change</span></p>
                </div>
                <button onClick={saveDraft} className="text-blue-600 text-sm font-semibold border border-blue-200 px-3 py-1 rounded hover:bg-blue-50">Save for Later</button>
            </div>

            <Stepper />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
                <div className="md:col-span-1">
                    <h3 className="font-bold text-gray-800">Submission Details</h3>
                    <p className="text-xs text-gray-500 mt-2 leading-relaxed">Please provide the following details to help us manage your submission in our system.</p>
                </div>
                <div className="md:col-span-2 space-y-8">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-700 uppercase">Title <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 outline-none text-sm"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-700 uppercase">Keywords</label>
                        <p className="text-[11px] text-gray-500 italic">Keywords are typically one- to three-word phrases that are used to indicate the main topics of a submission.</p>
                        <input
                            type="text"
                            name="keywords"
                            value={formData.keywords}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 outline-none text-sm"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-700 uppercase">Abstract <span className="text-red-500">*</span></label>
                        <div className="border border-gray-300 rounded overflow-hidden">
                            <div className="bg-gray-50 border-b border-gray-300 p-2 flex gap-4 text-gray-600">
                                <span className="font-bold cursor-pointer">B</span>
                                <span className="italic cursor-pointer">I</span>
                                <span className="underline cursor-pointer">U</span>
                                <span className="cursor-pointer">x²</span>
                                <span className="cursor-pointer">x₂</span>
                            </div>
                            <textarea
                                name="abstract"
                                rows={8}
                                value={formData.abstract}
                                onChange={handleChange}
                                className="w-full p-3 outline-none text-sm resize-none"
                            ></textarea>
                        </div>
                    </div>
                    <div className="space-y-4 pt-10 border-t border-gray-100">
                        <div className="flex gap-10">
                            <div className="w-1/3">
                                <h3 className="font-bold text-gray-800">Competing Interests</h3>
                                <p className="text-xs text-gray-500 mt-2 leading-relaxed">Journals require authors and reviewers to declare if they have any competing interests with regard to their research (see <span className="text-blue-500 cursor-pointer">Our Policy</span>)</p>
                            </div>
                            <div className="flex-1 space-y-2">
                                <label className="text-xs font-bold text-gray-700 uppercase">Competing Interests <span className="text-red-500">*</span></label>
                                <textarea
                                    name="competingInterests"
                                    rows={6}
                                    value={formData.competingInterests}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-blue-200 rounded focus:border-blue-500 outline-none text-sm"
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <BottomActions onBack={prevStep} onContinue={nextStep} />
        </div>
    );

    const Step2Files = () => (
        <div className="max-w-6xl mx-auto py-10 px-6 mb-20">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-bold">Make a Submission: Upload Files</h2>
                    <p className="text-xs text-gray-500 mt-1">Submitting to the <span className="font-bold">Original Articles</span> section. <span className="text-blue-500 cursor-pointer">Change</span></p>
                </div>
            </div>
            <Stepper />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
                <div className="md:col-span-1">
                    <h3 className="font-bold text-gray-800">Upload Files</h3>
                    <p className="text-xs text-gray-500 mt-2 leading-relaxed">Provide any files our editorial team may need to evaluate your submission. In addition to the main work, you may wish to submit data sets, conflict of interest statements, or other supplementary files if these will be helpful for our editors.</p>
                </div>
                <div className="md:col-span-2">
                    <div className="border border-gray-200 rounded p-6 h-40 flex flex-col items-center justify-center text-center relative bg-white">
                        <div className="absolute top-4 right-4">
                            <button onClick={triggerFileExplorer} className="text-blue-600 text-xs font-bold border border-blue-200 px-3 py-1 rounded hover:bg-blue-50">Add File</button>
                        </div>
                        <input type="file" hidden ref={fileInputRef} onChange={handleFileChange} multiple />
                        {formData.files.length === 0 ? (
                            <p className="text-xs text-gray-500">Upload any files the editorial team will need to evaluate your submission. <span onClick={triggerFileExplorer} className="text-blue-500 cursor-pointer underline">Upload File</span></p>
                        ) : (
                            <div className="w-full space-y-2 overflow-y-auto">
                                {formData.files.map((f, i) => (
                                    <div key={i} className="flex items-center justify-between text-xs p-2 bg-gray-50 rounded border border-gray-100">
                                        <span className="font-medium text-gray-700">{f.name}</span>
                                        <span className="text-gray-400">{(f.size / 1024).toFixed(1)} KB</span>
                                    </div>
                                ))}
                                <p className="text-[10px] text-blue-500 cursor-pointer" onClick={triggerFileExplorer}>+ Add more files</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <BottomActions onBack={prevStep} onContinue={nextStep} />
        </div>
    );

    const Step3Contributors = () => (
        <div className="max-w-6xl mx-auto py-10 px-6 mb-20">
            <h2 className="text-xl font-bold mb-6">Make a Submission: Contributors</h2>
            <Stepper />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
                <div className="md:col-span-1">
                    <h3 className="font-bold text-gray-800">Contributors</h3>
                    <p className="text-xs text-gray-500 mt-2 leading-relaxed">Add details for all of the contributors to this submission. Contributors added here will be sent an email confirmation of the submission, as well as a copy of all editorial decisions recorded against this submission.</p>
                </div>
                <div className="md:col-span-2">
                    <div className="border border-gray-200 rounded bg-white">
                        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <span className="text-sm font-bold text-gray-700">Contributors</span>
                            <div className="flex gap-4">
                                <button className="text-blue-600 text-xs font-semibold">Order</button>
                                <button className="text-blue-600 text-xs font-semibold">Preview</button>
                                <button
                                    onClick={() => setIsAddingContributor(true)}
                                    className="text-blue-600 text-xs font-bold border border-blue-200 px-3 py-1 rounded hover:bg-blue-50"
                                >
                                    Add Contributor
                                </button>
                            </div>
                        </div>
                        <div className="p-4 space-y-4">
                            {formData.contributors.map(c => (
                                <div key={c.id} className="flex items-center justify-between p-4 border border-gray-100 rounded hover:shadow-sm transition-shadow">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-800 flex items-center gap-2">
                                                {c.name} <span className="text-[10px] font-normal border border-gray-200 px-1 rounded text-gray-400">{c.role}</span>
                                            </p>
                                            <p className="text-xs text-gray-400">{c.affiliation}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {c.isPrimary && <span className="bg-[#00669c] text-white text-[10px] px-2 py-0.5 rounded">Primary Contact</span>}
                                        <button className="text-blue-600 text-xs font-semibold px-2">Edit</button>
                                        <button onClick={() => removeContributor(c.id)} className="text-red-500 text-xs font-semibold px-2">Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Contributor Modal */}
            {isAddingContributor && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000] p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
                        <div className="bg-gray-50 p-4 border-b border-gray-200 flex justify-between items-center">
                            <h3 className="font-bold text-gray-700">Add Contributor</h3>
                            <button onClick={() => setIsAddingContributor(false)} className="text-gray-400 hover:text-gray-600">✕</button>
                        </div>
                        <div className="p-6 space-y-4">
                            <input type="text" placeholder="Name" className="w-full p-2 border border-gray-300 rounded text-sm" value={tempContributor.name} onChange={e => setTempContributor({ ...tempContributor, name: e.target.value })} />
                            <input type="email" placeholder="Email" className="w-full p-2 border border-gray-300 rounded text-sm" value={tempContributor.email} onChange={e => setTempContributor({ ...tempContributor, email: e.target.value })} />
                            <input type="text" placeholder="Affiliation" className="w-full p-2 border border-gray-300 rounded text-sm" value={tempContributor.affiliation} onChange={e => setTempContributor({ ...tempContributor, affiliation: e.target.value })} />
                            <select className="w-full p-2 border border-gray-300 rounded text-sm" value={tempContributor.role} onChange={e => setTempContributor({ ...tempContributor, role: e.target.value })}>
                                <option>Author</option>
                                <option>Translator</option>
                                <option>Editor</option>
                            </select>
                        </div>
                        <div className="bg-gray-50 p-4 border-t border-gray-200 flex justify-end gap-3">
                            <button onClick={() => setIsAddingContributor(false)} className="px-4 py-2 text-sm text-gray-600 font-semibold">Cancel</button>
                            <button onClick={addContributor} className="px-4 py-2 text-sm bg-blue-600 text-white rounded font-bold">Add</button>
                        </div>
                    </div>
                </div>
            )}

            <BottomActions onBack={prevStep} onContinue={nextStep} />
        </div>
    );

    const Step4ForEditors = () => (
        <div className="max-w-6xl mx-auto py-10 px-6 mb-20">
            <h2 className="text-xl font-bold mb-6">Make a Submission: For the Editors</h2>
            <Stepper />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
                <div className="md:col-span-1">
                    <h3 className="font-bold text-gray-800">For the Editors</h3>
                    <p className="text-xs text-gray-500 mt-2 leading-relaxed">Please provide the following details in order to help our editorial team manage your submission.</p>
                </div>
                <div className="md:col-span-2 space-y-12">
                    <div className="space-y-4">
                        <label className="text-xs font-bold text-gray-700 uppercase">Subjects</label>
                        <p className="text-[11px] text-gray-500">Subjects will be keywords, key phrases or classification codes that describe a topic of the submission.</p>
                        <input
                            type="text"
                            name="subjects"
                            value={formData.subjects}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 outline-none text-sm"
                        />
                    </div>

                    <div className="space-y-4">
                        <label className="text-xs font-bold text-gray-700 uppercase">Comments for the Editor</label>
                        <textarea
                            name="commentsForEditor"
                            rows={6}
                            value={formData.commentsForEditor}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 outline-none text-sm"
                        ></textarea>
                    </div>

                    <div className="space-y-4 pt-10 border-t border-gray-100">
                        <div className="flex gap-10">
                            <div className="w-1/3">
                                <h3 className="font-bold text-gray-800">Funders</h3>
                                <p className="text-xs text-gray-500 mt-2 leading-relaxed">Please provide information about any institutions which funded the research behind this work.</p>
                            </div>
                            <div className="flex-1">
                                <div className="border border-gray-200 rounded overflow-hidden">
                                    <table className="w-full text-left text-xs">
                                        <thead className="bg-gray-50 border-b border-gray-200">
                                            <tr>
                                                <th className="px-4 py-2 font-bold text-gray-700">Funder name</th>
                                                <th className="px-4 py-2 font-bold text-gray-700">Funder ID</th>
                                                <th className="px-4 py-2 font-bold text-gray-700">Grant numbers</th>
                                                <th className="px-4 py-2"></th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {formData.funders.length === 0 ? (
                                                <tr>
                                                    <td colSpan="4" className="px-4 py-8 text-center text-gray-400 italic">No funders added yet.</td>
                                                </tr>
                                            ) : (
                                                formData.funders.map(f => (
                                                    <tr key={f.id} className="hover:bg-gray-50 transition-colors">
                                                        <td className="px-4 py-3 text-gray-800 font-medium">{f.name}</td>
                                                        <td className="px-4 py-3 text-gray-600">{f.id || '-'}</td>
                                                        <td className="px-4 py-3 text-gray-600">{f.grant || '-'}</td>
                                                        <td className="px-4 py-3 text-right">
                                                            <button onClick={() => {
                                                                setFormData(p => ({ ...p, funders: p.funders.filter(x => x.id !== f.id) }));
                                                                saveDraft();
                                                            }} className="text-red-400 hover:text-red-600 transition-colors">✕</button>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                    <div className="p-3 bg-gray-50/50 border-t border-gray-100 flex justify-end">
                                        <button
                                            onClick={() => setIsAddingFunder(true)}
                                            className="text-blue-600 text-xs font-bold border border-blue-200 px-3 py-1 bg-white rounded hover:bg-blue-50 transition-colors"
                                        >
                                            Add Funder
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Funder Modal */}
            {isAddingFunder && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000] p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
                        <div className="bg-gray-50 p-4 border-b border-gray-200 flex justify-between items-center">
                            <h3 className="font-bold text-gray-700">Add Funder</h3>
                            <button onClick={() => setIsAddingFunder(false)} className="text-gray-400 hover:text-gray-600">✕</button>
                        </div>
                        <div className="p-6 space-y-4">
                            <input type="text" placeholder="Funder Name" className="w-full p-2 border border-gray-300 rounded text-sm" value={tempFunder.name} onChange={e => setTempFunder({ ...tempFunder, name: e.target.value })} />
                            <input type="text" placeholder="Funder ID (e.g. CrossRef ID)" className="w-full p-2 border border-gray-300 rounded text-sm" value={tempFunder.id} onChange={e => setTempFunder({ ...tempFunder, id: e.target.value })} />
                            <input type="text" placeholder="Grant Numbers" className="w-full p-2 border border-gray-300 rounded text-sm" value={tempFunder.grant} onChange={e => setTempFunder({ ...tempFunder, grant: e.target.value })} />
                        </div>
                        <div className="bg-gray-50 p-4 border-t border-gray-200 flex justify-end gap-3">
                            <button onClick={() => setIsAddingFunder(false)} className="px-4 py-2 text-sm text-gray-600 font-semibold">Cancel</button>
                            <button onClick={addFunder} className="px-4 py-2 text-sm bg-blue-600 text-white rounded font-bold">Add</button>
                        </div>
                    </div>
                </div>
            )}

            <BottomActions onBack={prevStep} onContinue={nextStep} />
        </div>
    );

    const Step5Review = () => (
        <div className="max-w-6xl mx-auto py-10 px-6 mb-20">
            <h2 className="text-xl font-bold mb-6">Make a Submission: Review</h2>
            <Stepper />
            <div className="mt-12 space-y-6">
                <p className="text-sm text-gray-600">Review the information you have entered before you complete your submission. You can go back to any step to make changes.</p>

                {/* Summary Cards */}
                <div className="flex flex-col lg:flex-row gap-10">
                    <div className="lg:w-1/3">
                        <h3 className="font-bold text-gray-800">Review and Submit</h3>
                        <p className="text-xs text-gray-500 mt-2 leading-relaxed">Review the information you have entered before you complete your submission. You can change any of the details displayed here by clicking the edit button at the top of each section.</p>
                        <p className="text-xs text-gray-500 mt-4 leading-relaxed">Once you complete your submission, a member of our editorial team will be assigned to review it. Please ensure the details you have entered here are as accurate as possible.</p>
                    </div>

                    <div className="flex-1 space-y-4">
                        <div className="border border-gray-200 rounded bg-white shadow-sm overflow-hidden">
                            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
                                <span className="text-xs font-bold text-gray-700">Details</span>
                                <button onClick={() => setCurrentStep(1)} className="text-blue-600 text-xs font-bold uppercase">Edit</button>
                            </div>
                            <div className="p-5 space-y-4">
                                <div>
                                    <h5 className="text-[10px] font-bold text-gray-400 uppercase">Title</h5>
                                    <p className="text-sm text-gray-800">{formData.title || '(No Title)'}</p>
                                </div>
                                <div>
                                    <h5 className="text-[10px] font-bold text-gray-400 uppercase">Keywords</h5>
                                    <p className="text-sm text-gray-800">{formData.keywords || 'None provided'}</p>
                                </div>
                                <div>
                                    <h5 className="text-[10px] font-bold text-gray-400 uppercase">Abstract</h5>
                                    <p className="text-sm text-gray-600 line-clamp-3">{formData.abstract || 'None provided'}</p>
                                </div>
                            </div>
                        </div>

                        <div className="border border-gray-200 rounded bg-white shadow-sm overflow-hidden">
                            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
                                <span className="text-xs font-bold text-gray-700">Files</span>
                                <button onClick={() => setCurrentStep(2)} className="text-blue-600 text-xs font-bold uppercase">Edit</button>
                            </div>
                            <div className="p-5">
                                {formData.files.length === 0 ? (
                                    <p className="text-xs text-gray-400 italic">No files uploaded.</p>
                                ) : (
                                    <ul className="space-y-2">
                                        {formData.files.map((f, i) => (
                                            <li key={i} className="text-sm text-gray-700 flex items-center gap-2">
                                                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"></path></svg>
                                                {f.name}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>

                        <div className="border border-gray-200 rounded bg-white shadow-sm overflow-hidden">
                            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
                                <span className="text-xs font-bold text-gray-700">Contributors</span>
                                <button onClick={() => setCurrentStep(3)} className="text-blue-600 text-xs font-bold uppercase">Edit</button>
                            </div>
                            <div className="p-5 space-y-4">
                                {formData.contributors.map(c => (
                                    <div key={c.id} className="flex items-center justify-between group">
                                        <div>
                                            <p className="text-sm font-bold text-gray-800">{c.name}</p>
                                            <p className="text-xs text-gray-500">{c.affiliation} | {c.email}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            {c.isPrimary && <span className="bg-[#00669c] text-white text-[10px] px-2 py-0.5 rounded">Primary Contact</span>}
                                            <span className="text-[10px] border border-gray-200 px-2 py-0.5 rounded text-gray-400 capitalize">{c.role}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="border border-gray-200 rounded bg-white shadow-sm overflow-hidden">
                            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
                                <span className="text-xs font-bold text-gray-700">For the Editors</span>
                                <button onClick={() => setCurrentStep(4)} className="text-blue-600 text-xs font-bold uppercase">Edit</button>
                            </div>
                            <div className="p-5 space-y-4">
                                <div>
                                    <h5 className="text-[10px] font-bold text-gray-400 uppercase">Subjects</h5>
                                    <p className="text-sm text-gray-800">{formData.subjects || 'None provided'}</p>
                                </div>
                                <div>
                                    <h5 className="text-[10px] font-bold text-gray-400 uppercase">Comments for the Editor</h5>
                                    {formData.commentsForEditor ? (
                                        <p className="text-sm text-gray-800 whitespace-pre-wrap">{formData.commentsForEditor}</p>
                                    ) : (
                                        <div className="p-3 border border-red-100 bg-red-50/30 rounded flex items-center gap-2 text-red-500">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                                            <span className="text-[10px] font-medium">No comments for the editor have been added for this submission.</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="border border-gray-200 rounded bg-white shadow-sm overflow-hidden">
                            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
                                <span className="text-xs font-bold text-gray-700">Funders</span>
                                <button onClick={() => setCurrentStep(4)} className="text-blue-600 text-xs font-bold uppercase">Edit</button>
                            </div>
                            <div className="p-0 overflow-x-auto">
                                <table className="w-full text-left text-[10px]">
                                    <thead className="bg-gray-50 border-b border-gray-200">
                                        <tr>
                                            <th className="px-4 py-2 font-bold text-gray-700 uppercase">Funder name</th>
                                            <th className="px-4 py-2 font-bold text-gray-700 uppercase">Funder ID</th>
                                            <th className="px-4 py-2 font-bold text-gray-700 uppercase">Grant numbers</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 text-[11px]">
                                        {formData.funders.length === 0 ? (
                                            <tr>
                                                <td colSpan="3" className="px-4 py-4 text-gray-400 italic">None provided</td>
                                            </tr>
                                        ) : (
                                            formData.funders.map(f => (
                                                <tr key={f.id} className="hover:bg-gray-50">
                                                    <td className="px-4 py-3 text-gray-800">{f.name}</td>
                                                    <td className="px-4 py-3 text-gray-600">{f.id || '-'}</td>
                                                    <td className="px-4 py-3 text-gray-600">{f.grant || '-'}</td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pt-16 mt-16 border-t border-gray-200">
                    <div className="lg:col-span-1 text-center lg:text-left">
                        <h3 className="font-bold text-gray-800">Confirmation</h3>
                        <p className="text-xs text-gray-500 mt-2 leading-relaxed">Please confirm the following before you submit.</p>
                    </div>

                    <div className="lg:col-span-2">
                        <fieldset className="border border-gray-200 p-8 rounded-lg bg-white relative">
                            <legend className="px-4 text-xs font-bold text-gray-700 uppercase tracking-widest">Copyright</legend>
                            <p className="text-xs text-gray-600 mb-6 leading-relaxed">Please read and understand the copyright terms for submissions to this journal.</p>

                            <div className="space-y-6 text-[11px] text-gray-700 leading-relaxed border-l-4 border-blue-500 pl-6 py-2 bg-blue-50/20 mb-8">
                                <p>Copyright <span className="font-bold">on any research article in the Journal of Universal Studies</span> is retained by the author(s).</p>
                                <p><span className="font-bold">The authors grant the Journal of Universal Studies a licence to publish the article and to identify itself as the original publisher.</span></p>
                                <div className="p-4 border border-blue-100 bg-white rounded flex items-center gap-6">
                                    <img src="https://mirrors.creativecommons.org/presskit/buttons/88x31/png/by.png" alt="CC BY" className="h-10" />
                                    <div>
                                        <p className="font-bold text-blue-600 mb-1">Creative Commons Licence</p>
                                        <p>This work is licensed under a <span className="text-blue-500 underline cursor-pointer">Creative Commons Attribution 4.0 International License</span>.</p>
                                        <p className="mt-2 text-gray-500 italic">This licence permits use, distribution and reproduction in any medium, <span className="font-bold">provided</span> the original work is properly cited.</p>
                                    </div>
                                </div>
                            </div>

                            <label className="flex items-center gap-3 p-4 bg-gray-50 rounded border border-gray-200 group cursor-pointer hover:border-blue-300 transition-colors">
                                <input
                                    type="checkbox"
                                    name="confirmed"
                                    checked={formData.confirmed}
                                    onChange={handleChange}
                                    className="w-5 h-5 accent-[#00669c]"
                                />
                                <span className="text-sm font-medium text-gray-700">Yes, I agree to the copyright statement.</span>
                            </label>
                        </fieldset>
                    </div>
                </div>
            </div>
            <BottomActions onBack={prevStep} onContinue={handleSubmit} continueText="Submit Submission" />
        </div>
    );

    return (
        <div className="bg-[#f2f4f6] min-h-screen">
            <Header />
            <main className="pb-24">
                {currentStep === 0 && <Step0Start />}
                {currentStep === 1 && <Step1Details />}
                {currentStep === 2 && <Step2Files />}
                {currentStep === 3 && <Step3Contributors />}
                {currentStep === 4 && <Step4ForEditors />}
                {currentStep === 5 && <Step5Review />}
                {currentStep === 6 && (
                    <div className="max-w-6xl mx-auto py-24 px-6 text-center">
                        <div className="bg-white border border-gray-200 rounded-lg p-16 shadow-sm">
                            <h1 className="text-4xl font-light text-gray-800 mb-8">Submission complete</h1>
                            <p className="text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                                The journal has been notified of your submission, and you've been emailed a confirmation for your records. Once the editor has reviewed the submission, they will contact you.
                            </p>

                            <div className="flex flex-col items-start max-w-md mx-auto bg-gray-50 border border-gray-100 p-8 rounded text-left">
                                <p className="text-xs font-bold text-gray-400 uppercase mb-4 tracking-widest">For now, you can:</p>
                                <ul className="space-y-3">
                                    <li><Link to="/submissions" className="text-blue-600 hover:underline flex items-center gap-2">Review this submission</Link></li>
                                    <li><button onClick={() => setCurrentStep(0)} className="text-blue-600 hover:underline flex items-center gap-2 text-left">Create a new submission</button></li>
                                    <li><Link to="/profile" className="text-blue-600 hover:underline flex items-center gap-2">Return to your dashboard</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default SubmitResearch;
