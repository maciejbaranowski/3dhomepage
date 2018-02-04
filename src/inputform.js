import React from "react";

const Button = props => (
  <button className={"pure-button " + props.className} type="button" onClick={props.onClick}>
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

export class InputForm extends React.Component {
  constructor() {
    super();
    this.state = {
      urls: [
        {
          title: "Google",
          url: "http://www.google.com"
        }
      ]
    };
  }
  addUrl = url => {
    let urls = this.state.urls;
    if (this.state.urls.length >= 10) {
      alert("Można dodać maksykalnie 10 stron!");
    }
    urls.push(url);
    this.setState({ urls });
  };
  exampleWebpages = [
    {
      title: "Google",
      url: "http://www.google.com"
    },
    {
      title: "Facebook",
      url: "http://www.facebook.com"
    },
    {
      title: "Twitter",
      url: "http://www.twitter.com"
    },
    {
      title: "Github",
      url: "http://www.github.com"
    },
    {
      title: "Wikipedia",
      url: "http://www.wikipedia.com"
    },
    {
      title: "Onet",
      url: "http://www.onet.pl"
    },
    {
      title: "Bergsoft",
      url: "http://www.bergsoft.pl"
    }
  ];

  render = () => (
    <div className="pure-g">
      <div className="pure-u-1-6" />
      <div className="pure-u-2-3" style={{ textAlign: "center" }}>
        <form className="pure-form pure-form-aligned">
          <fieldset>
            <h1>3D Homepage</h1>
            <div className="pure-g">
              <p className="pure-u-1">Wybierz strony które najczęściej odwiedzasz, lub wpisz własne poniżej</p>
              <br />
              {this.exampleWebpages.map((url, i) => {
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
              <thead>
                <tr>
                  <th>Ścieżka</th>
                  <th>Tytuł</th>
                  <th>Usuń</th>
                </tr>
              </thead>

              <tbody>
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
              value="Dodaj kolejną stronę"
              className="pure-u-1"
            />
            <div style={{ margin: "5px" }}>
              <Button
                onClick={() => {
                  const urlParams = new URLSearchParams(location.search);
                  urlParams.set("scene", JSON.stringify(this.state));
                  window.location.href = `${location.pathname}?${urlParams}`;
                }}
                value="Stwórz scenę"
                className="pure-button-primary"
              />
            </div>
          </fieldset>
        </form>
      </div>
      <div className="pure-u-1-6" />
    </div>
  );
}
