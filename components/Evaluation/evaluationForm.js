"use client"
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { saveEvaluation } from "@/services/evaluation";
import { useState } from "react";


export default function EvaluationForm(){

    const { user } = useAuth();
    const router = useRouter();
    const [companyName, setCompanyName] = useState("");
    const [jobRole, setJobRole] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [resumeText, setResumeText] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!jobDescription.trim() || !resumeText.trim()) {
            setError("Job description and resume are required.");
            return;
        }

        if (!user?.uid){
            setError("you must be signed in.")
            return;
        }
        try {
            setLoading(true);
      
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_EVALUATION_API_URL}/analyze`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  resume_text: resumeText,
                  job_description: jobDescription,
                }),
              }
            );
      
            if (!response.ok) {
              throw new Error("Evaluation request failed.");
            }
      
            const result = await response.json();
      
            const evaluationData = {
              companyName,
              jobRole,
              jobDescription,
              resumeText,
              score: result.match_score,
              scoreBreakdown: result.score_breakdown,
              missingKeywords: result.missing_keywords,
              suggestedSkills: result.suggested_skills,
              strengths: result.strengths,
            };
      
            const newEvaluationId = await saveEvaluation(user.uid, evaluationData);
      
            router.push(`/evaluation/${newEvaluationId}`);
        }
        catch (error) {
            setError("Failed to submit evaluation.");
        }
        finally {
            setLoading(false)
        }
    }

    return(
        <div className="mx-auto w-full max-w-4xl">
            <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-[#111111] p-6 md:p-7">
                <div className="mb-6 text-center">
                    <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/45">New Evaluation</p>
                    <h1 className="mt-3 text-2xl font-semibold tracking-tight text-white">Evaluate A Resume</h1>
                    <p className="mt-2 text-sm text-white/60">
                        Paste the job description and resume text below to generate an evaluation.
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="company-name" className="text-sm font-medium text-white/85">Company Name</label>
                        <input
                            id="company-name"
                            name="companyName"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            placeholder="Acme Inc."
                            className="rounded-[10px] border border-white/12 bg-[#1D1D1D] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-white/25"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="job-role" className="text-sm font-medium text-white/85">Job Role</label>
                        <input
                            id="job-role"
                            name="jobRole"
                            value={jobRole}
                            onChange={(e) => setJobRole(e.target.value)}
                            placeholder="Frontend Developer"
                            className="rounded-[10px] border border-white/12 bg-[#1D1D1D] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-white/25"
                        />
                    </div>
                </div>

                <div className="mt-4 flex flex-col gap-1.5">
                    <label htmlFor="job-description" className="text-sm font-medium text-white/85">Job Description</label>
                    <textarea
                        id="job-description"
                        name="jobDescription"
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        placeholder="Paste the full job description here..."
                        rows={8}
                        className="min-h-48 rounded-[10px] border border-white/12 bg-[#1D1D1D] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-white/25"
                    />
                </div>

                <div className="mt-4 flex flex-col gap-1.5">
                    <label htmlFor="resume-text" className="text-sm font-medium text-white/85">Paste Resume</label>
                    <textarea
                        id="resume-text"
                        name="resumeText"
                        value={resumeText}
                        onChange={(e) => setResumeText(e.target.value)}
                        placeholder="Paste the resume content here..."
                        rows={10}
                        className="min-h-56 rounded-[10px] border border-white/12 bg-[#1D1D1D] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-white/25"
                    />
                </div>

                {error && (
                    <p className="mt-4 rounded-[10px] border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                        {error}
                    </p>
                )}

                <div className="mt-6 flex justify-center">
                    <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex items-center justify-center rounded-[10px] bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {loading ? "Evaluating..." : "Evaluate Resume"}
                    </button>
                </div>
            </form>
        </div>
    )
}
