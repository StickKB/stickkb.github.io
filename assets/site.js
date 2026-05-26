const yearTargets = document.querySelectorAll("[data-year]");
const currentYear = new Intl.DateTimeFormat("en", { year: "numeric" }).format(
  new Date(),
);

for (const target of yearTargets) {
  target.textContent = String(currentYear);
}
