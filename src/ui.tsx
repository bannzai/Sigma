import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { render } from "react-dom";
import styles from "./ui.css";
import { VSpace } from "./ui/Space";

const App: React.VFC = () => {
  const [code, setCode] = useState("");
  const textRef = useRef<HTMLTextAreaElement>(null);

  const copyToClipboard = async () => {
    if (textRef.current) {
      textRef.current.select();
      document.execCommand("copy");
    }
  };

  useEffect(() => {
    onmessage = (event) => {
      console.log(JSON.stringify({ event }));
      setCode(event.data.pluginMessage.code);
    };
  }, []);

  return (
    <div>
      <div className={styles.code}>
        <textarea
          className={styles.textareaForClipboard}
          ref={textRef}
          value={code}
          readOnly
        />

        <p className={styles.generatedCode}>{code}</p>

        <VSpace height={12} />

        <div className={styles.buttonLayout}>
          <button className={styles.copyButton} onClick={copyToClipboard}>
            Copy to clipboard
          </button>
        </div>
      </div>
    </div>
  );
};

render(<App />, document.getElementById("app"));
