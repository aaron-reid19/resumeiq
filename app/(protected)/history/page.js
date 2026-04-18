"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { getUserEvaluations } from "@/services/evaluation";

export default function Page() {
  const { user } = useAuth();

  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadEvaluations() {
      if (!user?.uid) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const data = await getUserEvaluations(user.uid);
        setEvaluations(data);
      } catch (err) {
        setError("Failed to load evaluation history.");
      } finally {
        setLoading(false);
      }
    }

    loadEvaluations();
  }, [user]);

  if (loading) {
    return <div className="rounded-3xl border border-white/10 bg-[#111111] px-6 py-10 text-sm text-white/60">Loading history...</div>;
  }

  if (error) {
    return <div className="rounded-3xl border border-red-400/20 bg-[#111111] px-6 py-10 text-sm text-red-300">{error}</div>;
  }

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-3">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/45">History</p>
        <h1 className="text-3xl font-semibold tracking-tight text-white">Evaluation History</h1>
        <p className="max-w-xl text-sm text-white/60">Review all saved resume evaluations.</p>
      </div>

      {evaluations.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-[#111111] p-6 md:p-7">
          <div className="flex flex-col items-start gap-4">
            <div>
              <h3 className="text-xl font-semibold text-white">No evaluations yet</h3>
              <p className="mt-2 text-sm text-white/60">Your completed evaluations will appear here.</p>
            </div>
            <Link
              href="/evaluation/new"
              className="inline-flex items-center justify-center rounded-[12px] border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              Start Evaluation
            </Link>
          </div>
        </div>
      ) : (
        <div className="rounded-3xl border border-white/10 bg-[#111111] p-6 md:p-7">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">Saved Evaluations</h3>
            <p className="text-xs uppercase tracking-[0.18em] text-white/40">{evaluations.length} total</p>
          </div>
          {evaluations.map((evaluation) => (
            <Link key={evaluation.id} href={`/evaluation/${evaluation.id}`} className="block">
              <div className="flex items-center justify-between rounded-2xl border border-white/8 bg-[#171717] px-4 py-4 transition-colors hover:bg-[#1d1d1d]">
                <div>
                  <p className="text-sm font-medium text-white">{evaluation.jobRole || evaluation.title || "Untitled Evaluation"}</p>
                  <p className="mt-1 text-xs text-white/50">{evaluation.companyName || "Unknown company"}</p>
                </div>

                <div className="text-right">
                  <p className="text-sm font-semibold text-white/80">{evaluation.score+"%" ?? "--"}</p>
                  <p className="mt-1 text-xs text-white/50">
                    {evaluation.createdAt?.toDate
                      ? evaluation.createdAt.toDate().toLocaleDateString()
                      : "No date"}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
