const observer = new IntersectionObserver(
  (entries) =>
    entries.forEach(
      (entry) => entry.isIntersecting && entry.target.classList.add("visible"),
    ),
  { threshold: 0.12 },
);
document
  .querySelectorAll(".reveal")
  .forEach((section) => observer.observe(section));
const articleLink = document.querySelector("#artikel article a");
if (articleLink) articleLink.setAttribute("href", "./article.html");
const imageModal = document.querySelector("#imageModal");
const modalImage = document.querySelector("#modalImage");
const modalCaption = document.querySelector("#modalCaption");
const closeImageModal = () => {
  imageModal.hidden = true;
  imageModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
};
document.querySelectorAll(".activity-card > img, .certificate-card > img").forEach((image) => {
  image.tabIndex = 0;
  image.addEventListener("click", () => {
    modalImage.src = image.src;
    modalImage.alt = image.alt;
    modalCaption.textContent = image.alt;
    imageModal.hidden = false;
    imageModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
  image.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") image.click();
  });
});
imageModal?.addEventListener("click", (event) => {
  if (event.target.hasAttribute("data-close-modal")) closeImageModal();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && imageModal && !imageModal.hidden) closeImageModal();
});
const copyBtn = document.querySelector("#copyBtn");
copyBtn.addEventListener("click", async () => {
  const email = document.querySelector("#email").textContent.trim();
  try {
    await navigator.clipboard.writeText(email);
  } catch {}
  copyBtn.textContent = "Copied!";
  setTimeout(() => (copyBtn.textContent = "Copy"), 1800);
});
