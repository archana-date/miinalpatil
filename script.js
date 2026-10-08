// ========================================
// MIINAL PATIL WEBSITE - JAVASCRIPT
// ========================================

const root = document.documentElement;

const themeToggle =
  document.getElementById("themeToggle");

const themeIcon =
  themeToggle
    ? themeToggle.querySelector(".theme-icon")
    : null;

const menuToggle =
  document.getElementById("menuToggle");

const mainNav =
  document.getElementById("mainNav");

const backToTop =
  document.getElementById("backToTop");

const form =
  document.getElementById("contactForm");

const formNote =
  document.getElementById("formNote");

// ========================================
// GOOGLE SHEETS WEB APP URL
// ========================================

const GOOGLE_SHEETS_URL =
  "https://script.google.com/macros/s/AKfycbzuLK0PoPc_A0gk74n_ov37bHKa6V63bP5WzlUl6A13OfFqzk3-DhctUizRQFHQzdF-/exec";

// ========================================
// SUCCESS DIALOG ELEMENTS
// ========================================

const successDialog =
  document.getElementById("successDialog");

const successDialogClose =
  document.getElementById(
    "successDialogClose"
  );

const successDialogOk =
  document.getElementById(
    "successDialogOk"
  );

// ========================================
// 1. LIGHT / DARK MODE
// ========================================

const savedTheme =
  localStorage.getItem("miinal-theme");

if (savedTheme) {
  applyTheme(savedTheme);
} else {
  applyTheme("light");
}

if (themeToggle) {
  themeToggle.addEventListener(
    "click",
    () => {
      const currentTheme =
        root.classList.contains("dark")
          ? "dark"
          : "light";

      const newTheme =
        currentTheme === "dark"
          ? "light"
          : "dark";

      applyTheme(newTheme);
    }
  );
}

// ========================================
// 2. THEME FUNCTION
// ========================================

function applyTheme(theme) {

  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }

  localStorage.setItem(
    "miinal-theme",
    theme
  );

  if (themeIcon) {
    themeIcon.textContent =
      theme === "dark"
        ? "☀"
        : "☾";
  }

  if (themeToggle) {
    themeToggle.setAttribute(
      "aria-label",
      theme === "dark"
        ? "Switch to light mode"
        : "Switch to dark mode"
    );
  }
}

// ========================================
// 3. MOBILE MENU
// ========================================

if (menuToggle && mainNav) {

  menuToggle.addEventListener(
    "click",
    () => {

      const menuIsOpen =
        mainNav.classList.toggle("open");

      menuToggle.setAttribute(
        "aria-expanded",
        String(menuIsOpen)
      );
    }
  );

  mainNav
    .querySelectorAll("a")
    .forEach((link) => {

      link.addEventListener(
        "click",
        () => {

          mainNav.classList.remove(
            "open"
          );

          menuToggle.setAttribute(
            "aria-expanded",
            "false"
          );
        }
      );
    });
}

// ========================================
// 4. ACTIVE NAVIGATION
// ========================================

const sections =
  document.querySelectorAll(
    "main section[id]"
  );

const navLinks =
  document.querySelectorAll(
    ".main-nav a"
  );

if (
  sections.length &&
  navLinks.length
) {

  const observer =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) {
            return;
          }

          navLinks.forEach((link) => {
            link.classList.remove(
              "active"
            );
          });

          const activeLink =
            document.querySelector(
              `.main-nav a[href="#${entry.target.id}"]`
            );

          if (activeLink) {
            activeLink.classList.add(
              "active"
            );
          }
        });

      },
      {
        rootMargin:
          "-30% 0px -60% 0px",
        threshold: 0
      }
    );

  sections.forEach((section) => {
    observer.observe(section);
  });
}

// ========================================
// 5. BACK TO TOP
// ========================================

