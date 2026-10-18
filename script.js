
(() => {
  "use strict";

  const STORAGE_KEY = "umahan-farm-records-v1";
  const emptyData = { crops: [], expenses: [], harvests: [] };

  const starterCrops = [
    { id: "sample-rice", name: "Rice", planted: "2026-09-10", expected: "2027-01-10", status: "Growing", area: 0.5, areaUnit: "ha", emoji: "🌾" },
    { id: "sample-corn", name: "Corn", planted: "2026-09-15", expected: "2026-12-15", status: "Growing", area: 0.3, areaUnit: "ha", emoji: "🌽" },
    { id: "sample-tomato", name: "Tomato", planted: "2026-09-20", expected: "2026-11-20", status: "Growing", area: 200, areaUnit: "sqm", emoji: "🍅" },
    { id: "sample-monggo", name: "Monggo", planted: "2026-09-22", expected: "2026-11-22", status: "Growing", area: 0.2, areaUnit: "ha", emoji: "🌱" },
    { id: "sample-pechay", name: "Pechay", planted: "2026-09-25", expected: "2026-11-05", status: "Growing", area: 100, areaUnit: "sqm", emoji: "🥬" }
  ];

  const icons = {
    empty: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21v-9"/><path d="M12 14c-5.5 0-8-3-8-8 5.5 0 8 3 8 8Z"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 6h18M8 6V4h8v2m3 0-1 14H6L5 6m4 4v6m6-6v6"/></svg>'
  };

  const today = () => {
    const now = new Date();
    return new Date(now.getTime() - now.getTimezoneOffset() * 60000)
      .toISOString().slice(0, 10);
  };

  const currency = amount =>
    new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      maximumFractionDigits: 0
    }).format(Number(amount) || 0);

  const escapeHTML = value =>
    String(value ?? "").replace(/[&<>"']/g, char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[char]);

  const formatDate = value => {
    if (!value) return "—";
    const date = new Date(value + "T00:00:00");
    return Number.isNaN(date.getTime())
      ? "—"
      : date.toLocaleDateString("en-PH", {
          month: "short",
          day: "numeric",
          year: "numeric"
        });
  };

  const makeId = () =>
    window.crypto && crypto.randomUUID
      ? crypto.randomUUID()
      : Date.now().toString(36) + Math.random().toString(36).slice(2);

  let data;
  let firstVisit = false;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const saved = JSON.parse(stored || "null");
    firstVisit = stored === null;

    data = saved && typeof saved === "object"
      ? {
          crops: Array.isArray(saved.crops) ? saved.crops : [],
          expenses: Array.isArray(saved.expenses) ? saved.expenses : [],
          harvests: Array.isArray(saved.harvests) ? saved.harvests : []
        }
      : { ...emptyData };

    if (firstVisit) data.crops = starterCrops;
  } catch (error) {
    console.error("Unable to load farm records.", error);
    data = { ...emptyData };
  }

  const save = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error("Unable to save farm records.", error);
      showToast("Could not save. Check browser storage settings.");
      return false;
    }
  };

  const showToast = message => {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast.timeout);
    showToast.timeout = setTimeout(
      () => toast.classList.remove("show"),
      2600
    );
  };

  const emptyState = message =>
    `<div class="empty-state"><div class="empty-icon">${icons.empty}</div><strong>${escapeHTML(message)}</strong><span>Add a record to see it here.</span></div>`;

  const actionButton = (type, id, label) =>
    `<button class="icon-button delete-record" type="button" data-type="${type}" data-id="${escapeHTML(id)}" aria-label="Delete ${escapeHTML(label)}" title="Delete">${icons.trash}</button>`;

  const statusLabel = status => status;

  function renderCrops() {
    const recent = [...data.crops].slice(-4).reverse();

    document.getElementById("dashboard-crops").innerHTML = recent.length
      ? `<div class="table-wrap"><table><thead><tr><th>Crop</th><th>Area</th><th>Expected harvest</th><th>Status</th></tr></thead><tbody>${recent.map(crop => `<tr><td><div class="crop-name"><span class="crop-emoji">${escapeHTML(crop.emoji || "🌱")}</span>${escapeHTML(crop.name)}</div></td><td>${escapeHTML(crop.area)} ${escapeHTML(crop.areaUnit || "ha")}</td><td>${formatDate(crop.expected)}</td><td><span class="badge ${crop.status === "Planned" ? "planned" : ""}">${escapeHTML(statusLabel(crop.status))}</span></td></tr>`).join("")}</tbody></table></div>`
      : emptyState("No crops recorded yet");

    const sorted = [...data.crops].reverse();

    document.getElementById("crops-table").innerHTML = sorted.length
      ? `<div class="table-wrap"><table><thead><tr><th>Crop</th><th>Area</th><th>Planting date</th><th>Expected harvest</th><th>Status</th><th></th></tr></thead><tbody>${sorted.map(crop => `<tr><td><div class="crop-name"><span class="crop-emoji">${escapeHTML(crop.emoji || "🌱")}</span>${escapeHTML(crop.name)}</div></td><td>${escapeHTML(crop.area)} ${escapeHTML(crop.areaUnit || "ha")}</td><td>${formatDate(crop.planted)}</td><td>${formatDate(crop.expected)}</td><td><span class="badge ${crop.status === "Planned" ? "planned" : ""}">${escapeHTML(statusLabel(crop.status))}</span></td><td>${actionButton("crops", crop.id, crop.name)}</td></tr>`).join("")}</tbody></table></div>`
      : emptyState("No crops recorded yet");

    document.getElementById("crop-count").textContent =
      `${data.crops.length} ${data.crops.length === 1 ? "crop" : "crops"} recorded`;

    document.getElementById("stat-crops").textContent =
      data.crops.filter(crop =>
        crop.status === "Growing" || crop.status === "Ready to harvest"
      ).length;
  }

  function renderExpenses() {
    const expenses = [...data.expenses].reverse();

    document.getElementById("expenses-table").innerHTML = expenses.length
      ? `<div class="table-wrap"><table><thead><tr><th>Date</th><th>Item / description</th><th>Category</th><th>Amount</th><th></th></tr></thead><tbody>${expenses.map(item => `<tr><td>${formatDate(item.date)}</td><td>${escapeHTML(item.description)}</td><td>${escapeHTML(item.category)}</td><td>${currency(item.amount)}</td><td>${actionButton("expenses", item.id, item.description)}</td></tr>`).join("")}</tbody></table></div>`
      : emptyState("No expenses recorded yet");

    const total = data.expenses.reduce(
      (sum, item) => sum + (Number(item.amount) || 0), 0
    );

    document.getElementById("expense-count").textContent =
      `${data.expenses.length} ${data.expenses.length === 1 ? "expense" : "expenses"} recorded`;
    document.getElementById("expense-total").textContent = `Total: ${currency(total)}`;
    document.getElementById("stat-expenses").textContent = currency(total);
  }

  function renderHarvests() {
    const harvests = [...data.harvests].reverse();

    document.getElementById("harvests-table").innerHTML = harvests.length
      ? `<div class="table-wrap"><table><thead><tr><th>Date</th><th>Crop</th><th>Quantity</th><th>Unit</th><th>Value</th><th></th></tr></thead><tbody>${harvests.map(item => `<tr><td>${formatDate(item.date)}</td><td>${escapeHTML(item.cropName)}</td><td>${Number(item.quantity).toLocaleString("en-PH")}</td><td>${escapeHTML(item.unit)}</td><td>${currency(item.value)}</td><td>${actionButton("harvests", item.id, item.cropName + " harvest")}</td></tr>`).join("")}</tbody></table></div>`
      : emptyState("No harvests recorded yet");

    const quantitiesByUnit = data.harvests.reduce((totals, item) => {
      const unit = item.unit || "kg";
      totals[unit] = (totals[unit] || 0) + (Number(item.quantity) || 0);
      return totals;
    }, {});

    const value = data.harvests.reduce(
      (sum, item) => sum + (Number(item.value) || 0), 0
    );

    document.getElementById("harvest-count").textContent =
      `${data.harvests.length} ${data.harvests.length === 1 ? "harvest" : "harvests"} recorded`;
    document.getElementById("harvest-total").textContent = `Total value: ${currency(value)}`;
    document.getElementById("stat-harvests").textContent = data.harvests.length;

    const unitTotals = Object.entries(quantitiesByUnit)
      .map(([unit, quantity]) => `${quantity.toLocaleString("en-PH")} ${unit}`);

    document.getElementById("stat-quantity").textContent =
      unitTotals.length > 1 ? "Mixed units" : unitTotals[0] || "0 kg";

    document.getElementById("stat-quantity-note").textContent =
      unitTotals.length > 1 ? unitTotals.join(" · ") : "Total recorded harvest";
  }

  function renderActivity() {
    const entries = [
      ...data.crops.map(item => ({
        kind: "crop",
        title: `Added ${item.name}`,
        date: item.planted
      })),
      ...data.expenses.map(item => ({
        kind: "expense",
        title: item.description,
        date: item.date,
        amount: `−${currency(item.amount)}`
      })),
      ...data.harvests.map(item => ({
        kind: "harvest",
        title: `Harvested ${item.cropName}`,
        date: item.date,
        amount: `${Number(item.quantity).toLocaleString("en-PH")} ${item.unit}`
      }))
    ].sort((a, b) => (b.date || "").localeCompare(a.date || "")).slice(0, 4);

    document.getElementById("recent-activity").innerHTML = entries.length
      ? `<div class="activity-list">${entries.map(item => `<div class="activity-item"><span class="activity-dot ${item.kind}"></span><div class="activity-copy"><div class="activity-title">${escapeHTML(item.title)}</div><div class="activity-date">${formatDate(item.date)}</div></div>${item.amount ? `<span class="activity-amount">${escapeHTML(item.amount)}</span>` : ""}</div>`).join("")}</div>`
      : emptyState("Your activity will show here");
  }

  function render() {
    renderCrops();
    renderExpenses();
    renderHarvests();
    renderActivity();
  }

  const modal = document.getElementById("modal-backdrop");
  const form = document.getElementById("record-form");

  function openModal(type) {
    const definitions = {
      crop: {
        title: "Add a crop",
        description: "Keep a note of what you’re growing.",
        fields: `
          <div class="field full"><label for="crop-name">Crop name</label><input id="crop-name" name="name" required maxlength="60" placeholder="e.g. Rice, coconut, monggo"></div>
          <div class="field"><label for="crop-area">Farm area</label><input id="crop-area" name="area" type="number" min="0.01" step="0.01" required placeholder="e.g. 0.5"></div>
          <div class="field"><label for="crop-unit">Area unit</label><select id="crop-unit" name="areaUnit"><option value="ha">Hectares (ha)</option><option value="sqm">Square meters (sqm)</option><option value="plots">Plots</option></select></div>
          <div class="field"><label for="crop-planted">Planting date</label><input id="crop-planted" name="planted" type="date" value="${today()}" required></div>
          <div class="field"><label for="crop-expected">Expected harvest</label><input id="crop-expected" name="expected" type="date"></div>
          <div class="field full"><label for="crop-status">Status</label><select id="crop-status" name="status"><option>Growing</option><option>Planned</option><option>Ready to harvest</option></select></div>`,
        submit: "Save crop"
      },
      expense: {
        title: "Record an expense",
        description: "Add a cost for your farm records.",
        fields: `
          <div class="field full"><label for="expense-description">Item / description</label><input id="expense-description" name="description" required maxlength="100" placeholder="e.g. Rice seeds, fertilizer"></div>
          <div class="field"><label for="expense-category">Category</label><select id="expense-category" name="category"><option>Seeds & seedlings</option><option>Fertilizer</option><option>Tools & equipment</option><option>Labor</option><option>Transport</option><option>Irrigation</option><option>Other</option></select></div>
          <div class="field"><label for="expense-amount">Amount (₱)</label><input id="expense-amount" name="amount" type="number" min="0.01" step="0.01" required placeholder="e.g. 500"></div>
          <div class="field"><label for="expense-date">Date</label><input id="expense-date" name="date" type="date" value="${today()}" required></div>`,
        submit: "Save expense"
      },
      harvest: {
        title: "Log a harvest",
        description: "Record the quantity you gathered.",
        fields: `
          <div class="field full"><label for="harvest-crop">Crop</label><select id="harvest-crop" name="cropId" required>${data.crops.length ? data.crops.map(crop => `<option value="${escapeHTML(crop.id)}">${escapeHTML(crop.name)}</option>`).join("") : '<option value="">No crops yet — add a crop first</option>'}</select></div>
          <div class="field"><label for="harvest-quantity">Quantity</label><input id="harvest-quantity" name="quantity" type="number" min="0.01" step="0.01" required placeholder="e.g. 120"></div>
          <div class="field"><label for="harvest-unit">Unit</label><select id="harvest-unit" name="unit"><option>kg</option><option>tons</option><option>pieces</option><option>bundles</option><option>sacks</option></select></div>
          <div class="field"><label for="harvest-date">Harvest date</label><input id="harvest-date" name="date" type="date" value="${today()}" required></div>
          <div class="field"><label for="harvest-value">Estimated value (₱)</label><input id="harvest-value" name="value" type="number" min="0" step="0.01" value="0"></div>`,
        submit: "Save harvest"
      }
    };

    const definition = definitions[type];
    if (!definition) return;

    document.getElementById("modal-title").textContent = definition.title;
    document.getElementById("modal-description").textContent = definition.description;
    form.dataset.type = type;
    form.innerHTML = `<div class="form-grid">${definition.fields}</div><div class="form-actions"><button class="button button-secondary cancel-modal" type="button">Cancel</button><button class="button button-primary" type="submit">${definition.submit}</button></div>`;
    modal.classList.add("open");

    const firstInput = form.querySelector("input, select");
    if (firstInput) firstInput.focus();
  }

  function closeModal() {
    modal.classList.remove("open");
    form.reset();
  }

  document.querySelectorAll(".nav-link").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".nav-link").forEach(item =>
        item.classList.toggle("active", item === button)
      );

      document.querySelectorAll(".section-view").forEach(section =>
        section.classList.toggle(
          "active",
          section.id === `view-${button.dataset.section}`
        )
      );
    });
  });

  document.addEventListener("click", event => {
    const action = event.target.closest("[data-action]");
    if (action) openModal(action.dataset.action);

    const goto = event.target.closest("[data-goto]");
    if (goto) {
      document.querySelector(`.nav-link[data-section="${goto.dataset.goto}"]`)?.click();
    }

    if (event.target.closest(".modal-close, .cancel-modal")) closeModal();
    if (event.target === modal) closeModal();

    const deleteButton = event.target.closest(".delete-record");
    if (deleteButton) {
      const { type, id } = deleteButton.dataset;

      if (!window.confirm("Delete this farm record? This cannot be undone.")) return;

      const collection = data[type];
      const index = collection.findIndex(item => item.id === id);
      if (index < 0) return;

      collection.splice(index, 1);

      if (save()) {
        render();
        showToast("Record deleted.");
      }
    }
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && modal.classList.contains("open")) {
      closeModal();
    }
  });

  form.addEventListener("submit", event => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const values = Object.fromEntries(new FormData(form).entries());
    const type = form.dataset.type;

    if (type === "crop") {
      data.crops.push({
        ...values,
        id: makeId(),
        area: Number(values.area),
        emoji: "🌱"
      });
    } else if (type === "expense") {
      data.expenses.push({
        ...values,
        id: makeId(),
        amount: Number(values.amount)
      });
    } else if (type === "harvest") {
      const crop = data.crops.find(item => item.id === values.cropId);

      if (!crop) {
        showToast("Add a crop before recording a harvest.");
        return;
      }

      data.harvests.push({
        id: makeId(),
        cropId: crop.id,
        cropName: crop.name,
        quantity: Number(values.quantity),
        unit: values.unit,
        date: values.date,
        value: Number(values.value) || 0
      });
    }

    if (save()) {
      closeModal();
      render();
      showToast("Farm record saved.");
    }
  });

  document.getElementById("today-label").textContent =
    new Date().toLocaleDateString("en-PH", {
      weekday: "short",
      month: "long",
      day: "numeric",
      year: "numeric"
    });

  if (firstVisit) save();
  render();
})();
