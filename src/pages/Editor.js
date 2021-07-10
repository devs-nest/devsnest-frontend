import Editor, { useMonaco } from '@monaco-editor/react';
import themelist from 'monaco-themes/themes/themelist.json';
import React, { useEffect, useRef, useState } from 'react';
import { MdClose, MdSettings } from 'react-icons/md';
import { Modal, ModalBody } from 'reactstrap';

import { loadStorage, saveStorage } from '../utils/localStorage';

const themes = Object.entries(themelist).map(([key, theme]) => {
  return { label: theme, value: key };
});

const getFinalHtml = ({ html, css, js }) => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Devsnest Code Editor</title>
      <style>${css}</style>
    </head>
    <body>
      ${html}
      <script>${js}</script>
    </body>
    </html>
  `;

export default function DevsnestEditor() {
  const outputRef = useRef();
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [htmlValue, setHtmlValue] = useState(
    loadStorage('htmlValue') || '<div class="text">Some text here</div>'
  );
  const [cssValue, setCssValue] = useState(
    loadStorage('cssValue') || '.text { text-align: center; color: blue; }'
  );
  const [jsValue, setJsValue] = useState(
    loadStorage('jsValue') || 'console.log(document.querySelector(".text"));'
  );

  const [settings, setSettings] = useState({
    minimap: false,
    wordWrap: true,
    fontSize: 14,
    vimMode: false,
    theme: 'vs-dark',
  });
  const updateSettings = (newData) => setSettings({ ...settings, ...newData });
  const monaco = useMonaco();

  useEffect(() => {
    if (!monaco) return;

    const loadThemes = async () => {
      for (const theme of themes) {
        try {
          const tmTheme = await import(
            `monaco-themes/themes/${theme.label}.json`
          );
          monaco.editor.defineTheme(theme.value, tmTheme);
        } catch (e) {
          console.log('Error loading theme', theme.label);
          console.log(e);
        }
      }
    };

    loadThemes();
  }, [monaco]);

  useEffect(() => {
    let rootElement = outputRef.current.contentWindow.document.body.querySelector(
      'div#root'
    );
    if (!rootElement) {
      rootElement = outputRef.current.contentWindow.document.createElement(
        'div'
      );
      rootElement.id = 'root';
      outputRef.current.contentWindow.document.body.appendChild(rootElement);
    }
    rootElement.innerHTML = htmlValue;
    saveStorage('htmlValue', htmlValue);
  }, [htmlValue]);

  useEffect(() => {
    let styleElement = outputRef.current.contentWindow.document.body.querySelector(
      'style#global'
    );
    if (!styleElement) {
      styleElement = outputRef.current.contentWindow.document.createElement(
        'style'
      );
      styleElement.id = 'global';
      outputRef.current.contentWindow.document.body.appendChild(styleElement);
    }
    styleElement.innerHTML = cssValue;
    saveStorage('cssValue', cssValue);
  }, [cssValue]);

  useEffect(() => {
    let jsElement = outputRef.current.contentWindow.document.body.querySelector(
      'script#global'
    );
    if (!jsElement) {
      jsElement = outputRef.current.contentWindow.document.createElement(
        'script'
      );
      jsElement.id = 'global';
      outputRef.current.contentWindow.document.body.appendChild(jsElement);
    }
    jsElement.innerHTML = jsValue;
    saveStorage('jsValue', jsValue);
  }, [jsValue]);

  return (
    <>
      <div
        className="d-flex flex-column"
        style={{ height: `calc(100vh - 92px)`, backgroundColor: '#f6f6f6' }}
      >
        <div className="d-flex align-items-center my-1 px-3">
          <h3 className="mb-0">Code Editor</h3>
          <button
            className="btn btn-light ml-auto"
            onClick={() => setSettingsModalOpen(true)}
          >
            <span className="btn-icon">
              <MdSettings />
            </span>
          </button>
        </div>
        <div className="d-flex" style={{ flex: 1 }}>
          <div className="d-flex flex-column" style={{ flex: 1 }}>
            <div style={{ flex: 1, borderBottom: '2px solid #fff' }}>
              <Editor
                height="100%"
                width="100%"
                language="html"
                value={htmlValue}
                onChange={setHtmlValue}
                theme={settings.theme}
                options={{
                  minimap: { enabled: settings.minimap },
                  wordWrap: settings.wordWrap ? 'on' : 'off',
                  fontSize: `${settings.fontSize || 0}px`,
                }}
              />
            </div>
            <div style={{ flex: 1, borderBottom: '2px solid #fff' }}>
              <Editor
                height="100%"
                width="100%"
                language="css"
                value={cssValue}
                onChange={setCssValue}
                theme={settings.theme}
                options={{
                  minimap: { enabled: settings.minimap },
                  wordWrap: settings.wordWrap ? 'on' : 'off',
                  fontSize: `${settings.fontSize || 0}px`,
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <Editor
                height="100%"
                width="100%"
                language="javascript"
                value={jsValue}
                onChange={setJsValue}
                theme={settings.theme}
                options={{
                  minimap: { enabled: settings.minimap },
                  wordWrap: settings.wordWrap ? 'on' : 'off',
                  fontSize: `${settings.fontSize || 0}px`,
                }}
              />
            </div>
          </div>
          <div className="d-flex flex-column" style={{ flex: 1 }}>
            <iframe
              ref={outputRef}
              className="h-100 w-100 border-0"
              title="Output"
              style={{ backgroundColor: '#fff' }}
            ></iframe>
          </div>
        </div>
      </div>

      <Modal isOpen={settingsModalOpen} contentClassName="bg-black text-light">
        <div className="border-dark modal-header align-items-center">
          <h5 className="mb-0">Editor Settings</h5>
          <button
            type="button"
            className="btn btn-light ml-auto"
            aria-label="Close"
            onClick={() => setSettingsModalOpen(false)}
          >
            <MdClose />
          </button>
        </div>
        <ModalBody>
          <div className="row align-items-center mb-2">
            <div className="col-4">
              <label htmlFor="wordWrap">Word Wrap:</label>
            </div>
            <div className="col-6">
              <input
                type="checkbox"
                id="wordWrap"
                checked={settings.wordWrap}
                onChange={(e) => updateSettings({ wordWrap: e.target.checked })}
              />
            </div>
          </div>

          <div className="row align-items-center mb-2">
            <div className="col-4">
              <label htmlFor="minimap">Minimap:</label>
            </div>
            <div className="col-6">
              <input
                type="checkbox"
                id="minimap"
                checked={settings.minimap}
                onChange={(e) => updateSettings({ minimap: e.target.checked })}
              />
            </div>
          </div>

          <div className="row align-items-center mb-2">
            <div className="col-4">
              <label htmlFor="fontSize">Font Size (px):</label>
            </div>
            <div className="col-6">
              <input
                className="form-control"
                type="number"
                id="fontSize"
                value={settings.fontSize}
                onChange={(e) =>
                  updateSettings({ fontSize: e.target.valueAsNumber })
                }
              />
            </div>
          </div>

          <div className="row align-items-center mb-2">
            <div className="col-4">
              <label htmlFor="theme">Select Theme: </label>
            </div>
            <div className="col-6">
              <select
                className="custom-select"
                id="theme"
                value={settings.theme}
                onChange={(e) => updateSettings({ theme: e.target.value })}
              >
                <option className="py-2" value="vs-dark">
                  VS Dark
                </option>
                {themes.map((theme) => (
                  <option
                    className="py-2"
                    key={theme.label}
                    value={theme.value}
                  >
                    {theme.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
