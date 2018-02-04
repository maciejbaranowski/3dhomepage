import React from "react";

const CreateSceneButton = () => (
  <button
    id="execute"
    className="pure-button pure-button-primary"
    type="button"
    onClick={() => {
      const sceneParameters = {
        urls: []
      };
      Array.from(document.getElementsByClassName("url-provider")).forEach(e => {
        sceneParameters.urls.push({
          url: e.getElementsByClassName("path")[0].value,
          title: e.getElementsByClassName("title")[0].value
        });
      });

      const urlParams = new URLSearchParams(location.search);
      urlParams.set("scene", JSON.stringify(sceneParameters));
      window.location.href = `${location.pathname}?${urlParams}`;
    }}
  >
    Stwórz scenę!
  </button>
);

const FillExampleButton = () => (
  <button
    id="fillExample"
    className="pure-button"
    type="button"
    onClick={() => {
      const exampleParams = {
        urls: [
          {
            title: "Google",
            url: "http://www.google.com"
          },
          {
            title: "Facebook",
            url: "http://www.facebook.com"
          },
          {
            title: "Poczta",
            url: "http://poczta.onet.pl"
          },
          {
            title: "BergSoft",
            url: "http://www.bergsoft.pl"
          }
        ]
      };
      Array.from(document.getElementsByClassName("url-provider")).forEach((e, i) => {
        e.getElementsByClassName("path")[0].value = exampleParams.urls[i].url;
        e.getElementsByClassName("title")[0].value = exampleParams.urls[i].title;
      });
    }}
  >
    Wypełnij przykładowymi stronami
  </button>
);

export const InputForm = () => (
  <div className="pure-g">
    <div className="pure-u-1-6" />
    <div className="pure-u-2-3" style={{ textAlign: "center" }}>
      <form className="pure-form pure-form-aligned">
        <fieldset>
          <h1>3D Homepage</h1>
          <p>Wprowadź poniżej adresy stron które najczęściej odwiedzasz</p>
          <div className="pure-g">
            <h3 className="pure-u-1-2">Ścieżka</h3>
            <h3 className="pure-u-1-2">Tytuł</h3>
          </div>
          <div className="url-provider pure-control-group pure-g">
            <input required type="text" className="path pure-u-1-2" defaultValue="http://" />
            <input required type="text" className="title pure-u-1-2" defaultValue="" />
          </div>
          <div className="url-provider pure-control-group pure-g">
            <input required type="text" className="path pure-u-1-2" defaultValue="http://" />
            <input required type="text" className="title pure-u-1-2" defaultValue="" />
          </div>
          <div className="url-provider pure-control-group pure-g">
            <input required type="text" className="path pure-u-1-2" defaultValue="http://" />
            <input required type="text" className="title pure-u-1-2" defaultValue="" />
          </div>
          <div className="url-provider pure-control-group pure-g">
            <input required type="text" className="path pure-u-1-2" defaultValue="http://" />
            <input required type="text" className="title pure-u-1-2" defaultValue="" />
          </div>
          <FillExampleButton />
          <CreateSceneButton />
        </fieldset>
      </form>
    </div>
    <div className="pure-u-1-6" />
  </div>
);
