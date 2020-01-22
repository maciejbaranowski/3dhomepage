import * as THREE from "three";

import {createInitialInformationDiv, createLoadingModal, updateLoadingModal, closeLoadingModal} from "./modals";

export const createLoadingManager = (lang) => {
  const manager = new THREE.LoadingManager();
  manager.onStart = function (url, itemsLoaded, itemsTotal) {
    createLoadingModal();
  };

  manager.onLoad = function () {
    createInitialInformationDiv(lang);
    closeLoadingModal();
  };

  manager.onProgress = function (url, itemsLoaded, itemsTotal) {
    if (lang === "pl") {
      updateLoadingModal(`Ładowanie: ${(itemsLoaded / itemsTotal * 100).toFixed()} %.`);
    } else {
      updateLoadingModal(`Loading: ${(itemsLoaded / itemsTotal * 100)} %.`);
    }
  };

  manager.onError = function (url) {
    if (lang === "pl") {
      updateLoadingModal('Błąd ładowania');
    } else {
      updateLoadingModal('Loading failed.');
    }
  };
  return manager;
}