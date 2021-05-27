const fileDetailsWrapper = document.querySelector("#file-details-wrapper");
const fileDetails = document.querySelector("#file-details");
const deleteWrapper = document.querySelector("#delete-wrapper");
const uploadInput = document.querySelector("#upload-input");
const deleteButtons = document.querySelectorAll("#delete-btn");
const viewButtons = document.querySelectorAll("#view-btn");
const menuItems = document.querySelectorAll("#menu-item");

const modalBtns = document.querySelectorAll("[data-toggle='modal']");
const errorBox = document.querySelector("#error-box");

const uploadButton = document.querySelector("#upload-btn");
const progressWrapper = document.querySelector("#progress-wrapper");
const progressPrecent = document.querySelector("#progress-precent");
const progressFinish = document.querySelector("#progress-finish");
const progressElement = document.querySelector("#progress");

const getImageUrl = (file) => {
  return URL.createObjectURL(file);
};

const addClass = (element, ...classes) => {
  element.classList.add(...classes);
};

const removeClass = (element, ...classes) => {
  element.classList.remove(...classes);
};

if (uploadButton) {
  const allowedTypes = ["image/png", "image/jpeg", "image/gif"];

  uploadButton.addEventListener("click", async (e) => {
    const files = [...uploadInput.files];

    if (!files.length) {
      return;
    }

    let error = false;

    const formData = new FormData();

    files.forEach((file) => {
      if (!allowedTypes.includes(file.type)) {
        error = true;
        return;
      }

      formData.append(`upload-files`, file);
    });

    if (error) {
      removeClass(errorBox, "hidden");
      errorBox.innerHTML =
        "Invalid file type. Only <strong>jpg, png and gif</strong> image files are allowed!";
      return;
    }

    removeClass(progressWrapper, "hidden");

    if (!error) {
      addClass(errorBox, "hidden");
      errorBox.innerHTML = "";
    }

    try {
      const result = await axios.post("/upload/save", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const precent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );

          progressPrecent.innerHTML = `${precent}%`;
          progressElement.style.width = `${precent}%`;

          if (precent === 100) {
            progressPrecent.innerHTML = "";

            removeClass(progressElement, "bg-blue-500");
            addClass(progressElement, "bg-green-500");

            removeClass(progressFinish, "hidden");
            // addClass(progressWrapper, "hidden");
          }
        },
      });

      if (result.data.success) {
        window.location.reload();
      }
    } catch (error) {
      window.location.reload();
    }
  });
}

if (modalBtns) {
  modalBtns.forEach((button) => {
    button.addEventListener("click", (e) => {
      const modalId = e.currentTarget.getAttribute("data-target");
      const modalTitle = e.currentTarget.getAttribute("data-title");
      const modalElement = document.querySelector(modalId);

      const modalBack = document.querySelector(
        `[data-modal-back='${modalId.replace("#", "")}']`
      );

      modalBack.addEventListener("click", (e) => {
        addClass(modalElement, "hidden");
      });

      const modalTitleElement = document.querySelector(
        `[data-modal-title = "${modalId.replace("#", "")}"]`
      );
      modalTitleElement.innerHTML = modalTitle;

      modalTitle.innerHTML = removeClass(modalElement, "hidden");
    });
  });
}

if (menuItems) {
  const pathname = window.location.pathname;

  menuItems.forEach((item) => {
    const itemPath = item.getAttribute("href");

    if (pathname === itemPath) {
      removeClass(item, "text-gray-300", "hover:bg-gray-700");
      addClass(item, "bg-gray-900", "text-white", "hover:text-white");
    }
  });
}

if (deleteButtons) {
  const deleteModal = document.querySelector("#delete-modal");
  const deleteForm = document.querySelector("#delete-form");
  const cancelBtn = document.querySelector("#delete-cancel");

  deleteButtons.forEach((deletebtn) => {
    deletebtn.addEventListener("click", (e) => {
      const file = JSON.parse(e.currentTarget.dataset.file);

      deleteForm.setAttribute("action", `/upload/delete/${file.id}`);
      addClass(deleteModal, "ease-out", "duration-1000", "opacity-100");
      removeClass(deleteModal, "opacity-0", "hidden");
    });
  });

  if (cancelBtn) {
    cancelBtn.addEventListener("click", (e) => {
      const modalElement = document.querySelector("#delete-modal");
      
      addClass(modalElement, "hidden");
    });
  }
}

if (viewButtons) {
  viewButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const modalId = button.getAttribute("data-target");
      const file = JSON.parse(e.currentTarget.dataset.file);
      const imgElement = document.querySelector(
        `[data-modal-content='${modalId.replace("#", "")}'] img`
      );

      imgElement.setAttribute("src", file.url);
    });
  });
}

const deleteFiles = () => {
  uploadInput.value = "";
  const files = document.querySelectorAll("#selected-img");

  files.forEach((file) => {
    fileDetails.removeChild(file);
  });

  addClass(fileDetailsWrapper, "hidden");
};

if (uploadInput) {
  uploadInput.addEventListener("change", (e) => {
    const files = [...e.target.files];

    if (!files.length) {
      return;
    }

    fileDetails.innerHTML = "";

    const selectedFiles = files.map((file) => ({
      name: file.name,
      url: getImageUrl(file),
    }));

    removeClass(fileDetailsWrapper, "hidden");

    selectedFiles.forEach((file) => {
      const wrapper = document.createElement("div");
      wrapper.setAttribute("id", "selected-img");
      wrapper.setAttribute("class", "flex flex-col items-center w-1/2");

      const imgElement = document.createElement("img");
      imgElement.setAttribute("src", file.url);
      imgElement.setAttribute("class", "w-3/4 h-3/4 mb-3");

      const fileName = document.createElement("span");
      fileName.setAttribute("id", "file-name");
      fileName.innerHTML = `<span><strong>filename: </strong> ${file.name}<span>`;

      wrapper.appendChild(imgElement);
      wrapper.appendChild(fileName);

      fileDetails.appendChild(wrapper);
    });
  });
}

if (deleteWrapper) {
  deleteWrapper.addEventListener("click", (e) => {
    deleteFiles();
  });
}
