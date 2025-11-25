import React, { useEffect, useRef, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";
import {
  PanelGroup as ResizablePanelGroup,
  Panel as ResizablePanel,
  PanelResizeHandle as ResizableHandle
} from "react-resizable-panels";
import { Play, Send, FileCode, Eye, HelpCircle, AlertCircle } from "lucide-react";
import { toast } from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const Editor = () => {
  const iframeRef = useRef(null);
  const [htmlCode, setHtmlCode] = useState("<h1>Hello World</h1>\n<p>Start coding...</p>");
  const [cssCode, setCssCode] = useState(
    "h1 { color: #14b8a6; font-family: sans-serif; }"
  );
  const [jsCode, setJsCode] = useState('console.log("JS Working!");');

  const [editorActive, setEditorActive] = useState(true);
  const [view, setView] = useState("questions");
  const [questions, setQuestions] = useState([]);
   const { questionData } = useContext(AuthContext);

  
  useEffect(() => {
    fetchQuestions();

    const handleBlur = () => {
      setEditorActive(false);
      toast.error("You switched tabs. The editor has been disabled.");
    };

    const handleVisibility = () => {
      if (document.hidden) {
        setEditorActive(false);
        toast.error("Tab visibility changed. The editor has been disabled.");
      }
    };

    const preventContextMenu = (e) => e.preventDefault();
    const preventKeys = (e) => {
      if (
        (e.ctrlKey && ["c", "v", "x", "u"].includes(e.key.toLowerCase())) ||
        (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "i") ||
        e.key === "F12"
      ) {
        e.preventDefault();
      }
    };

    window.addEventListener("blur", handleBlur);
    document.addEventListener("visibilitychange", handleVisibility);
    document.addEventListener("contextmenu", preventContextMenu);
    document.addEventListener("keydown", preventKeys);

    return () => {
      window.removeEventListener("blur", handleBlur);
      document.removeEventListener("visibilitychange", handleVisibility);
      document.removeEventListener("contextmenu", preventContextMenu);
      document.removeEventListener("keydown", preventKeys);
    };
  }, [questionData]);

  const fetchQuestions = () => {
     if(questionData && questionData.length>0){
       setQuestions(questionData);
       return
     }
   
      setQuestions(["Failed to load questions."]);
      toast.error("Failed to load questions.");
    
  };

  const runCode = () => {
    if (!editorActive) return;
    const htmlDoc = htmlCode;
    const styleTag = `<style>${cssCode}</style>`;
    const scriptTag = `<script>${jsCode}</script>`;
    if (iframeRef.current) iframeRef.current.srcdoc = htmlDoc + styleTag + scriptTag;
    setView("result");
    toast.success("Code executed!");
  };

  const submitCode = async () => {
    if (!editorActive) return;
    try {
      await fetch(`https://code-editor-backend-787k.onrender.com/submitAnswer/${questionData._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data:htmlCode+cssCode+jsCode})
      });
      toast.success("Submitted successfully!");
    } catch {
      toast.error("Submission failed.");
    }
  };

  if (!editorActive) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-8 max-w-md text-center bg-white shadow rounded">
          <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
          <h1 className="text-2xl font-bold mb-2 text-gray-800">Editor Disabled</h1>
          <p className="text-gray-600">
            The editor has been locked because you switched tabs or attempted to access restricted features.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      
      <header className="border-b border-gray-300 bg-background px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileCode className="w-6 h-6 text-primary" />
          <h1 className="text-xl font-bold text-foreground">Code Editor</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={runCode}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-background rounded hover:bg-primary-hover"
          >
            <Play className="w-4 h-4 text-background" /> Run Code
          </button>
          <button
            onClick={submitCode}
            className="flex items-center gap-2 px-4 py-2 text-white rounded hover:bg-primary-hover bg-background"
            disabled={!questionData?true:false}
          >
            <Send className="w-4 h-4 text-foreground" /> Submit
          </button>
        </div>
      </header>

      
      <ResizablePanelGroup direction="horizontal" className="flex-1 ">
        {/* Left Panel: Editors */}
        <ResizablePanel defaultSize={50} minSize={30}>
          <ResizablePanelGroup direction="vertical">
            {/* HTML Editor */}
            <ResizablePanel defaultSize={33} minSize={20}>
              <div className="h-full flex flex-col bg-background border-border">
                <div className="flex items-center justify-between px-4 py-2 bg-gray-200 border-b">
                  <span className="text-sm font-semibold text-gray-800">HTML</span>
                  <span className="text-xs text-gray-500">index.html</span>
                </div>
                <div className="flex-1 overflow-auto">
                  <CodeMirror
                    value={htmlCode}
                    height="100%"
                    theme="dark"
                    extensions={[html()]}
                    onChange={setHtmlCode}
                    basicSetup={{
                      lineNumbers: true,
                      highlightActiveLineGutter: true,
                      highlightActiveLine: true,
                      foldGutter: true
                    }}
                  />
                </div>
              </div>
            </ResizablePanel>

            <ResizableHandle />

            {/* CSS Editor */}
            <ResizablePanel defaultSize={33} minSize={20}>
              <div className="h-full flex flex-col bg-background border-border">
                <div className="flex items-center justify-between px-4 py-2 bg-gray-200 border-b">
                  <span className="text-sm font-semibold text-gray-800">CSS</span>
                  <span className="text-xs text-gray-500">styles.css</span>
                </div>
                <div className="flex-1 overflow-auto">
                  <CodeMirror
                    value={cssCode}
                    height="100%"
                    theme="dark"
                    extensions={[css()]}
                    onChange={setCssCode}
                    basicSetup={{
                      lineNumbers: true,
                      highlightActiveLineGutter: true,
                      highlightActiveLine: true,
                      foldGutter: true
                    }}
                  />
                </div>
              </div>
            </ResizablePanel>

            <ResizableHandle />

            {/* JS Editor */}
            <ResizablePanel defaultSize={34} minSize={20}>
              <div className="h-full flex flex-col bg-background border-border">
                <div className="flex items-center justify-between px-4 py-2 bg-gray-200 border-b">
                  <span className="text-sm font-semibold text-gray-800">JavaScript</span>
                  <span className="text-xs text-gray-500">script.js</span>
                </div>
                <div className="flex-1 overflow-auto">
                  <CodeMirror
                    value={jsCode}
                    height="100%"
                    theme="dark"
                    extensions={[javascript()]}
                    onChange={setJsCode}
                    basicSetup={{
                      lineNumbers: true,
                      highlightActiveLineGutter: true,
                      highlightActiveLine: true,
                      foldGutter: true
                    }}
                  />
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>

        <ResizableHandle />

        {/* Right Panel: Questions / Result */}
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="h-full flex flex-col bg-background border-border">
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-200 border-b">
              <button
                className={`px-3 py-1 rounded ${view === "questions" ? "bg-primary text-background" : "bg-background text-foreground"}`}
                onClick={() => {
                  setView("questions");
                  fetchQuestions();
                }}
              >
                <HelpCircle className="inline w-4 h-4 mr-1" /> Questions
              </button>
              <button
                className={`px-3 py-1 rounded ${view === "result" ?"bg-primary text-background" : "bg-background text-foreground"}`}
                onClick={() => setView("result")}
              >
                <Eye className="inline w-4 h-4 mr-1" /> Result
              </button>
            </div>

            <div className="flex-1 overflow-auto p-4 bg-background">
              {view === "questions" ? (
                <div className="space-y-2">
                  {questions.map((q, i) => (
                    <div key={i} className="p-3 bg-secondary text-foreground rounded shadow border-border">
                      {`${i+1}.${q}`}
                    </div>
                  ))}
                </div>
              ) : (
                <iframe
                  ref={iframeRef}
                  sandbox="allow-scripts"
                  className="w-full h-full border rounded bg-foreground"
                  title="Code Preview"
                />
              )}
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Editor;
