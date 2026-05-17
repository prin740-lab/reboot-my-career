import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "내 일 나침반 — 50대를 위한 직업 추천" },
      { name: "description", content: "버튼 몇 번으로 나에게 맞는 직업과 자격증을 찾아보세요." },
    ],
  }),
  component: App,
});

type Industry = "음식점" | "소매" | "서비스" | "제조";
type Age = "40대" | "50대" | "60대";
type Personality = "사람 만나는 게 좋다" | "혼자 집중하는 게 좋다";

type Job = {
  name: string;
  reason: string;
  salary: string;
  certs: { name: string; level: "쉬움" | "보통" }[];
};

function recommend(industry: Industry, _age: Age, personality: Personality): Job[] {
  const social = personality === "사람 만나는 게 좋다";
  const map: Record<Industry, [Job, Job]> = {
    음식점: [
      social
        ? { name: "급식 조리원", reason: "요리 경력을 그대로 살릴 수 있어요", salary: "월 220~260만원", certs: [{ name: "한식조리기능사", level: "쉬움" }] }
        : { name: "도시락 제조원", reason: "조용한 환경에서 조리 경력을 활용해요", salary: "월 230~270만원", certs: [{ name: "한식조리기능사", level: "쉬움" }] },
      { name: "요양보호사", reason: "사람을 챙겨온 경험이 큰 강점이에요", salary: "월 240~290만원", certs: [{ name: "요양보호사 자격", level: "보통" }] },
    ],
    소매: [
      social
        ? { name: "매장 관리원", reason: "고객 응대 경험을 살릴 수 있어요", salary: "월 230~280만원", certs: [{ name: "유통관리사 2급", level: "보통" }] }
        : { name: "물류 검수원", reason: "꼼꼼함이 필요한 일에 잘 맞아요", salary: "월 240~290만원", certs: [{ name: "물류관리사", level: "보통" }] },
      { name: "택배 분류원", reason: "정해진 시간, 안정적인 일자리예요", salary: "월 250~300만원", certs: [{ name: "지게차운전기능사", level: "쉬움" }] },
    ],
    서비스: [
      social
        ? { name: "아파트 관리원", reason: "주민 응대 경험을 잘 활용해요", salary: "월 230~270만원", certs: [{ name: "주택관리사보", level: "보통" }] }
        : { name: "시설 경비원", reason: "차분한 성격에 잘 맞는 직무예요", salary: "월 220~260만원", certs: [{ name: "경비지도사", level: "보통" }] },
      { name: "장례지도사", reason: "사람을 돕는 보람 있는 일이에요", salary: "월 280~350만원", certs: [{ name: "장례지도사", level: "보통" }] },
    ],
    제조: [
      social
        ? { name: "생산 반장", reason: "현장 경험과 리더십을 살려요", salary: "월 280~340만원", certs: [{ name: "산업안전기사", level: "보통" }] }
        : { name: "품질 검사원", reason: "집중력이 필요한 일에 적합해요", salary: "월 250~300만원", certs: [{ name: "품질경영기사", level: "보통" }] },
      { name: "지게차 운전원", reason: "자격증 하나로 빠르게 취업 가능해요", salary: "월 260~310만원", certs: [{ name: "지게차운전기능사", level: "쉬움" }] },
    ],
  };
  return map[industry];
}

