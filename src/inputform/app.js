import React from "react";
import lang from "./languageProvider";

const Button = props => (
  <button className={"pure-button " + props.className} type="button" onClick={props.onClick} style={props.style}>
    {props.value}
  </button>
);

const UrlSingleInput = props => (
  <tr>
    <td>
      <input required type="text" className="pure-input-1" value={props.url.url} onChange={props.changeUrl} />
    </td>
    <td>
      <input required type="text" className="pure-input-1" value={props.url.title} onChange={props.changeTitle} />
    </td>
    <td>
      <Button value="X" onClick={props.deleteUrl} />
    </td>
  </tr>
);

export class App extends React.Component {
  constructor() {
    let bodyStyle = document.getElementsByTagName("body")[0].style;
    bodyStyle.background = 'url("./textures/background.jpg")';
    bodyStyle.backgroundRepeat = "no-repeat";
    bodyStyle.backgroundPosition = "center center";
    bodyStyle.backgroundAttachment = "fixed";
    bodyStyle.backgroundSize = "cover";
    bodyStyle.backgroundOpacity = 0.5;
    bodyStyle.fontFamily = "Open Sans";

    super();
    this.state = {
      urls: [
        {
          title: "Google",
          url: "http://www.google.com"
        }
      ],
      language: "pl"
    };
  }
  addUrl = url => {
    let urls = this.state.urls;
    if (this.state.urls.length >= 10) {
      alert(lang.get().maxLimitReached);
      return;
    }
    urls.push(url);
    this.setState({ urls });
  };

  render = () => (
    <div
      className="pure-g"
      style={{
        width: "100%",
        height: "100%",
        position: "absolute"
      }}
    >
      <div className="pure-u-1-6" />
      <div className="pure-u-2-3" style={{ textAlign: "center" }}>
        <form className="pure-form pure-form-aligned">
          <fieldset>
            <h1>3D Homepage</h1>
            <Button
              value={lang.get().changeLanguage}
              onClick={e => {
                lang.toogleLanguage();
                this.setState({ language: lang.language });
              }}
            />
            <div className="pure-g">
              <p className="pure-u-1"> {lang.get().chooseOrTypePages}</p>
              <br />
              {lang.get().exampleWebpages.map((url, i) => {
                return (
                  <div style={{ margin: "5px" }} key={i}>
                    <Button
                      value={url.title}
                      onClick={e => {
                        this.addUrl(url);
                      }}
                    />
                  </div>
                );
              })}
            </div>
            <table className="pure-table" style={{ width: "100%" }}>
              <thead style={{ textAlign: "center" }}>
                <tr>
                  <th>{lang.get().path}</th>
                  <th>{lang.get().title}</th>
                  <th>{lang.get().delete}</th>
                </tr>
              </thead>

              <tbody style={{ background: "white" }}>
                {this.state.urls.map((url, i) => {
                  return (
                    <UrlSingleInput
                      url={url}
                      key={i}
                      changeUrl={event => {
                        const urls = this.state.urls;
                        urls[i].url = event.target.value;
                        this.setState({ urls });
                      }}
                      changeTitle={event => {
                        const urls = this.state.urls;
                        urls[i].title = event.target.value;
                        this.setState({ urls });
                      }}
                      deleteUrl={event => {
                        const urls = this.state.urls;
                        urls.splice(i, 1);
                        this.setState({ urls });
                      }}
                    />
                  );
                })}
              </tbody>
            </table>
            <Button
              onClick={() => {
                this.addUrl({ title: "", url: "http://" });
              }}
              value={lang.get().addAnother}
              className="pure-u-1"
            />
            <Button
              onClick={() => {
                const urlParams = new URLSearchParams(location.search);
                urlParams.set("scene", JSON.stringify(this.state));
                window.location.href = `${location.pathname}?${urlParams}`;
              }}
              value={lang.get().createScene}
              style={{ fontSize: "150%", backgroundColor: "#d02020", margin: "25px" }}
              className="pure-button-primary"
            />
          </fieldset>
        </form>
      </div>
      <div className="pure-u-1-6" />
    </div>
  );
}
