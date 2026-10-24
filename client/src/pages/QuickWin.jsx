import React, { useState, useEffect } from 'react'

const TIPS = {
    java: {
        speed: [
            'Profile with async Spring WebFlux — can cut p95 latency 40–60% on I/O-heavy endpoints',
            'Switch blocking DB calls to reactive R2DBC and stop starving the thread pool',
            'Add Redis caching on hot read endpoints before touching any application logic',
        ],
        security: [
            'Run OWASP ZAP against your staging endpoint this week — it is free and takes 20 minutes',
            'Enable Spring Security CSRF protection and review your CORS configuration',
            'Rotate database credentials into AWS Secrets Manager and remove them from application.properties',
        ],
        cost: [
            'Run AWS Compute Optimizer on your instances — it produces a free right-sizing report in minutes',
            'Enable S3 Intelligent-Tiering on any bucket over 100GB and save 30–40% immediately',
            'Move scheduled batch jobs to Fargate Spot — up to 70% cheaper than on-demand for interruptible work',
        ],
        reliability: [
            'Add Resilience4j circuit breakers to external service calls to prevent cascade failures',
            'Set CloudWatch alarms on p99 latency, not just uptime — your SLA is about experience, not ping',
            'Enable RDS Multi-AZ if you have not already — single-AZ RDS is not production-grade',
        ],
        scale: [
            'Identify and extract bounded contexts before committing to microservices — most monoliths just need modules',
            'Add Pact contract testing between services so teams can deploy independently without breaking each other',
            'Use Liquibase for database migrations — essential before horizontal scaling removes single-instance assumptions',
        ],
    },
    node: {
        speed: [
            'Switch from Express to Fastify — benchmarks show 2–3x throughput for the same code',
            'Cluster your Node process across CPU cores with the cluster module or PM2 cluster mode',
            'Profile with clinic.js flame chart to find the real bottleneck before optimising anything',
        ],
        security: [
            'Run npm audit fix — over 60% of critical Node vulnerabilities are auto-fixable',
            'Add Helmet.js HTTP headers in 10 lines — it handles the most common web security headers automatically',
            'Pin your dependency versions and run Dependabot or Renovate to keep them current',
        ],
        cost: [
            'Add connection pooling with pg-pool — unclosed PostgreSQL connections are expensive at scale',
            'Audit your CloudFront TTLs and cache-control headers — most Node apps significantly under-cache',
            'Use Lambda@Edge for static asset serving to reduce egress costs and improve global latency',
        ],
        reliability: [
            'Add PM2 with cluster mode and --max-memory-restart for zero-downtime restarts under memory pressure',
            'Implement structured JSON logging with Pino — 5x faster than Winston and parseable by CloudWatch',
            'Set NODE_OPTIONS=--max-old-space-size and monitor heap usage in production before it surprises you',
        ],
        scale: [
            'Extract CPU-heavy work to worker_threads immediately — the event loop is not for computation',
            'Move session state from in-process memory to Redis before deploying a second instance',
            'Add Bull queue for async jobs before they start blocking your event loop under load',
        ],
    },
    python: {
        speed: [
            'Switch from synchronous Django views to async views or FastAPI for I/O-bound endpoints',
            'Add caching with django-cache-machine or Redis before hitting the database on every request',
            'Profile with py-spy to find actual hotspots — most Python performance problems are in one or two functions',
        ],
        security: [
            'Run Bandit static analysis on your codebase — pip install bandit and scan in 5 minutes',
            'Review your Django ALLOWED_HOSTS, DEBUG=False, and SECRET_KEY rotation in production',
            'Add pip-audit to your CI pipeline to catch vulnerable dependencies before they reach production',
        ],
        cost: [
            'Use spot instances for training jobs and batch processing — 70–90% cheaper for interruptible work',
            'Profile memory usage with memray — Python applications commonly hold more in memory than necessary',
            'Switch from polling to event-driven architecture with SQS or SNS to reduce idle compute costs',
        ],
        reliability: [
            'Add retries with exponential backoff to all external API calls using the tenacity library',
            'Use Celery with Redis for async task processing to keep your web workers responsive',
            'Add health check endpoints that verify database connectivity, not just HTTP 200',
        ],
        scale: [
            'Add gunicorn with multiple workers and a reverse proxy before load testing anything',
            'Move file uploads to S3 direct upload — do not route large files through your application server',
            'Profile your ORM queries with django-debug-toolbar and eliminate N+1 query patterns first',
        ],
    },
    react: {
        speed: [
            'Run Lighthouse on your production build — most React apps have 3–4 quick wins visible immediately',
            'Add React.lazy and Suspense to code-split large routes — reduces initial bundle size significantly',
            'Replace heavy dependencies with lighter alternatives — moment.js alone adds 300KB to a bundle',
        ],
        security: [
            'Audit your npm packages with npm audit and remove unused dependencies that carry risk',
            'Never store tokens or secrets in localStorage — use httpOnly cookies served by your backend',
            'Add a Content Security Policy header to prevent XSS — start with report-only mode to avoid breakage',
        ],
        cost: [
            'Move to static generation (SSG) with Next.js for pages that do not need real-time data — hosting becomes nearly free',
            'Serve images from a CDN with next/image or Cloudinary instead of your application server',
            'Audit your bundle with source-map-explorer and remove duplicated dependencies',
        ],
        reliability: [
            'Add React Error Boundaries to catch rendering errors and show a fallback instead of a blank page',
            'Add end-to-end tests with Playwright for your three most critical user journeys',
            'Use React Query or SWR for data fetching — automatic retries and cache invalidation out of the box',
        ],
        scale: [
            'Move to Next.js or Remix for server-side rendering before SEO becomes a blocker',
            'Extract shared state to Zustand or Jotai — Context re-renders everything subscribed to it',
            'Implement virtual scrolling with TanStack Virtual for any list over 100 items',
        ],
    },
    aws: {
        speed: [
            'Enable CloudFront in front of your ALB or API Gateway — 200ms saved for international users',
            'Move static assets to S3 + CloudFront with long cache-control headers — DNS is the only latency left',
            'Right-size your Lambda memory — more memory = more CPU, and it is often cheaper AND faster',
        ],
        security: [
            'Enable GuardDuty in every region you operate — it is ~$4/month for most accounts and catches the basics',
            'Turn on CloudTrail in all regions and ship logs to a locked S3 bucket — you cannot investigate what you did not record',
            'Review IAM Access Analyzer findings this week — most accounts have 3–5 overly permissive roles',
        ],
        cost: [
            'Run Trusted Advisor cost checks — it flags idle load balancers, unattached EIPs, and old snapshots',
            'Enable S3 Intelligent-Tiering on any bucket over 100GB — saves 30–40% with zero operational change',
            'Move NAT Gateway traffic to VPC endpoints where possible — NAT is one of the most overlooked AWS bills',
        ],
        reliability: [
            'Enable Multi-AZ on every RDS instance — single-AZ is not production-grade',
            'Add Route 53 health checks with DNS failover for any public endpoint you promise SLA on',
            'Enable AWS Backup with cross-region copies — snapshots in one region do not survive a regional incident',
        ],
        scale: [
            'Use Auto Scaling Groups with target tracking, not step scaling — it reacts faster and needs less tuning',
            'Add an SQS queue in front of any Lambda that can spike — Lambda concurrency limits are shared per account',
            'Enable Aurora Serverless v2 for unpredictable workloads — it scales in seconds instead of hours',
        ],
    },
    azure: {
        speed: [
            'Enable Azure Front Door in front of App Service — caching plus global PoPs with one config change',
            'Move from App Service to Container Apps for anything with bursty traffic — cold start is faster and cost is lower',
            'Use Azure Cache for Redis on hot read paths — the managed tier is cheap and integrates in minutes',
        ],
        security: [
            'Enable Microsoft Defender for Cloud — the free tier alone catches most misconfigurations',
            'Review Managed Identity assignments — passwords in app settings should be zero',
            'Enable Key Vault soft-delete and purge protection — accidental deletions are the #1 real incident',
        ],
        cost: [
            'Right-size VMs using Azure Advisor — it produces a free cost report with specific recommendations',
            'Move to Reserved Instances or Savings Plans for baseline workloads — 30–60% cheaper than pay-as-you-go',
            'Delete orphaned disks and public IPs — the portal does not warn you, but they cost real money',
        ],
        reliability: [
            'Enable zone-redundant App Service plans in regions that support it — regional outages are rarer than zone ones',
            'Add Azure Monitor alerts on p99 latency, not just availability — availability is a lagging indicator',
            'Enable geo-redundant storage on any blob storage that holds critical data',
        ],
        scale: [
            'Use Application Gateway with autoscaling — it handles spikes without manual intervention',
            'Enable Azure Service Bus with auto-forwarding for bursty async workloads',
            'Set up Azure Front Door rate limiting before a launch, not after — bot attacks come fast',
        ],
    },
}

