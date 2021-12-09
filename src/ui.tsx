import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { render } from "react-dom";
import styles from "./ui.css";
import { VSpacer } from "./ui/Spacer";

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
      <textarea
        className={styles.nonDisplayedTextArea}
        ref={textRef}
        value={code}
        readOnly
      />
      <div className={styles.box}>
        <p className={styles.generatedCode}>{code}</p>

        <VSpacer height={12} />

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
