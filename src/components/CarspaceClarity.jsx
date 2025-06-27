import React from "react";
import "./CarspaceClarity.css";

export default function CarspaceClarity() {
  return (
    <div className="carspace-clarity-section">
      <div className="carspace-clarity-left">
        <h2 className="carspace-clarity-title">
          <span className="clarity-bar"></span>
          Your Roadmap to <br />Carspace Clarity
        </h2>
        <p className="carspace-clarity-desc">
          Frequently asked questions ordered by popularity.<br />
          Remember that if the visitor has not committed to the call to action, they may still have questions (doubts) that can be answered.
        </p>
      </div>
      <div className="carspace-clarity-right">
        <div className="faq-item">
          <div className="faq-q">
            <b>How flexible are Carspace's membership plans?</b>
            <span className="faq-icon">⌄</span>
          </div>
          <div className="faq-a">
            Frequently asked questions ordered by popularity.<br />
            Remember that if the visitor has not committed to the call to action, they may still have questions (doubts) that can be answered.
          </div>
        </div>
        <div className="faq-item">
          <div className="faq-q">
            <b>What kind of events and networking opportunities does Carspace provide?</b>
            <span className="faq-icon">⌄</span>
          </div>
        </div>
        <div className="faq-item">
          <div className="faq-q">
            <b>Can I tour the Carspace before committing to a membership?</b>
            <span className="faq-icon">⌄</span>
          </div>
        </div>
        <div className="faq-item">
          <div className="faq-q">
            <b>Is Carspace suitable for remote teams and distributed workforces?</b>
            <span className="faq-icon">⌄</span>
          </div>
        </div>
        <div className="faq-item">
          <div className="faq-q">
            <b>What measures does Carspace take for environmental sustainability?</b>
            <span className="faq-icon">⌄</span>
          </div>
        </div>
        <div className="faq-item">
          <div className="faq-q">
            <b>Still has questions?</b>
            <span className="faq-icon">⌄</span>
          </div>
        </div>
      </div>
    </div>
  );
}