// ── Fallback for stacks without a dedicated table ──
const FALLBACK = {
    speed: [
        'Profile before optimising — most teams optimise the wrong layer',
        'Add APM (Datadog or New Relic free tier) before guessing',
        'Database queries are the number one speed issue in 80% of applications',
    ],
    security: [
        'Run a free OWASP ZAP scan on your staging URL today',
        'Enable MFA on all cloud provider accounts immediately',
        'Audit IAM roles — least privilege saves breaches more than any tool',
    ],
    cost: [
        "Right-size instances with your cloud provider's free cost optimiser",
        'Enable budget alerts — most overruns are invisible until the bill arrives',
        'Reserved instances for baseline workload, spot or preemptible for batch jobs',
    ],
    reliability: [
        'Add a public status page — Upptime is free and hosted on GitHub',
        'Set health checks on every service, not just a ping endpoint',
        'Write your runbook before the next incident, not during it',
    ],
    scale: [
        'Document your actual bottleneck before changing architecture',
        'Horizontal scaling only works after you remove shared mutable state',
        'Measure first — most perceived scale problems are actually slow queries',
    ],
}

const STACKS = [
    { value: 'java', label: 'Java' },
    { value: 'node', label: 'Node.js' },
    { value: 'python', label: 'Python' },
    { value: 'react', label: 'React' },
    { value: 'aws', label: 'AWS' },
    { value: 'azure', label: 'Azure' },
]