if (backToTop) {

  window.addEventListener(
    "scroll",
    () => {

      if (window.scrollY > 500) {

        backToTop.classList.add(
          "show"
        );

      } else {

        backToTop.classList.remove(
          "show"
        );
      }
    }
  );

  backToTop.addEventListener(
    "click",
    () => {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  );
}

// ========================================
// 6. SUCCESS DIALOG
// ========================================

function openSuccessDialog() {

  if (!successDialog) {
    return;
  }

  successDialog.hidden = false;

  document.body.style.overflow =
    "hidden";

  if (successDialogOk) {
    successDialogOk.focus();
  }
}

function closeSuccessDialog() {

  if (!successDialog) {
    return;
  }

  successDialog.hidden = true;

  document.body.style.overflow =
    "";
}

if (successDialogClose) {

  successDialogClose.addEventListener(
    "click",
    closeSuccessDialog
  );
}

if (successDialogOk) {

  successDialogOk.addEventListener(
    "click",
    closeSuccessDialog
  );
}

if (successDialog) {

  successDialog.addEventListener(
    "click",
    (event) => {

      if (
        event.target ===
        successDialog
      ) {
        closeSuccessDialog();
      }
    }
  );
}

document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Escape" &&
      successDialog &&
      !successDialog.hidden
    ) {
      closeSuccessDialog();
    }
  }
);

// ========================================
// 7. CONTACT FORM VALIDATION
// ========================================

if (form) {

  function getErrorElement(field) {

    const fieldId =
      field.getAttribute("id");

    if (!fieldId) {
      return null;
    }

    const errorId =
      `${fieldId}-error`;

    let errorElement =
      document.getElementById(errorId);

    if (!errorElement) {

      errorElement =
        document.createElement("div");

      errorElement.id =
        errorId;

      errorElement.className =
        "field-error";

      errorElement.setAttribute(
        "role",
        "alert"
      );

      field.parentElement.appendChild(
        errorElement
      );
    }

    return errorElement;
  }

  function showFieldError(
    field,
    message
  ) {

    const errorElement =
      getErrorElement(field);

    if (!errorElement) {
      return;
    }

    errorElement.textContent =
      message;

    field.classList.add(
      "input-error"
    );

    field.setAttribute(
      "aria-invalid",
      "true"
    );

    field.setAttribute(
      "aria-describedby",
      errorElement.id
    );
  }

  function clearFieldError(field) {

    const errorElement =
      getErrorElement(field);

    if (errorElement) {
      errorElement.textContent =
        "";
    }

    field.classList.remove(
      "input-error"
    );

    field.removeAttribute(
      "aria-invalid"
    );

    field.removeAttribute(
      "aria-describedby"
    );
  }

  function validateField(field) {

    const value =
      field.value.trim();

    const fieldName =
      field.getAttribute("name") ||
      field.getAttribute("id") ||
      "";

    clearFieldError(field);

    if (
      field.hasAttribute("required") &&
      !value
    ) {

      let message =
        "This field is required.";

      if (
        fieldName === "name" ||
        fieldName === "fullName"
      ) {

        message =
          "Please enter your name.";

      } else if (
        fieldName === "email"
      ) {

        message =
          "Please enter your email address.";

      } else if (
        fieldName === "phone" ||
        fieldName === "mobile"
      ) {

        message =
          "Please enter your phone number.";

      } else if (
        fieldName === "city"
      ) {

        message =
          "Please enter your city.";

      } else if (
        fieldName === "businessCategory"
      ) {

        message =
          "Please select your business category.";

      } else if (
        fieldName === "annualTurnover"
      ) {

        message =
          "Please select your annual turnover.";

      } else if (
        fieldName === "requirement"
      ) {

        message =
          "Please select what we can help you with.";
      }

      showFieldError(
        field,
        message
      );

      return false;
    }

    if (
      field.type === "email" &&
      value
    ) {

      const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

      if (
        !emailPattern.test(value)
      ) {

        showFieldError(
          field,
          "Please enter a valid email address."
        );

        return false;
      }
    }

    return true;
  }

  const formFields =
    form.querySelectorAll(
      "input, textarea, select"
    );

  formFields.forEach((field) => {

    field.addEventListener(
      "blur",
      () => {
        validateField(field);
      }
    );

    field.addEventListener(
      "input",
      () => {

        if (
          field.classList.contains(
            "input-error"
          )
        ) {
          validateField(field);
        }
      }
    );

    field.addEventListener(
      "change",
      () => {

        if (
          field.classList.contains(
            "input-error"
          )
        ) {
          validateField(field);
        }
      }
    );
  });

  form.addEventListener(
    "submit",
    async (event) => {

      event.preventDefault();

      let formIsValid =
        true;

      let firstInvalidField =
        null;

      formFields.forEach((field) => {

        const fieldIsValid =
          validateField(field);

        if (!fieldIsValid) {

          formIsValid =
            false;

          if (!firstInvalidField) {
            firstInvalidField =
              field;
          }
        }
      });

      if (!formIsValid) {

        if (firstInvalidField) {
          firstInvalidField.focus();
        }

        if (formNote) {
          formNote.textContent =
            "Please check the highlighted fields and try again.";
        }

        return;
      }

      // ========================================
      // PREPARE FORM DATA
      // ========================================

      const formData = {

        name:
          document
            .getElementById("name")
            .value
            .trim(),

        phone:
          document
            .getElementById("phone")
            .value
            .trim(),

        email:
          document
            .getElementById("email")
            .value
            .trim(),

        city:
          document
            .getElementById("city")
            .value
            .trim(),

        businessCategory:
          document
            .getElementById(
              "businessCategory"
            )
            .value,

        annualTurnover:
          document
            .getElementById(
              "annualTurnover"
            )
            .value,

        requirement:
          document
            .getElementById(
              "requirement"
            )
            .value
      };

      // ========================================
      // SHOW SUBMITTING STATE
      // ========================================

      const submitButton =
        form.querySelector(
          'button[type="submit"]'
        );

      const originalButtonText =
        submitButton
          ? submitButton.innerHTML
          : "";

      if (submitButton) {

        submitButton.disabled =
          true;

        submitButton.innerHTML =
          `
          Sending...
          <span aria-hidden="true">→</span>
          `;
      }

      if (formNote) {

        formNote.textContent =
          "Submitting your enquiry...";
      }

      // ========================================
      // SEND DATA TO GOOGLE SHEETS
      // ========================================

      try {

        const response =
          await fetch(
            GOOGLE_SHEETS_URL,
            {
              method: "POST",
              body:
                JSON.stringify(
                  formData
                )
            }
          );

        const result =
          await response.json();

        if (!result.success) {

          throw new Error(
            result.message ||
            "Unable to submit the form."
          );
        }

        // ========================================
        // SUCCESS
        // ========================================

        form.reset();

        formFields.forEach(
          (field) => {
            clearFieldError(field);
          }
        );

        if (formNote) {
          formNote.textContent =
            "";
        }

        openSuccessDialog();

      } catch (error) {

        console.error(
          "Form submission error:",
          error
        );

        if (formNote) {

          formNote.textContent =
            "Something went wrong while submitting your enquiry. Please try again.";
        }

      } finally {

        if (submitButton) {

          submitButton.disabled =
            false;

          submitButton.innerHTML =
            originalButtonText;
        }
      }
    }
  );
}

