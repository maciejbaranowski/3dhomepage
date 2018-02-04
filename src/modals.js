export const createInitialInformationDiv = () => {
  createDismissableInfoModal(
    "<div>Witaj w Twojej prywatnej stronie startowej w 3D. Sterowanie odbywa się za pomocą\
  klawiszy strzałek, lub WSAD. Możesz teraz dodać tę stronę do ulubionych, lub ustawić jako stronę startową, aby\
  łatwo do niej wrócić w dowolnym momencie!</div>"
  );
};

const fullScreenModalStyle = {
  background: "rgba(255, 255, 255, 0.8)",
  position: "fixed",
  top: "50px",
  left: "50px",
  bottom: "50px",
  right: "50px",
  textAlign: "center",
  paddingLeft: "20px",
  paddingRight: "20px",
  paddingTop: "50px",
  paddingBottom: "10px",
  borderRadius: "10px"
};

const createDismissableInfoModal = text => {
  let modal = document.createElement("div");
  modal.className = "informationModal";
  modal.innerHTML = text;
  Object.assign(modal.style, fullScreenModalStyle);
  let closeButton = document.createElement("button");
  closeButton.onclick = () => {
    Array.from(document.getElementsByClassName("informationModal")).forEach(e => {
      e.parentNode.removeChild(e);
    });
  };
  closeButton.innerHTML = "OK";
  closeButton.className = "pure-button pure-button-primary";
  closeButton.style.bottom = "50px";
  closeButton.style.position = "absolute";
  modal.appendChild(closeButton);
  document.body.appendChild(modal);
};
