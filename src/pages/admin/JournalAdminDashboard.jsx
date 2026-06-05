import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { submissionService } from '../../services/api';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

export default function JournalAdminDashboard() {
  const { id: journalId } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const data = await submissionService.getSubmissionsByJournal(journalId);
      setSubmissions(data);
    } catch (e) {
      console.error('Failed to fetch journal submissions', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [journalId]);

  const handleAccept = async (submissionId) => {
    setProcessingId(submissionId);
    try {
      await submissionService.acceptSubmission(submissionId);
      // Refresh list after acceptance
      await fetchSubmissions();
    } catch (e) {
      console.error('Failed to accept submission', e);
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 italic">
        Loading submissions...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Journal Admin Dashboard</h1>
      <p className="mb-4 text-gray-600">
        Managing submissions for journal: <strong>{journalId}</strong>
      </p>

      {submissions.length === 0 ? (
        <p className="text-gray-500">No submissions found for this journal.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {submissions.map((s) => (
            <div key={s.id} className="border rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
              <h2 className="font-semibold text-lg mb-2 line-clamp-2">{s.title}</h2>
              <p className="text-sm text-gray-600 mb-2">Status: {s.status}</p>
              <div className="flex items-center space-x-2 mt-3">
                {s.status !== 'accepted' && (
                  <button
                    onClick={() => handleAccept(s.id)}
                    disabled={processingId === s.id}
                    className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-1 px-3 rounded"
                  >
                    <CheckCircle className="w-4 h-4" /> Accept
                  </button>
                )}
                {s.status === 'accepted' && (
                  <span className="flex items-center gap-1 text-emerald-600 text-sm font-medium">
                    <CheckCircle className="w-4 h-4" /> Accepted
                  </span>
                )}
                <Link
                  to={`/submissions/${s.id}`}
                  className="ml-auto text-blue-600 hover:underline text-sm"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