function App() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [industry, setIndustry] = useState<Industry | null>(null);
  const [age, setAge] = useState<Age | null>(null);
  const [personality, setPersonality] = useState<Personality | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const ready = industry && age && personality;
  const jobs = ready ? recommend(industry!, age!, personality!) : [];

  const reset = () => {
    setStep(1);
    setIndustry(null);
    setAge(null);
    setPersonality(null);
    setSelectedJob(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-md px-5 pb-12 pt-8">
        <header className="mb-8 text-center">
          <img src={logo} alt="내 일 나침반 로고" className="mx-auto mb-3 h-24 w-24 rounded-2xl shadow-lg" />
          <p className="mt-1 text-base text-muted-foreground">
            나에게 맞는 일, 함께 찾아드릴게요
          </p>
        </header>

        {step === 1 && (
          <section className="space-y-7">
            <Group label="과거에 어떤 일을 하셨나요?">
              {(["음식점", "소매", "서비스", "제조"] as Industry[]).map((v) => (
                <Choice key={v} active={industry === v} onClick={() => setIndustry(v)}>
                  {v}
                </Choice>
              ))}
            </Group>

            <Group label="연령대를 선택해 주세요">
              {(["40대", "50대", "60대"] as Age[]).map((v) => (
                <Choice key={v} active={age === v} onClick={() => setAge(v)}>
                  {v}
                </Choice>
              ))}
            </Group>

            <Group label="어떤 일이 더 편하세요?">
              {(["사람 만나는 게 좋다", "혼자 집중하는 게 좋다"] as Personality[]).map((v) => (
                <Choice key={v} active={personality === v} onClick={() => setPersonality(v)} full>
                  {v}
                </Choice>
              ))}
            </Group>

            <button
              disabled={!ready}
              onClick={() => setStep(2)}
              className="mt-4 w-full rounded-2xl bg-cta py-5 text-xl font-bold text-cta-foreground shadow-lg transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:shadow-none"
            >
              내 직업 찾기 →
            </button>
          </section>
        )}

        {step === 2 && (
          <section className="space-y-5">
            <h2 className="mb-2 text-center text-xl font-bold text-foreground">
              회원님께 맞는 직업이에요
            </h2>
            {jobs.map((job) => (
              <button
                key={job.name}
                onClick={() => {
                  setSelectedJob(job);
                  setStep(3);
                }}
                className="w-full rounded-2xl bg-card p-6 text-left shadow-md ring-1 ring-border transition-all active:scale-[0.98] hover:ring-accent"
              >
                <div className="mb-2 text-2xl font-bold text-primary">{job.name}</div>
                <div className="mb-3 text-base text-muted-foreground">💡 {job.reason}</div>
                <div className="inline-block rounded-full bg-secondary px-3 py-1 text-sm font-semibold text-secondary-foreground">
                  💰 {job.salary}
                </div>
                <div className="mt-4 text-right text-sm font-semibold text-accent">
                  자세히 보기 →
                </div>
              </button>
            ))}
            <button
              onClick={reset}
              className="mt-4 w-full rounded-2xl border-2 border-border bg-card py-4 text-lg font-semibold text-foreground active:scale-[0.98]"
            >
              다시 입력하기
            </button>
          </section>
        )}

        {step === 3 && selectedJob && (
          <section className="space-y-5">
            <div className="rounded-2xl bg-primary p-6 text-center text-primary-foreground">
              <div className="text-sm opacity-80">추천 직업</div>
              <div className="mt-1 text-2xl font-bold">{selectedJob.name}</div>
            </div>

            <h3 className="pt-2 text-lg font-bold text-foreground">
              📜 도움이 되는 자격증
            </h3>

            {selectedJob.certs.map((cert) => (
              <div
                key={cert.name}
                className="rounded-2xl bg-card p-5 shadow-md ring-1 ring-border"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="text-lg font-bold text-foreground">{cert.name}</div>
                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-sm font-semibold ${
                      cert.level === "쉬움"
                        ? "bg-[color:var(--success)]/15 text-[color:var(--success)]"
                        : "bg-[color:var(--warning)]/20 text-[color:var(--warning)]"
                    }`}
                  >
                    {cert.level === "쉬움" ? "🟢 쉬움" : "🟡 보통"}
                  </span>
                </div>
              </div>
            ))}

            <div className="rounded-2xl bg-secondary p-5 text-center">
              <div className="text-base text-secondary-foreground">
                시험 일정은{" "}
                <span className="font-bold text-primary">큐넷(q-net.or.kr)</span>
                에서<br />확인해 주세요
              </div>
            </div>

            <button
              onClick={reset}
              className="mt-4 w-full rounded-2xl bg-accent py-5 text-xl font-bold text-accent-foreground shadow-lg active:scale-[0.98]"
            >
              처음으로 돌아가기
            </button>
          </section>
        )}
      </div>
    </div>
  );
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-3 text-lg font-bold text-foreground">{label}</div>
      <div className="grid grid-cols-2 gap-3">{children}</div>
    </div>
  );
}

function Choice({
  active,
  onClick,
  children,
  full,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`${full ? "col-span-2" : ""} rounded-2xl border-2 py-5 text-lg font-semibold transition-all active:scale-[0.97] ${
        active
          ? "border-accent bg-accent text-accent-foreground shadow-md"
          : "border-border bg-card text-foreground"
      }`}
    >
      {children}
    </button>
  );
}
