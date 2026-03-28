'use client';

import { useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const STEPS = [
  { label: 'Brand', icon: '◈' },
  { label: 'SMTP', icon: '◉' },
  { label: 'Contacts', icon: '◧' },
  { label: 'WhatsApp', icon: '◎' },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [mdFileName, setMdFileName] = useState<string | null>(null);
  const [mdDragOver, setMdDragOver] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const mdInputRef = useRef<HTMLInputElement>(null);

  const handleMdFile = useCallback((file: File) => {
    if (!file.name.endsWith('.md')) return;
    setMdFileName(file.name);
  }, []);

  const handleMdDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setMdDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleMdFile(file);
  }, [handleMdFile]);

  function next() {
    if (step < STEPS.length - 1) setStep(step + 1);
    else router.push('/dashboard');
  }

  function skip() {
    if (step < STEPS.length - 1) setStep(step + 1);
    else router.push('/dashboard');
  }

  return (
    <div className="onboarding-page">
      <div className="onboarding-card">
        <div className="onboarding-header">
          <span className="pricing-logo">PULSESENDER</span>
          <span className="onboarding-step-label">Step {step + 1} of {STEPS.length}</span>
        </div>

        {/* Progress */}
        <div className="onboarding-progress">
          {STEPS.map((s, i) => (
            <div key={s.label} className="onboarding-progress-step">
              <div className={`onboarding-dot${i <= step ? ' active' : ''}${i < step ? ' done' : ''}`}>
                {i < step ? '✓' : s.icon}
              </div>
              <span className={`onboarding-step-name${i === step ? ' active' : ''}`}>{s.label}</span>
            </div>
          ))}
          <div className="onboarding-progress-line">
            <div className="onboarding-progress-fill" style={{ width: `${(step / (STEPS.length - 1)) * 100}%` }} />
          </div>
        </div>

        {/* Step 0: Brand */}
        {step === 0 && (
          <div className="onboarding-body">
            <h2 className="onboarding-title">Upload your brand</h2>
            <p className="onboarding-desc">
              Drop a <code>.md</code> file with your brand info — tone, audience, value props.
              This personalizes all outreach messaging.
            </p>
            <input
              ref={mdInputRef}
              type="file"
              accept=".md"
              style={{ display: 'none' }}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleMdFile(file);
              }}
            />
            <div
              className={`csv-drop-zone${mdDragOver ? ' drag-over' : ''}`}
              onDragOver={(e) => { e.preventDefault(); setMdDragOver(true); }}
              onDragLeave={() => setMdDragOver(false)}
              onDrop={handleMdDrop}
            >
              {mdFileName ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span className="md-preview-filename">{mdFileName}</span>
                  <button className="btn-ghost-sm" type="button" onClick={() => setMdFileName(null)}>remove</button>
                </div>
              ) : (
                <>
                  <div className="csv-drop-icon">📄</div>
                  <div className="csv-drop-label">Drag &amp; drop a .md file</div>
                  <div className="csv-drop-sub">or</div>
                  <button className="btn-ghost" type="button" onClick={() => mdInputRef.current?.click()}>Browse File</button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Step 1: SMTP */}
        {step === 1 && (
          <div className="onboarding-body">
            <h2 className="onboarding-title">Connect your email</h2>
            <p className="onboarding-desc">
              Add your SMTP server to start sending outreach emails.
            </p>
            <div className="settings-grid">
              <div className="settings-field">
                <label className="settings-label">Mail Server (Host)</label>
                <input type="text" className="settings-input" placeholder="mail.privateemail.com" autoComplete="off" />
              </div>
              <div className="settings-field settings-field-sm">
                <label className="settings-label">Port</label>
                <input type="number" className="settings-input" placeholder="587" autoComplete="off" />
              </div>
              <div className="settings-field">
                <label className="settings-label">Username</label>
                <input type="text" className="settings-input" placeholder="hello@yourdomain.com" autoComplete="off" />
              </div>
              <div className="settings-field">
                <label className="settings-label">Password</label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input type={showPass ? 'text' : 'password'} className="settings-input" placeholder="••••••••" autoComplete="new-password" />
                  <button className="btn-ghost-sm" onClick={() => setShowPass(!showPass)} type="button">
                    {showPass ? 'hide' : 'show'}
                  </button>
                </div>
              </div>
              <div className="settings-field">
                <label className="settings-label">From Name</label>
                <input type="text" className="settings-input" placeholder="Your Name" autoComplete="off" />
              </div>
              <div className="settings-field">
                <label className="settings-label">From Email</label>
                <input type="text" className="settings-input" placeholder="hello@yourdomain.com" autoComplete="off" />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Contacts */}
        {step === 2 && (
          <div className="onboarding-body">
            <h2 className="onboarding-title">Import your contacts</h2>
            <p className="onboarding-desc">
              Upload a CSV or XLSX with your prospect list. Required: <code>email</code>.
              Optional: <code>name</code>, <code>company</code>, <code>industry</code>.
            </p>
            <div className="csv-drop-zone">
              <div className="csv-drop-icon">⬆</div>
              <div className="csv-drop-label">Drag &amp; drop a CSV or XLSX</div>
              <div className="csv-drop-sub">or</div>
              <button className="btn-ghost">Browse File</button>
            </div>
          </div>
        )}

        {/* Step 3: WhatsApp */}
        {step === 3 && (
          <div className="onboarding-body">
            <h2 className="onboarding-title">Connect WhatsApp</h2>
            <p className="onboarding-desc">
              Add your Kapso API key to enable WhatsApp outreach.
              Run <code>npm i -g @kapso/cli && kapso setup</code> to get started.
            </p>
            <div className="settings-grid">
              <div className="settings-field">
                <label className="settings-label">Kapso API Key</label>
                <input type="password" className="settings-input" placeholder="kapso_live_..." autoComplete="off" />
              </div>
              <div className="settings-field">
                <label className="settings-label">Phone Number ID</label>
                <input type="text" className="settings-input" placeholder="647015955153740" autoComplete="off" />
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="onboarding-actions">
          <button className="btn-ghost onboarding-skip" onClick={skip}>
            {step < STEPS.length - 1 ? 'Skip for now' : 'Skip to dashboard'}
          </button>
          <button className="btn-primary onboarding-next" onClick={next}>
            {step < STEPS.length - 1 ? 'Continue' : 'Go to Dashboard'}
          </button>
        </div>
      </div>
    </div>
  );
}
