"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getUserEvaluationById } from "@/services/evaluation";

export default function Page() {
  const { user } = useAuth();
  const { id } = useParams();

  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadEvaluation() {
      if (!user?.uid || !id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const data = await getUserEvaluationById(user.uid, id);
        setEvaluation(data);
      } catch (err) {
        setError("Failed to load evaluation.");
      } finally {
        setLoading(false);
      }
    }

    loadEvaluation();
  }, [user, id]);

  const createdDate = evaluation?.createdAt?.toDate
    ? evaluation.createdAt.toDate().toLocaleDateString()
    : "No date";
  const scoreBreakdownEntries = evaluation?.scoreBreakdown
    ? Object.entries(evaluation.scoreBreakdown)
    : [];
  const totalBreakdownScore = scoreBreakdownEntries.length > 0
    ? scoreBreakdownEntries.reduce((sum, [, value]) => sum + Number(value || 0), 0)
    : null;

  if (loading) {
    return (
      <div className="flex min-h-[240px] items-center justify-center rounded-3xl border border-white/10 bg-[#111111] px-6 py-10">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/15 border-t-white" />
      </div>
    );
  }

  if (error) {
    return <div className="rounded-3xl border border-red-400/20 bg-[#111111] px-6 py-10 text-sm text-red-300">{error}</div>;
  }

  if (!evaluation) {
    return <div className="rounded-3xl border border-white/10 bg-[#111111] px-6 py-10 text-sm text-white/60">Evaluation not found.</div>;
  }

  return (
    <section className="space-y-6">
      <div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/45">Evaluation</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">{evaluation.jobRole || "Evaluation"}</h1>
          <p className="mt-2 text-sm text-white/60">{evaluation.companyName || "Unknown company"}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <details className="rounded-3xl border border-white/10 bg-[#111111] p-6">
            <summary className="cursor-pointer list-none text-lg font-semibold text-white">
              Job Description
            </summary>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-white/70">
              {evaluation.jobDescription || "No job description saved."}
            </p>
          </details>

          <details className="rounded-3xl border border-white/10 bg-[#111111] p-6">
            <summary className="cursor-pointer list-none text-lg font-semibold text-white">
              Resume
            </summary>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-white/70">
              {evaluation.resumeText || "No resume text saved."}
            </p>
          </details>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-[#111111] p-6">
            <h3 className="text-lg font-semibold text-white">Overview</h3>
            <div className="mt-4 space-y-4 text-sm text-white/70">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/45">Date</p>
                <p className="mt-1">{createdDate}</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#111111] p-6">
            <h3 className="text-lg font-semibold text-white">Score Breakdown</h3>
            {scoreBreakdownEntries.length > 0 ? (
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-3">
                  <p className="text-sm font-medium text-white">Total Score</p>
                  <p className="text-sm font-semibold text-white">{totalBreakdownScore}</p>
                </div>
                {scoreBreakdownEntries.map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between rounded-xl border border-white/8 bg-[#171717] px-4 py-3">
                    <p className="text-sm text-white/70">
                      {key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())}
                    </p>
                    <p className="text-sm font-semibold text-white">{value}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-3 text-sm text-white/60">No score breakdown available.</p>
            )}
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#111111] p-6">
            <h3 className="text-lg font-semibold text-white">Missing Keywords</h3>
            {(evaluation.missingKeywords || []).length > 0 ? (
              <ul className="mt-3 space-y-2 text-sm text-white/70">
                {(evaluation.missingKeywords || []).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-white/60">No missing keywords recorded.</p>
            )}
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#111111] p-6">
            <h3 className="text-lg font-semibold text-white">Suggested Skills</h3>
            {(evaluation.suggestedSkills || []).length > 0 ? (
              <ul className="mt-3 space-y-2 text-sm text-white/70">
                {(evaluation.suggestedSkills || []).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-white/60">No suggested skills available.</p>
            )}
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#111111] p-6">
            <h3 className="text-lg font-semibold text-white">Strengths</h3>
            {(evaluation.strengths || []).length > 0 ? (
              <ul className="mt-3 space-y-2 text-sm text-white/70">
                {(evaluation.strengths || []).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-white/60">No strengths available.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
