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

const INDUSTRIES = [
  "음식점",
  "소매",
  "서비스",
  "제조",
  "사무·행정",
  "운수·물류",
  "건설",
  "농업·원예",
] as const;
type Industry = (typeof INDUSTRIES)[number];

const AGES = ["30대", "40대", "50대", "60대"] as const;
type Age = (typeof AGES)[number];

const STRENGTHS = [
  "사람 응대·설득을 잘함",
  "컴퓨터 활용 능력이 뛰어남",
  "요리를 잘함",
  "육아 경험이 있음",
  "몸을 움직이는 일이 편함",
  "꼼꼼하고 정리정돈을 잘함",
  "운전을 오래 해왔음",
  "손재주가 있음",
  "어르신을 돌본 경험이 있음",
  "매장을 직접 운영해본 경험이 있음",
] as const;
type Strength = (typeof STRENGTHS)[number];

type Cert = { name: string; level: "쉬움" | "보통" };
type Job = {
  name: string;
  reason: string;
  salary: string;
  certs: Cert[];
  industries: Industry[];
  strengths: Strength[];
};

const JOBS: Job[] = [
  { name: "급식 조리원", reason: "요리 경력을 그대로 살릴 수 있어요", salary: "월 220~260만원", certs: [{ name: "한식조리기능사", level: "쉬움" }], industries: ["음식점"], strengths: ["요리를 잘함", "몸을 움직이는 일이 편함"] },
  { name: "도시락 제조원", reason: "조용한 환경에서 조리 경력을 활용해요", salary: "월 230~270만원", certs: [{ name: "한식조리기능사", level: "쉬움" }], industries: ["음식점", "제조"], strengths: ["요리를 잘함", "꼼꼼하고 정리정돈을 잘함"] },
  { name: "반찬가게 운영", reason: "직접 운영해본 경험이 큰 자산이에요", salary: "월 250~400만원", certs: [{ name: "한식조리기능사", level: "쉬움" }], industries: ["음식점", "소매"], strengths: ["요리를 잘함", "매장을 직접 운영해본 경험이 있음"] },
  { name: "카페 바리스타", reason: "고객 응대와 손재주가 함께 필요해요", salary: "월 210~250만원", certs: [{ name: "바리스타 2급", level: "쉬움" }], industries: ["음식점"], strengths: ["사람 응대·설득을 잘함", "손재주가 있음"] },
  { name: "제과·제빵 보조", reason: "손재주를 살려 안정적으로 일해요", salary: "월 210~250만원", certs: [{ name: "제과기능사", level: "보통" }], industries: ["음식점", "제조"], strengths: ["손재주가 있음", "요리를 잘함"] },
  { name: "학교 영양 조리사", reason: "규칙적인 근무 시간이 장점이에요", salary: "월 240~280만원", certs: [{ name: "한식조리기능사", level: "쉬움" }], industries: ["음식점"], strengths: ["요리를 잘함", "꼼꼼하고 정리정돈을 잘함"] },
  { name: "푸드트럭 창업", reason: "운영 경험과 요리 실력을 동시에 살려요", salary: "월 200~450만원", certs: [{ name: "위생교육 이수", level: "쉬움" }], industries: ["음식점"], strengths: ["매장을 직접 운영해본 경험이 있음", "요리를 잘함", "운전을 오래 해왔음"] },

  { name: "매장 관리원", reason: "고객 응대 경험을 살릴 수 있어요", salary: "월 230~280만원", certs: [{ name: "유통관리사 2급", level: "보통" }], industries: ["소매", "서비스"], strengths: ["사람 응대·설득을 잘함", "매장을 직접 운영해본 경험이 있음"] },
  { name: "편의점 운영", reason: "야간·주말 근무로 안정 수입이 가능해요", salary: "월 250~350만원", certs: [], industries: ["소매"], strengths: ["매장을 직접 운영해본 경험이 있음", "사람 응대·설득을 잘함"] },
  { name: "판매·계산원", reason: "짧은 교육으로 바로 시작할 수 있어요", salary: "월 200~240만원", certs: [], industries: ["소매"], strengths: ["사람 응대·설득을 잘함", "꼼꼼하고 정리정돈을 잘함"] },
  { name: "물류 검수원", reason: "꼼꼼함이 필요한 일에 잘 맞아요", salary: "월 240~290만원", certs: [{ name: "물류관리사", level: "보통" }], industries: ["소매", "운수·물류"], strengths: ["꼼꼼하고 정리정돈을 잘함"] },
  { name: "택배 분류원", reason: "정해진 시간, 안정적인 일자리예요", salary: "월 250~300만원", certs: [{ name: "지게차운전기능사", level: "쉬움" }], industries: ["운수·물류"], strengths: ["몸을 움직이는 일이 편함"] },
  { name: "온라인 스토어 운영", reason: "매장 운영 경험을 온라인으로 확장해요", salary: "월 200~500만원", certs: [{ name: "전자상거래관리사 2급", level: "보통" }], industries: ["소매"], strengths: ["매장을 직접 운영해본 경험이 있음", "컴퓨터 활용 능력이 뛰어남"] },

  { name: "아파트 관리원", reason: "주민 응대 경험을 잘 활용해요", salary: "월 230~270만원", certs: [{ name: "주택관리사보", level: "보통" }], industries: ["서비스"], strengths: ["사람 응대·설득을 잘함", "꼼꼼하고 정리정돈을 잘함"] },
  { name: "시설 경비원", reason: "차분한 성격에 잘 맞는 직무예요", salary: "월 220~260만원", certs: [{ name: "경비지도사", level: "보통" }], industries: ["서비스"], strengths: ["꼼꼼하고 정리정돈을 잘함", "몸을 움직이는 일이 편함"] },
  { name: "장례지도사", reason: "사람을 돕는 보람 있는 일이에요", salary: "월 280~350만원", certs: [{ name: "장례지도사", level: "보통" }], industries: ["서비스"], strengths: ["사람 응대·설득을 잘함", "꼼꼼하고 정리정돈을 잘함"] },
  { name: "요양보호사", reason: "어르신을 돌본 경험이 큰 강점이에요", salary: "월 240~290만원", certs: [{ name: "요양보호사 자격", level: "보통" }], industries: ["서비스"], strengths: ["어르신을 돌본 경험이 있음", "사람 응대·설득을 잘함"] },
  { name: "방문 요양보호사", reason: "가정 방문으로 유연하게 일해요", salary: "월 220~280만원", certs: [{ name: "요양보호사 자격", level: "보통" }], industries: ["서비스"], strengths: ["어르신을 돌본 경험이 있음", "운전을 오래 해왔음"] },
  { name: "베이비시터", reason: "육아 경험이 그대로 무기가 돼요", salary: "월 220~300만원", certs: [{ name: "아이돌보미 교육 수료", level: "쉬움" }], industries: ["서비스"], strengths: ["육아 경험이 있음", "사람 응대·설득을 잘함"] },
  { name: "산후관리사", reason: "육아 경험을 전문성으로 발전시켜요", salary: "월 280~380만원", certs: [{ name: "산후관리사 교육 수료", level: "보통" }], industries: ["서비스"], strengths: ["육아 경험이 있음", "꼼꼼하고 정리정돈을 잘함"] },
  { name: "홈 클리닝 매니저", reason: "정리정돈 강점을 곧바로 살려요", salary: "월 230~300만원", certs: [], industries: ["서비스"], strengths: ["꼼꼼하고 정리정돈을 잘함", "몸을 움직이는 일이 편함"] },
  { name: "미용 보조", reason: "손재주와 응대력이 함께 필요해요", salary: "월 200~250만원", certs: [{ name: "미용사(일반)", level: "보통" }], industries: ["서비스"], strengths: ["손재주가 있음", "사람 응대·설득을 잘함"] },
  { name: "펫시터", reason: "돌봄 경험을 반려동물 서비스로 확장해요", salary: "월 180~280만원", certs: [{ name: "반려동물관리사", level: "쉬움" }], industries: ["서비스"], strengths: ["어르신을 돌본 경험이 있음", "육아 경험이 있음"] },

  { name: "생산 반장", reason: "현장 경험과 리더십을 살려요", salary: "월 280~340만원", certs: [{ name: "산업안전기사", level: "보통" }], industries: ["제조"], strengths: ["매장을 직접 운영해본 경험이 있음", "사람 응대·설득을 잘함"] },
  { name: "품질 검사원", reason: "집중력이 필요한 일에 적합해요", salary: "월 250~300만원", certs: [{ name: "품질경영기사", level: "보통" }], industries: ["제조"], strengths: ["꼼꼼하고 정리정돈을 잘함"] },
  { name: "포장·조립원", reason: "손재주와 꼼꼼함이 큰 도움이 돼요", salary: "월 220~270만원", certs: [], industries: ["제조"], strengths: ["손재주가 있음", "꼼꼼하고 정리정돈을 잘함"] },
  { name: "지게차 운전원", reason: "자격증 하나로 빠르게 취업 가능해요", salary: "월 260~310만원", certs: [{ name: "지게차운전기능사", level: "쉬움" }], industries: ["제조", "운수·물류"], strengths: ["운전을 오래 해왔음", "몸을 움직이는 일이 편함"] },
  { name: "설비 보전원", reason: "손재주로 기계를 다루는 일이에요", salary: "월 270~330만원", certs: [{ name: "설비보전기능사", level: "보통" }], industries: ["제조"], strengths: ["손재주가 있음", "꼼꼼하고 정리정돈을 잘함"] },

  { name: "사무 보조원", reason: "컴퓨터 활용 능력을 살릴 수 있어요", salary: "월 220~270만원", certs: [{ name: "컴퓨터활용능력 2급", level: "보통" }], industries: ["사무·행정"], strengths: ["컴퓨터 활용 능력이 뛰어남", "꼼꼼하고 정리정돈을 잘함"] },
  { name: "경리·회계 보조", reason: "숫자에 꼼꼼한 분에게 잘 맞아요", salary: "월 240~290만원", certs: [{ name: "전산회계 2급", level: "보통" }], industries: ["사무·행정"], strengths: ["컴퓨터 활용 능력이 뛰어남", "꼼꼼하고 정리정돈을 잘함"] },
  { name: "공공기관 행정 도우미", reason: "안정적이고 규칙적인 근무 환경이에요", salary: "월 200~240만원", certs: [], industries: ["사무·행정", "서비스"], strengths: ["사람 응대·설득을 잘함", "컴퓨터 활용 능력이 뛰어남"] },
  { name: "콜센터 상담원", reason: "응대 경험을 그대로 살릴 수 있어요", salary: "월 220~280만원", certs: [], industries: ["사무·행정", "서비스"], strengths: ["사람 응대·설득을 잘함", "컴퓨터 활용 능력이 뛰어남"] },
  { name: "온라인 마켓 등록 관리자", reason: "매장 운영과 컴퓨터 능력을 결합해요", salary: "월 230~300만원", certs: [{ name: "전자상거래관리사 2급", level: "보통" }], industries: ["사무·행정", "소매"], strengths: ["컴퓨터 활용 능력이 뛰어남", "매장을 직접 운영해본 경험이 있음"] },
  { name: "도서관 사서 보조", reason: "차분한 환경에서 정리 업무를 해요", salary: "월 200~240만원", certs: [], industries: ["사무·행정"], strengths: ["꼼꼼하고 정리정돈을 잘함", "컴퓨터 활용 능력이 뛰어남"] },

  { name: "택시 기사", reason: "오래된 운전 경력이 큰 자산이에요", salary: "월 260~340만원", certs: [{ name: "택시운전자격", level: "쉬움" }], industries: ["운수·물류"], strengths: ["운전을 오래 해왔음", "사람 응대·설득을 잘함"] },
  { name: "화물차 기사", reason: "장거리 운전 경험을 살릴 수 있어요", salary: "월 300~420만원", certs: [{ name: "화물운송종사자격", level: "보통" }], industries: ["운수·물류"], strengths: ["운전을 오래 해왔음"] },
  { name: "마을버스 기사", reason: "정해진 노선으로 안정적으로 일해요", salary: "월 250~310만원", certs: [{ name: "버스운전자격", level: "보통" }], industries: ["운수·물류"], strengths: ["운전을 오래 해왔음", "사람 응대·설득을 잘함"] },
  { name: "퀵서비스 기사", reason: "자유로운 근무 시간이 장점이에요", salary: "월 250~380만원", certs: [], industries: ["운수·물류"], strengths: ["운전을 오래 해왔음", "몸을 움직이는 일이 편함"] },
  { name: "학원 통학차량 기사", reason: "짧은 근무와 안정성을 겸비해요", salary: "월 180~230만원", certs: [{ name: "버스운전자격", level: "보통" }], industries: ["운수·물류", "서비스"], strengths: ["운전을 오래 해왔음", "육아 경험이 있음"] },
  { name: "택배 배송기사", reason: "몸을 쓰는 일과 운전을 함께 해요", salary: "월 300~450만원", certs: [], industries: ["운수·물류"], strengths: ["운전을 오래 해왔음", "몸을 움직이는 일이 편함"] },

  { name: "건설 현장 관리자", reason: "현장을 챙기던 감각이 큰 자산이에요", salary: "월 300~400만원", certs: [{ name: "건설안전기사", level: "보통" }], industries: ["건설"], strengths: ["매장을 직접 운영해본 경험이 있음", "꼼꼼하고 정리정돈을 잘함"] },
  { name: "인테리어 시공 보조", reason: "손재주가 곧바로 경쟁력이 돼요", salary: "월 260~340만원", certs: [], industries: ["건설"], strengths: ["손재주가 있음", "몸을 움직이는 일이 편함"] },
  { name: "도배·장판 기능공", reason: "손재주로 안정 수입을 만들 수 있어요", salary: "월 300~450만원", certs: [{ name: "도배기능사", level: "보통" }], industries: ["건설"], strengths: ["손재주가 있음", "몸을 움직이는 일이 편함"] },
  { name: "전기 설비 보조", reason: "자격증으로 오래 일할 수 있어요", salary: "월 280~360만원", certs: [{ name: "전기기능사", level: "보통" }], industries: ["건설"], strengths: ["손재주가 있음", "꼼꼼하고 정리정돈을 잘함"] },
  { name: "건물 시설관리원", reason: "안정적인 근무 환경이 매력이에요", salary: "월 240~300만원", certs: [{ name: "위험물기능사", level: "보통" }], industries: ["건설", "서비스"], strengths: ["꼼꼼하고 정리정돈을 잘함", "손재주가 있음"] },

  { name: "도시농업 관리사", reason: "야외에서 몸을 쓰며 일할 수 있어요", salary: "월 200~270만원", certs: [{ name: "도시농업관리사", level: "쉬움" }], industries: ["농업·원예"], strengths: ["몸을 움직이는 일이 편함", "손재주가 있음"] },
  { name: "화훼 장식 보조", reason: "손재주를 살려 감각적으로 일해요", salary: "월 210~260만원", certs: [{ name: "화훼장식기능사", level: "보통" }], industries: ["농업·원예"], strengths: ["손재주가 있음", "꼼꼼하고 정리정돈을 잘함"] },
  { name: "조경 관리원", reason: "야외 활동과 손재주가 함께 필요해요", salary: "월 230~290만원", certs: [{ name: "조경기능사", level: "보통" }], industries: ["농업·원예", "건설"], strengths: ["몸을 움직이는 일이 편함", "손재주가 있음"] },
  { name: "주말농장 운영", reason: "운영 경험을 새 분야에 적용해요", salary: "월 150~300만원", certs: [], industries: ["농업·원예"], strengths: ["매장을 직접 운영해본 경험이 있음", "몸을 움직이는 일이 편함"] },
  { name: "농산물 직판장 운영", reason: "매장 운영과 사람 응대가 잘 어우러져요", salary: "월 220~350만원", certs: [], industries: ["농업·원예", "소매"], strengths: ["매장을 직접 운영해본 경험이 있음", "사람 응대·설득을 잘함"] },
];