const PAINS = [
    { value: 'speed', label: 'App is too slow' },
    { value: 'security', label: 'Security or compliance gaps' },
    { value: 'cost', label: 'Cloud costs out of control' },
    { value: 'reliability', label: 'Frequent downtime or incidents' },
    { value: 'scale', label: 'Cannot scale the team or code' },
]

const PAIN_LABELS = {
    speed: 'App is too slow',
    security: 'Security or compliance gaps',
    cost: 'Cloud costs out of control',
    reliability: 'Frequent downtime or incidents',
    scale: 'Cannot scale the team or code',
}

export default function QuickWin() {
    const [selectedStacks, setSelectedStacks] = useState([])
    const [pain, setPain] = useState('')
    const [result, setResult] = useState(null)
    const [error, setError] = useState('')

    // ── Scroll reveal ──
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible')
                }
            })
        }, { threshold: 0.15 })

        document.querySelectorAll('#quickwin .reveal').forEach(el => observer.observe(el))
        return () => observer.disconnect()
    }, [])

    const toggleStack = (value) => {
        setSelectedStacks((prev) =>
            prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setError('')

        if (!pain) {
            setError('Please select your biggest challenge to get a personalised assessment.')
            return
        }

        const matchedStack = selectedStacks.find((s) => TIPS[s])
        const tips =
            matchedStack && TIPS[matchedStack][pain]
                ? TIPS[matchedStack][pain]
                : FALLBACK[pain] || FALLBACK.speed

        setResult({
            stacks: selectedStacks.length > 0 ? selectedStacks : ['your stack'],
            pain,
            tips,
        })

        setTimeout(() => {
            document.getElementById('audit-result')?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            })
        }, 100)
    }

    const stackLabel = result?.stacks?.join(' + ') || ''
    const painLabel = result?.pain ? PAIN_LABELS[result.pain] : ''

    return (
        <section id="quickwin" className="section-quickwin">
            <div className="container">
                <div className="quickwin-inner">
                    <div className="quickwin-header">
                        <p className="section-label reveal">Try it</p>
                        <h2 className="section-heading reveal rd1">
                            Get a free <em>stack assessment</em>
                        </h2>
                        <p className="reveal rd2">
                            Select your tech stack and your biggest challenge. Get three specific,
                            actionable recommendations in under 30 seconds.
                        </p>
                        <div className="quickwin-timer reveal rd3">
                            <i className="ph ph-timer" aria-hidden="true"></i>
                            Takes about 30 seconds
                        </div>
                    </div>

                    <div className="audit-card reveal rd2">
                        <form onSubmit={handleSubmit} noValidate>
                            {/* Stack selection */}
                            <div className="audit-section">
                                <span className="audit-section-label">
                                    YOUR TECH STACK (select all that apply)
                                </span>
                                <div
                                    className="stack-grid"
                                    role="group"
                                    aria-label="Select your tech stack"
                                >
                                    {STACKS.map((stack) => (
                                        <label key={stack.value} className="stack-option">
                                            <input
                                                type="checkbox"
                                                name="stack"
                                                value={stack.value}
                                                checked={selectedStacks.includes(stack.value)}
                                                onChange={() => toggleStack(stack.value)}
                                            />
                                            {stack.label}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Pain point */}
                            <div className="audit-section">
                                <label htmlFor="pain-point" className="audit-section-label">
                                    BIGGEST CHALLENGE RIGHT NOW
                                </label>
                                <select
                                    id="pain-point"
                                    className="audit-select"
                                    value={pain}
                                    onChange={(e) => setPain(e.target.value)}
                                    aria-required="true"
                                >
                                    <option value="">— Select one —</option>
                                    {PAINS.map((p) => (
                                        <option key={p.value} value={p.value}>
                                            {p.label}
                                        </option>
                                    ))}
                                </select>

                                {error && (
                                    <p
                                        role="alert"
                                        style={{
                                            marginTop: '0.5rem',
                                            fontSize: 'var(--text-xs)',
                                            color: '#e07070',
                                        }}
                                    >
                                        {error}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary"
                                style={{ width: '100%', justifyContent: 'center' }}
                            >
                                Get my assessment
                                <i className="ph ph-arrow-right" aria-hidden="true"></i>
                            </button>
                        </form>

                        {/* Result */}
                        {result && (
                            <div
                                id="audit-result"
                                className="audit-result"
                                role="region"
                                aria-label="Your assessment"
                            >
                                <h3>Your Assessment</h3>
                                <p className="result-intro">
                                    Based on <strong>{stackLabel}</strong> and the challenge of{' '}
                                    <strong>{painLabel}</strong>:
                                </p>
                                <ol className="result-tips">
                                    {result.tips.map((tip, i) => (
                                        <li key={i}>{tip}</li>
                                    ))}
                                </ol>
                                <p className="result-cta">
                                    Want me to look at your specific codebase?{' '}
                                    <a href="#contact">Book a free 15-min call</a>
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}