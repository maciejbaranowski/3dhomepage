export const createInitialInformationDiv = language => {
  if (language == "pl")
    createDismissableInfoModal(
      "<div>Witaj w Twojej prywatnej stronie startowej w 3D. Sterowanie odbywa się za pomocą\
  klawiszy strzałek, lub WSAD. Możesz teraz dodać tę stronę do ulubionych, lub ustawić jako stronę startową, aby\
  łatwo do niej wrócić w dowolnym momencie!</div>"
    );
  else
    createDismissableInfoModal(
      "<div>Welcome your private 3d homepage. You can look around and walk with arrow keys\
  or WSAD keys. You can now add this webpage to favoruites or set it up as your browser homepage\
  to conveniently come back whenever you want!</div>"
    );
};

const fullScreenModalStyle = {
  background: "rgba(255, 255, 255, 0.8)",
  position: "fixed",
  top: "50px",
  left: "50px",
  right: "50px",
  textAlign: "center",
  padding: "20px",
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
  closeButton.style.marginTop = "20px";
  closeButton.style.position = "relative";
  modal.appendChild(closeButton);
  document.body.appendChild(modal);
};