function recommend(industry: Industry, _age: Age, strengths: Strength[]): Job[] {
  const scored = JOBS.map((job) => {
    const industryMatch = job.industries.includes(industry) ? 2 : 0;
    const strengthMatches = job.strengths.filter((s) => strengths.includes(s)).length;
    return { job, score: industryMatch + strengthMatches * 2 };
  });
  scored.sort((a, b) => b.score - a.score);
  const top = scored.filter((s) => s.score > 0).slice(0, 4);
  if (top.length === 0) return scored.slice(0, 3).map((s) => s.job);
  return top.map((s) => s.job);
}

function App() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [industry, setIndustry] = useState<Industry | null>(null);
  const [age, setAge] = useState<Age | null>(null);
  const [strengths, setStrengths] = useState<Strength[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const ready = !!industry && !!age && strengths.length > 0;
  const jobs = ready ? recommend(industry!, age!, strengths) : [];

  const toggleStrength = (s: Strength) => {
    setStrengths((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  };

  const reset = () => {
    setStep(1);
    setIndustry(null);
    setAge(null);
    setStrengths([]);
    setSelectedJob(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-md px-5 pb-12 pt-8">
        <header className="mb-8 text-center">
          <img src={logo} alt="내 일 나침반 로고" className="mx-auto mb-3 h-28 w-28 rounded-2xl bg-white p-1 shadow-lg ring-2 ring-cta/40" />
          <p className="mt-1 text-base text-muted-foreground">
            나에게 맞는 일, 함께 찾아드릴게요
          </p>
        </header>

        {step === 1 && (
          <section className="space-y-7">
            <Group label="과거에 어떤 업종의 일을 하셨나요?">
              {INDUSTRIES.map((v) => (
                <Choice key={v} active={industry === v} onClick={() => setIndustry(v)}>
                  {v}
                </Choice>
              ))}
            </Group>

            <Group label="연령대를 선택해 주세요">
              {AGES.map((v) => (
                <Choice key={v} active={age === v} onClick={() => setAge(v)}>
                  {v}
                </Choice>
              ))}
            </Group>

            <Group label="본인의 장점을 선택해 주세요 (여러 개 선택 가능)">
              {STRENGTHS.map((v) => (
                <Choice key={v} active={strengths.includes(v)} onClick={() => toggleStrength(v)} full>
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

            {selectedJob.certs.length === 0 ? (
              <div className="rounded-2xl bg-card p-5 text-center text-muted-foreground ring-1 ring-border">
                필수 자격증 없이도 시작할 수 있어요
              </div>
            ) : (
              selectedJob.certs.map((cert) => (
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
              ))
            )}

            <div className="rounded-2xl bg-secondary p-5 text-center">
              <div className="text-base text-secondary-foreground">
                시험 일정은{" "}
                <span className="font-bold text-primary">큐넷(q-net.or.kr)</span>
                에서<br />확인해 주세요
              </div>
            </div>

            <button
              onClick={reset}
              className="mt-4 w-full rounded-2xl bg-cta py-5 text-xl font-bold text-cta-foreground shadow-lg active:scale-[0.98]"
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