// ========================================
// 8. SMOOTH SCROLL
// ========================================

document
  .querySelectorAll(
    'a[href^="#"]'
  )
  .forEach((link) => {

    link.addEventListener(
      "click",
      function (event) {

        const targetId =
          this.getAttribute("href");

        if (
          targetId === "#" ||
          targetId === ""
        ) {
          return;
        }

        const target =
          document.querySelector(
            targetId
          );

        if (!target) {
          return;
        }

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    );
  });

// ========================================
// 9. CLOSE MENU ON ESCAPE
// ========================================

document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Escape" &&
      mainNav &&
      mainNav.classList.contains(
        "open"
      )
    ) {

      mainNav.classList.remove(
        "open"
      );

      if (menuToggle) {

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );
      }
    }
  }
);

// ========================================
// 10. PODCAST HORIZONTAL SLIDER
// ========================================

const podcastSlider =
  document.getElementById(
    "podcastSlider"
  );

const podcastLeftArrow =
  document.querySelector(
    ".media-arrow-left"
  );

const podcastRightArrow =
  document.querySelector(
    ".media-arrow-right"
  );

if (podcastSlider) {

  const getPodcastScrollAmount =
    () => {

      const card =
        podcastSlider.querySelector(
          ".media-card"
        );

      if (!card) {
        return 0;
      }

      const sliderStyles =
        window.getComputedStyle(
          podcastSlider
        );

      const gap =
        parseFloat(
          sliderStyles.columnGap ||
          sliderStyles.gap ||
          "24"
        );

      return (
        card.getBoundingClientRect()
          .width + gap
      );
    };

  if (podcastLeftArrow) {

    podcastLeftArrow.addEventListener(
      "click",
      () => {

        podcastSlider.scrollBy({
          left:
            -getPodcastScrollAmount(),
          behavior: "smooth"
        });
      }
    );
  }

  if (podcastRightArrow) {

    podcastRightArrow.addEventListener(
      "click",
      () => {

        podcastSlider.scrollBy({
          left:
            getPodcastScrollAmount(),
          behavior: "smooth"
        });
      }
    );
  }
}